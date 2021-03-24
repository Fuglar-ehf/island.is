import { style, styleMap } from 'treat'
import { theme } from '@island.is/island-ui/core'

export const bulletWrapper = style({
  pointerEvents: 'none',
  transition: 'top 150ms ease',
})

export const bullet = style({
  height: 9,
  width: 9,
  borderRadius: '50%',
  display: 'inline-block',
})

export const color = styleMap({
  red: { backgroundColor: theme.color.red400 },
  blue: { backgroundColor: theme.color.blue400 },
  purple: { backgroundColor: theme.color.purple400 },
  darkerBlue: { backgroundColor: theme.color.dark400 },
})

export const left = style({
  position: 'absolute',
  left: -5,
})

export const right = style({
  position: 'absolute',
  right: -5,
})
