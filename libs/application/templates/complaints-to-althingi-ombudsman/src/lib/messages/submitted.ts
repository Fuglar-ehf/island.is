import { defineMessages } from 'react-intl'

export const submitted = {
  general: defineMessages({
    pageTitle: {
      id: `ctao.application:section.submitted.pageTitle`,
      defaultMessage: 'Takk fyrir umsóknina!',
      description: 'Submitted page title',
    },
  }),
  labels: defineMessages({
    descriptionBulletOne: {
      id: `ctao.application:section.submitted.descriptionBulletOne`,
      defaultMessage:
        'Við munum nú fara yfir verkefnið og við sendum á þig svör innan tíðar. ',
      description: 'submitted descriptionBulletOne',
    },
    descriptionBulletTwo: {
      id: `ctao.application:section.submitted.descriptionBulletTwo`,
      defaultMessage:
        'Við verðum í sambandi ef okkur vantar frekari upplýsingar.',
      description: 'submitted descriptionBulletTwo',
    },
    descriptionBulletThree: {
      id: `ctao.application:section.submitted.descriptionBulletThree`,
      defaultMessage:
        'Ef þú þarft frekari upplýsingar þá getur þú haft samband í síma {tel} eða á netfangið',
      description: 'submitted descriptionBulletThree',
    },
  }),
}
