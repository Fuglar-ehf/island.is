import {
  buildCustomField,
  buildDateField,
  buildForm,
  buildMultiField,
  buildRepeater,
  buildSection,
  buildSelectField,
  buildSubmitField,
  Form,
  FormModes,
} from '@island.is/application/core'
import Logo from '../assets/Logo'
import { parentalLeaveFormMessages } from '../lib/messages'

export const EditOrAddPeriods: Form = buildForm({
  id: 'ParentalLeaveEditOrAddPeriods',
  title: 'Edit or add periods',
  logo: Logo,
  mode: FormModes.EDITING,
  children: [
    buildSection({
      id: 'editOrAddPeropds',
      title: '',
      children: [
        buildRepeater({
          id: 'periods',
          title: parentalLeaveFormMessages.leavePlan.title,
          component: 'PeriodsRepeater',
          children: [
            buildDateField({
              id: 'startDate',
              title: parentalLeaveFormMessages.startDate.title,
              description: parentalLeaveFormMessages.startDate.description,
              placeholder: parentalLeaveFormMessages.startDate.placeholder,
            }),
            buildMultiField({
              id: 'endDate',
              title: parentalLeaveFormMessages.endDate.title,
              description: parentalLeaveFormMessages.endDate.description,
              children: [
                buildDateField({
                  id: 'endDate',
                  title: parentalLeaveFormMessages.endDate.label,
                  placeholder: parentalLeaveFormMessages.endDate.placeholder,
                }),
              ],
            }),
            buildMultiField({
              id: 'ratio',
              title: parentalLeaveFormMessages.ratio.title,
              description: parentalLeaveFormMessages.ratio.description,
              children: [
                buildSelectField({
                  id: 'ratio',
                  width: 'half',
                  title: parentalLeaveFormMessages.ratio.label,
                  defaultValue: '100',
                  placeholder: parentalLeaveFormMessages.ratio.placeholder,
                  options: [
                    { label: '100%', value: '100' },
                    { label: '75%', value: '75' },
                    { label: '50%', value: '50' },
                    { label: '25%', value: '25' },
                  ],
                }),
              ],
            }),
          ],
        }),
        buildMultiField({
          id: 'confirmation',
          title: parentalLeaveFormMessages.confirmation.title,
          description: parentalLeaveFormMessages.confirmation.description,
          children: [
            buildCustomField({
              id: 'confirmationScreen',
              title: '',
              component: 'EditPeriodsReview',
            }),
            buildSubmitField({
              id: 'submit',
              placement: 'footer',
              title: parentalLeaveFormMessages.confirmation.title,
              actions: [
                { name: 'Cancel', type: 'abort', event: 'ABORT' },
                {
                  event: 'SUBMIT',
                  name: parentalLeaveFormMessages.confirmation.title,
                  type: 'primary',
                },
              ],
            }),
          ],
        }),
        buildCustomField({
          id: 'thankYou',
          title: parentalLeaveFormMessages.finalScreen.title,
          component: 'Conclusion',
        }),
      ],
    }),
  ],
})
