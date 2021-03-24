import { style } from 'treat'
import { themeUtils } from '@island.is/island-ui/core'

export const popularTitleWrap = style({
  ...themeUtils.responsiveStyle({
    md: {
      maxWidth: '280px',
      textAlign: 'center',
    },
  }),
})
