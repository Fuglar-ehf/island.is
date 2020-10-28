import React, { FC } from 'react'
import { Button, GridColumn, GridRow, Text } from '@island.is/island-ui/core'
import { useLocale } from '@island.is/localization'
import {
  PhoneConfirmForm,
  PhoneConfirmFormData,
} from '../../Forms/PhoneConfirmForm'

interface Props {
  tel: string
  loading: boolean
  onBack: () => void
  onSubmit: (data: PhoneConfirmFormData) => void
}

export const PhoneConfirmationStep: FC<Props> = ({
  onBack,
  onSubmit,
  tel,
  loading,
}) => {
  const { formatMessage } = useLocale()

  return (
    <>
      <GridRow>
        <GridColumn span={['1/1', '1/1', '4/7']}>
          <Text variant="h1" marginBottom={3}>
            {formatMessage({
              id: 'service.portal:tel-confirm-code',
              defaultMessage: 'Staðfestingakóði',
            })}
          </Text>
          <Text marginBottom={7}>
            {formatMessage({
              id: 'sp.settings:tel-confirm-form-message',
              defaultMessage: `
                Staðfestingarkóði hefur verið sendur á símanúmerið þitt: ${tel}. 
                Skrifaðu kóðann inn hér að neðan.
              `,
            })}
          </Text>
        </GridColumn>
      </GridRow>
      <PhoneConfirmForm
        renderBackButton={() => (
          <Button variant="ghost" onClick={onBack}>
            {formatMessage({
              id: 'service.portal:go-back',
              defaultMessage: 'Til baka',
            })}
          </Button>
        )}
        renderSubmitButton={() => (
          <Button
            disabled={loading}
            variant="primary"
            type="submit"
            icon="arrowForward"
          >
            {formatMessage({
              id: 'service.portal:next-step',
              defaultMessage: 'Næsta skref',
            })}
          </Button>
        )}
        onSubmit={onSubmit}
      />
    </>
  )
}
