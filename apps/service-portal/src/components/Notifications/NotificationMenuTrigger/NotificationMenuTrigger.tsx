import React, { FC, useRef } from 'react'
import * as styles from './NotificationMenuTrigger.treat'
import {
  ButtonDeprecated as Button,
  Box,
  IconDeprecated as Icon,
} from '@island.is/island-ui/core'
import { useStore } from '../../../store/stateProvider'
import { ActionType, MenuState } from '../../../store/actions'
import NotificationMenu from '../NotificationMenu/NotificationMenu'
import { useClickAway } from 'react-use'

const NotificationMenuTrigger: FC<{}> = () => {
  const ref = useRef<HTMLElement>(null)
  const [{ notificationMenuState }, dispatch] = useStore()

  const setMenuState = (state: MenuState) =>
    dispatch({
      type: ActionType.SetNotificationMenuState,
      payload: state,
    })

  const handleClick = () =>
    setMenuState(notificationMenuState === 'open' ? 'closed' : 'open')

  useClickAway(ref, () =>
    notificationMenuState === 'open' ? setMenuState('closed') : null,
  )

  return (
    <Box position="relative" display="flex" ref={ref}>
      <span className={styles.notificationCount}>1</span>
      <Button variant="menu" onClick={handleClick} icon="lock" />
      <NotificationMenu
        state={notificationMenuState}
        onClose={setMenuState.bind(null, 'closed')}
      />
    </Box>
  )
}

export default NotificationMenuTrigger
