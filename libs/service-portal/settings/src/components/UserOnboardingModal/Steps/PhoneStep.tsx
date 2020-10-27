import React, { FC } from 'react'
import { Button, GridColumn, GridRow, Text } from '@island.is/island-ui/core'
import { useLocale } from '@island.is/localization'
import { PhoneForm, PhoneFormData } from '../../Forms/PhoneForm'

interface Props {
  tel: string
  loading: boolean
  onBack: () => void
  onSubmit: (data: PhoneFormData) => void
}

export const PhoneStep: FC<Props> = ({ onBack, onSubmit, tel, loading }) => {
  const { formatMessage } = useLocale()

  return (
    <>
      <GridRow>
        <GridColumn span={['1/1', '1/1', '4/7']}>
          <Text variant="h1" marginBottom={3}>
            {formatMessage({
              id: 'service.portal:tel-number',
              defaultMessage: 'Símanúmer',
            })}
          </Text>
          <Text marginBottom={7}>
            {formatMessage({
              id: 'sp.settings:profile-info-form-message',
              defaultMessage: `
                Vinsamlegast gerðu breytingar á þessum upplýsingum
                ef þörf krefur.
              `,
            })}
          </Text>
        </GridColumn>
      </GridRow>
      <PhoneForm
        tel={tel}
        renderBackButton={() => (
          <Button variant="ghost" onClick={onBack}>
            {formatMessage({
              id: 'service.portal:go-back',
              defaultMessage: 'Til baka',
            })}
          </Button>
        )}
        renderSubmitButton={() => (
          <Button disabled={loading} variant="primary" type="submit">
            {formatMessage({
              id: 'service.portal:next-step',
              defaultMessage: 'Senda staðfestingakóða',
            })}
          </Button>
        )}
        onSubmit={onSubmit}
      />
    </>
  )
}
