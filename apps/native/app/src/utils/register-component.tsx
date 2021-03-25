import React from 'react';
import { NavigationProvider } from 'react-native-navigation-hooks'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import { ThemeProvider } from '../contexts/theme-provider';

export function registerComponent(name: string, Component: NavigationFunctionComponent) {
  Navigation.registerComponent(
    name,
    () => (props) => {
      return (
        <NavigationProvider value={{ componentId: props.componentId }}>
          <ThemeProvider>
            <Component {...props} />
          </ThemeProvider>
        </NavigationProvider>

      )
    },
    () => Component,
  )
}

