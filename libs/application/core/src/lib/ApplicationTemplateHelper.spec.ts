import * as z from 'zod'
import { ApplicationTemplateHelper } from './ApplicationTemplateHelper'
import { ApplicationTemplate } from '../types/ApplicationTemplate'
import { Application, ExternalData, FormValue } from '../types/Application'
import { ApplicationTypes } from '../types/ApplicationTypes'
import {
  ApplicationContext,
  ApplicationRole,
  ApplicationStateSchema,
} from '../types/StateMachine'
import { buildForm } from '@island.is/application/core'

const createMockApplication = (
  data: {
    answers?: FormValue
    externalData?: ExternalData
    state?: string
    typeId?: ApplicationTypes
  } = {},
): Application => ({
  id: '123',
  externalId: '141414',
  state: data.state || 'draft',
  applicant: '111111-3000',
  typeId: data.typeId || ApplicationTypes.EXAMPLE,
  modified: new Date(),
  created: new Date(),
  attachments: {},
  answers: data.answers || {},
  externalData: data.externalData || {},
})

type TestEvents = { type: 'APPROVE' } | { type: 'REJECT' } | { type: 'SUBMIT' }

const testApplicationTemplate: ApplicationTemplate<
  ApplicationContext,
  ApplicationStateSchema<TestEvents>,
  TestEvents
> = {
  mapUserToRole(): ApplicationRole {
    return 'applicant'
  },
  type: ApplicationTypes.EXAMPLE,
  name: 'Test application',
  dataProviders: [],
  dataSchema: z.object({
    person: z.object({
      age: z.number().min(18),
      pets: z.array(
        z.object({ name: z.string().nonempty(), kind: z.enum(['dog', 'cat']) }),
      ),
    }),
    externalReviewAccepted: z.boolean(),
    wantsInsurance: z.boolean(),
  }),
  stateMachineConfig: {
    initial: 'draft',
    states: {
      draft: {
        meta: {
          name: 'draft',
          progress: 0.33,
          roles: [
            {
              actions: [{ event: 'SUBMIT', name: 'Submit', type: 'primary' }],
              id: 'applicant',
              formLoader: () =>
                Promise.resolve(
                  buildForm({
                    id: ApplicationTypes.PARENTAL_LEAVE,
                    name: 'parentalLeave',
                    children: [],
                    ownerId: 'asdf',
                  }),
                ),
              write: {
                answers: ['person', 'wantsInsurance'],
                externalData: ['salary'],
              },
            },
          ],
        },
        on: {
          SUBMIT: { target: 'inReview' },
        },
      },
      inReview: {
        meta: {
          name: 'In Review',
          progress: 0.66,
          roles: [
            {
              id: 'applicant',
            },
            {
              id: 'reviewer',
              read: 'all' as const,
              write: {
                answers: [],
                externalData: [],
              },
            },
          ],
        },
        on: {
          APPROVE: { target: 'approved' },
          REJECT: { target: 'draft' },
        },
      },
      approved: {
        meta: {
          name: 'Approved',
          progress: 1,
        },
        type: 'final' as const,
      },
      rejected: {
        meta: {
          name: 'Rejected',
          roles: [
            {
              id: 'applicant',
              write: 'all',
            },
          ],
        },
      },
    },
  },
}

