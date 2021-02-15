import { Entry } from 'contentful-management/dist/typings/entities/entry'
import isEmpty from 'lodash/isEmpty'

export interface Message {
  defaultMessage: string
  description: string
}

export type MessageDict = Record<string, Message>
export type Locales = { id: string }[]
export const DEFAULT_LOCALE = 'is-IS'

export const createStringsObject = (locales: Locales, messages: MessageDict) =>
  locales.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.id]: Object.keys(messages).reduce(
        (acc2, cur2) => ({
          ...acc2,
          [cur2]:
            cur.id === DEFAULT_LOCALE ? messages?.[cur2]?.defaultMessage : '',
        }),
        {},
      ),
    }),
    {},
  )

export const updateDefaultsObject = (
  namespace: Entry,
  messages: MessageDict,
) => {
  const values = namespace.fields.defaults?.[DEFAULT_LOCALE] ?? {}

  return {
    // Local defaults have priority to define defaultMessage and description over Contentful values
    ...Object.keys(messages).reduce(
      (acc, cur) => ({
        ...acc,
        [cur]: {
          ...messages?.[cur],
          deprecated: false,
        },
      }),
      {},
    ),
    // We then check if any key have been removed locally and set them as deprecated in Contentful
    ...Object.keys(values)
      .filter((item) => !Object.keys(messages).some((obj) => obj === item))
      .reduce(
        (acc, cur) => ({
          ...acc,
          [cur]: {
            ...values?.[cur],
            deprecated: true,
          },
        }),
        {},
      ),
  }
}

export const updateStringsObject = (
  namespace: Entry,
  messages: MessageDict,
  locales: Locales,
) => {
  const strings = namespace.fields.strings

  return locales.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.id]: {
        /*
         * For existing messages, we use Contentful as source of truth except
         * if the field is empty, then we use the local message to populate
         * the Contentful value
         */
        ...Object.keys(strings[cur.id]).reduce((stringsAcc, stringsCur) => {
          const value = strings[cur.id][stringsCur]

          return {
            ...stringsAcc,
            [stringsCur]:
              cur.id === DEFAULT_LOCALE && isEmpty(value)
                ? messages?.[stringsCur]?.defaultMessage ?? ''
                : value,
          }
        }, {}),
        // For new messages that are not part of Contentful yet
        ...Object.keys(messages)
          .filter(
            (item) => !Object.keys(strings[cur.id]).some((obj) => obj === item),
          )
          .reduce(
            (messagesAcc, messagesCur) => ({
              ...messagesAcc,
              [messagesCur]:
                cur.id === DEFAULT_LOCALE
                  ? messages?.[messagesCur]?.defaultMessage ?? ''
                  : '',
            }),
            {},
          ),
      },
    }),
    {},
  )
}
