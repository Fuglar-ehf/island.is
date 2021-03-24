import { style, styleMap } from 'treat'
import { theme } from '../../utils/theme'

export const buttonWrap = style({
  '@media': {
    [`screen and (max-width: ${theme.breakpoints.md}px)`]: {
      marginLeft: 'auto',
    },
  },
})

export const inputWrap = style({
  flex: '0 1 70%',
})

export const variants = styleMap({
  white: {
    backgroundColor: 'white',
  },
  blue: {
    backgroundColor: theme.color.blue100,
  },
})
