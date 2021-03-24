import { style } from 'treat'
import { themeUtils } from '@island.is/island-ui/core'

export const menu = style({
  maxWidth: '100%',
  ...themeUtils.responsiveStyle({
    md: {
      width: 353,
    },
  }),
})

export const messages = style({
  maxHeight: `calc(100vh - 250px)`,
  overflowY: 'auto',
})
