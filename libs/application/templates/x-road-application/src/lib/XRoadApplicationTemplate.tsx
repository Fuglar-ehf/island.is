import {
  ApplicationTemplate,
  ApplicationTypes,
  ApplicationContext,
  ApplicationRole,
  ApplicationStateSchema,
  Application,
} from '@island.is/application/core'
import * as z from 'zod'

type Events =
  | { type: 'APPROVE' }
  | { type: 'REJECT' }
  | { type: 'SUBMIT' }
  | { type: 'ABORT' }

const Schema = z.object({
  institution: z.object({
    institutionName: z.string().nonempty().max(256),
    institutionSSN: z.string().nonempty().max(10),
  }),
  applicant: z.object({
    contact: z.string().nonempty().max(256),
    ssn: z.string().nonempty().max(10),
    email: z.string().email(),
    phone: z.string().min(7),
    isValidApplicant: z.array(z.enum(['isValidApplicant'])),
  }),
  information: z.object({
    ipAddress: z.string().nonempty().max(256),
    domainName: z.string().nonempty().max(256),
  }),
  confirmation: z.object({
    isTermsAccepted: z.array(z.enum(['isTermsAccepted'])),
  }),
})

const XRoadApplicationTemplate: ApplicationTemplate<
  ApplicationContext,
  ApplicationStateSchema<Events>,
  Events
> = {
  type: ApplicationTypes.X_ROAD,
  name: 'Sækja um skráningu á nýjum X-Road þjóni',
  dataSchema: Schema,
  stateMachineConfig: {
    initial: 'draft',
    states: {
      draft: {
        meta: {
          name: 'Sækja um skráningu á nýjum X-Road þjóni',
          progress: 0.33,
          roles: [
            {
              id: 'applicant',
              formLoader: () =>
                import('../forms/ApplicationForm').then((module) =>
                  Promise.resolve(module.ApplicationForm),
                ),
              actions: [
                { event: 'SUBMIT', name: 'Staðfesta', type: 'primary' },
              ],
              write: 'all',
            },
          ],
        },
        on: {
          SUBMIT: {
            target: 'inReview',
          },
        },
      },
      inReview: {
        meta: {
          name: 'In Review',
          progress: 0.66,
          roles: [
            {
              id: 'reviewer',
              formLoader: () =>
                import('../forms/Review').then((val) =>
                  Promise.resolve(val.Review),
                ),
              actions: [
                { event: 'APPROVE', name: 'Samþykkja', type: 'primary' },
                { event: 'REJECT', name: 'Hafna', type: 'reject' },
              ],
              read: 'all',
            },
            {
              id: 'applicant',
              formLoader: () =>
                import('../forms/PendingReview').then((val) =>
                  Promise.resolve(val.PendingReview),
                ),
              read: 'all',
            },
          ],
        },
        on: {
          APPROVE: { target: 'approved' },
          REJECT: { target: 'rejected' },
        },
      },
      approved: {
        meta: {
          name: 'Approved',
          progress: 1,
          roles: [
            {
              id: 'applicant',
              formLoader: () =>
                import('../forms/Approved').then((val) =>
                  Promise.resolve(val.Approved),
                ),
            },
          ],
        },
        type: 'final' as const,
      },
      rejected: {
        meta: {
          name: 'Rejected',
          roles: [
            {
              id: 'applicant',
              formLoader: () =>
                import('../forms/Rejected').then((val) =>
                  Promise.resolve(val.Rejected),
                ),
            },
          ],
        },
      },
    },
  },
  mapUserToRole(id: string, application: Application): ApplicationRole {
    if (application.state === 'inReview') {
      // TODO: Add Vigfús Gíslason (vigfus.gislason@fjr.is) as a reviewer - send email
      return 'reviewer'
    }
    return 'applicant'
  },
}

export default XRoadApplicationTemplate
