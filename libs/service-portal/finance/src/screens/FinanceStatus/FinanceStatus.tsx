import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Query } from '@island.is/api/schema'
import {
  Box,
  Text,
  Columns,
  Column,
  Button,
  DropdownMenu,
  SkeletonLoader,
} from '@island.is/island-ui/core'
import { useLocale, useNamespaces } from '@island.is/localization'
import {
  FinanceStatusDataType,
  FinanceStatusDetailsType,
  FinanceStatusOrganizationType,
} from './FinanceStatusData.types'
import ExpandableLine from '../../components/ExpandableLine/ExpandableLine'
import GridLineHeader from '../../components/GridLineHeader/GridLineHeader'
import * as styles from './FinanceStatus.treat'

const GetFinanceStatusQuery = gql`
  query GetFinanceStatusQuery {
    getFinanceStatus
  }
`

const GetFinanceStatusDetailsQuery = gql`
  query GetFinanceStatusDetailsQuery {
    getFinanceStatusDetails
  }
`

const FinanceStatus = () => {
  useNamespaces('sp.finance-status')
  const { formatMessage } = useLocale()

  const { loading, ...statusQuery } = useQuery<Query>(GetFinanceStatusQuery, {
    variables: {
      nationalID: '2704685439',
    },
  })
  const financeStatusData: FinanceStatusDataType =
    statusQuery.data?.getFinanceStatus || {}
  console.log({ financeStatusData, loading })

  const detailsQuery = useQuery(GetFinanceStatusDetailsQuery, {
    variables: {
      nationalID: '2704685439',
      OrgID: 'RIKI',
      chargeTypeID: 'AX',
    },
  })
  const financeStatusDetails: FinanceStatusDetailsType =
    detailsQuery.data?.getFinanceStatusDetails || {}
  console.log({ financeStatusDetails })

  return (
    <Box marginBottom={[6, 6, 10]}>
      <Text variant="h1" as="h1">
        {formatMessage({
          id: 'service.portal:finance-status-title',
          defaultMessage: 'Staða við ríkissjóð og stofnanir',
        })}
      </Text>
      <Columns collapseBelow="sm">
        <Column width="8/12">
          <Text variant="intro">
            {formatMessage({
              id: 'service.portal:finance-status-intro',
              defaultMessage:
                'Hafið samband við viðeigandi umsjónarmann til að fá frekari upplýsingar um stöðu og innheimtu.',
            })}
          </Text>
        </Column>
      </Columns>
      <Box marginTop={[3, 4, 4, 4, 7]}>
        <Columns space="p2" align="right">
          <Column width="content">
            <Button
              colorScheme="default"
              icon="documents" // Need to add Printer
              iconType="filled"
              onBlur={function noRefCheck() {}}
              onClick={function noRefCheck() {}}
              onFocus={function noRefCheck() {}}
              preTextIconType="filled"
              size="default"
              type="button"
              variant="utility"
            >
              Prenta
            </Button>
          </Column>
          <Column width="content">
            <Box className={styles.buttonWrapper}>
              <DropdownMenu
                icon="ellipsisVertical" // Need to add ellipsisHorizontal
                items={[
                  {
                    href: '#',
                    title: 'Staða í lok árs ...',
                  },
                  {
                    href: '#',
                    title: 'Sækja sem PDF',
                  },
                  {
                    onClick: function noRefCheck() {},
                    title: 'Sækja sem Excel',
                  },
                ]}
                title="Meira"
              />
            </Box>
          </Column>
        </Columns>
        {/* {loading ? <span>loading...</span> : null} */}
        {loading ? (
          <Box padding={3}>
            <SkeletonLoader space={1} height={40} repeat={5} />
          </Box>
        ) : null}
        {financeStatusData?.organizations?.length > 0 ? (
          <Box marginTop={2}>
            <GridLineHeader />
            {financeStatusData.organizations.map(
              (org: FinanceStatusOrganizationType, i: number) => (
                <ExpandableLine key={i} organization={org} />
              ),
            )}
          </Box>
        ) : null}
      </Box>
    </Box>
  )
}

export default FinanceStatus
