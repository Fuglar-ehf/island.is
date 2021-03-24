import { Button, Heading } from '@island.is/island-ui-native'
import React from 'react'
import { SafeAreaView, Image, View } from 'react-native'
import { Navigation, NavigationFunctionComponent } from 'react-native-navigation'
import logo from '../../assets/logo/logo-64w.png'
import { useAuthStore } from '../../auth/auth'
import { mainRoot } from '../../main'

export const LoginScreen: NavigationFunctionComponent = () => {
  const authStore = useAuthStore()
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100
      }}
    >
      <Image
        source={logo}
        resizeMode="contain"
        style={{ width: 64, height: 64, marginBottom: 20 }}
      />
      <View style={{ maxWidth: 300 }}>
        <Heading isCenterAligned>
          Skráðu þig inn í appið með rafrænum skilríkjum
        </Heading>
      </View>
      <Button
        title="Auðkenna"
        onPress={async () => {
          try {
            const isAuth = await authStore.login();
            if (isAuth) {
              const userInfo = await authStore.fetchUserInfo()
              if (userInfo) {
                Navigation.setRoot(mainRoot)
              }
            }
          } catch (err) {
            // noop
          }
        }}
      />
    </SafeAreaView>
  )
}

LoginScreen.options = {
  topBar: {
    title: {
      text: 'Login',
    },
  },
}