describe('ApplicationTemplate', () => {
  const application = createMockApplication()
  const templateHelper = new ApplicationTemplateHelper(
    application,
    testApplicationTemplate,
  )
  describe(' getApplicationStateInformation', () => {
    it('should return correct meta data depending on application state', () => {
      expect(templateHelper.getApplicationStateInformation('draft')).toEqual(
        testApplicationTemplate.stateMachineConfig.states.draft.meta,
      )
      expect(templateHelper.getApplicationStateInformation('inReview')).toEqual(
        testApplicationTemplate.stateMachineConfig.states.inReview.meta,
      )
      expect(templateHelper.getApplicationStateInformation('approved')).toEqual(
        testApplicationTemplate.stateMachineConfig.states.approved.meta,
      )
      expect(templateHelper.getApplicationStateInformation('rejected')).toEqual(
        testApplicationTemplate.stateMachineConfig.states.rejected.meta,
      )
    })

    it('should return undefined if there is no state with this key in the application', () => {
      expect(
        templateHelper.getApplicationStateInformation('someRandomState'),
      ).toBeUndefined()
    })
  })

  describe('changeState', () => {
    it('should be able to change from draft to inReview on SUBMIT', () => {
      const newState = templateHelper.changeState('SUBMIT')
      expect(newState.value).toBe('inReview')
      expect(newState.changed).toBe(true)
    })
    it('should return the same state if passing an event that cannot progress the application to any other state', () => {
      const newState = templateHelper.changeState('APPROVE')
      expect(newState.value).toBe('draft')
      expect(newState.changed).toBe(false)

      const anotherState = templateHelper.changeState('REJECT')
      expect(anotherState.value).toBe('draft')
      expect(anotherState.changed).toBe(false)
    })
  })

  describe('getPermittedAnswersAndExternalData', () => {
    const answers: FormValue = {
      person: {
        age: 25,
        pets: [
          { name: 'John', kind: 'dog' },
          { name: 'Spot', kind: 'cat' },
        ],
      },
      externalReviewAccepted: false,
      wantsInsurance: true,
    }
    const externalData: ExternalData = {
      salary: { data: 1000000, date: new Date(), status: 'success' },
      someValidation: {
        date: new Date(),
        status: 'failure',
        reason: 'external validation error',
      },
    }

    it('should ONLY return the answers and externalData that the applicant can read/write in draft state', () => {
      const applicationWithAnswersAndExternalData = createMockApplication({
        state: 'draft',
        answers,
        externalData,
      })
      const helper = new ApplicationTemplateHelper(
        applicationWithAnswersAndExternalData,
        testApplicationTemplate,
      )
      const result = helper.getPermittedAnswersAndExternalData('applicant')
      expect(result.answers).toEqual({
        person: {
          age: 25,
          pets: [
            { name: 'John', kind: 'dog' },
            { name: 'Spot', kind: 'cat' },
          ],
        },
        wantsInsurance: true,
      })
      expect(result.externalData).toEqual({
        salary: {
          data: 1000000,
          date: externalData.salary.date,
          status: 'success',
        },
      })
    })

    it('should return no data if the current user has no role in this state', () => {
      const applicationWithAnswersAndExternalData = createMockApplication({
        state: 'draft',
        answers,
        externalData,
      })
      const helper = new ApplicationTemplateHelper(
        applicationWithAnswersAndExternalData,
        testApplicationTemplate,
      )
      expect(
        helper.getPermittedAnswersAndExternalData('noRoleInDraftState'),
      ).toEqual({ answers: {}, externalData: {} })
    })
    it('should return no data if the current user has a role in this state, but no read nor write access', () => {
      const applicationWithAnswersAndExternalData = createMockApplication({
        state: 'inReview',
        answers,
        externalData,
      })
      const helper = new ApplicationTemplateHelper(
        applicationWithAnswersAndExternalData,
        testApplicationTemplate,
      )
      expect(helper.getPermittedAnswersAndExternalData('applicant')).toEqual({
        answers: {},
        externalData: {},
      })
    })
    it('should return every answer if the user has a role in this state with read: "all"', () => {
      const applicationWithAnswersAndExternalData = createMockApplication({
        state: 'inReview',
        answers,
        externalData,
      })
      const helper = new ApplicationTemplateHelper(
        applicationWithAnswersAndExternalData,
        testApplicationTemplate,
      )
      expect(helper.getPermittedAnswersAndExternalData('reviewer')).toEqual({
        answers,
        externalData,
      })
    })
    it('should return every answer if the user has a role in this state with write: "all"', () => {
      const applicationWithAnswersAndExternalData = createMockApplication({
        state: 'rejected',
        answers,
        externalData,
      })
      const helper = new ApplicationTemplateHelper(
        applicationWithAnswersAndExternalData,
        testApplicationTemplate,
      )
      expect(helper.getPermittedAnswersAndExternalData('applicant')).toEqual({
        answers,
        externalData,
      })
    })
  })

  describe('getApplicationProgress', () => {
    const application = createMockApplication()
    const templateHelper = new ApplicationTemplateHelper(
      application,
      testApplicationTemplate,
    )
    it('should return the corrent progress for each state', () => {
      expect(templateHelper.getApplicationProgress('draft')).toBe(0.33)
      expect(templateHelper.getApplicationProgress('inReview')).toBe(0.66)
      expect(templateHelper.getApplicationProgress('approved')).toBe(1)
      expect(templateHelper.getApplicationProgress('rejected')).toBe(0)
    })
  })
})
