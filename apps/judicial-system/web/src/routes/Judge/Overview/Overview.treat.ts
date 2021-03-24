import { theme } from '@island.is/island-ui/core'
import { style } from 'treat'

export const breakSpaces = style({
  whiteSpace: 'break-spaces',
})

export const infoSection = style({
  padding: `${theme.spacing[5]}px 0`,
  borderTop: `2px solid ${theme.color.purple100}`,
})

export const createCourtCaseContainer = style({
  display: 'flex',
  flexDirection: 'column',
})

export const createCourtCaseButton = style({
  display: 'flex',
  maxHeight: theme.spacing[8],
  width: '144px',
  marginRight: theme.spacing[2],
})

export const createCourtCaseInput = style({
  flex: 1,
})

export const enterCaseNrManuallyButton = style({
  alignSelf: 'flex-end',
  marginTop: theme.spacing[2],
})
