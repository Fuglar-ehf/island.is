import type { AppProps /*, AppContext */ } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { globalStyles } from '@island.is/island-ui/core'
import { UserProvider, Header } from '../src/shared-components'
import { client } from '../graphql'

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles()

  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <Header />
        <Component {...pageProps} />
        <style jsx global>{`
          @font-face {
            font-family: 'IBM Plex Sans';
            font-style: normal;
            font-weight: 300;
            font-display: swap;
            src: local('IBM Plex Sans Light'), local('IBMPlexSans-Light'),
              url('/fonts/ibm-plex/ibm-plex-sans-v7-latin-300.woff2')
                format('woff2'),
              url('/fonts/ibm-plex/ibm-plex-sans-v7-latin-300.woff')
                format('woff');
          }
          @font-face {
            font-family: 'IBM Plex Sans';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: local('IBM Plex Sans'), local('IBMPlexSans'),
              url('/fonts/ibm-plex/ibm-plex-sans-v7-latin-regular.woff2')
                format('woff2'),
              url('/fonts/ibm-plex/ibm-plex-sans-v7-latin-regular.woff')
                format('woff');
          }
          @font-face {
            font-family: 'IBM Plex Sans';
            font-style: italic;
            font-weight: 400;
            font-display: swap;
            src: local('IBM Plex Sans Italic'), local('IBMPlexSans-Italic'),
              url('/fonts/ibm-plex/ibm-plex-sans-v7-latin-italic.woff2')
                format('woff2'),
              url('/fonts/ibm-plex/ibm-plex-sans-v7-latin-italic.woff')
                format('woff');
          }
          @font-face {
            font-family: 'IBM Plex Sans';
            font-style: normal;
            font-weight: 500;
            font-display: swap;
            src: local('IBM Plex Sans Medium'), local('IBMPlexSans-Medium'),
              url('/fonts/ibm-plex/ibm-plex-sans-v7-latin-500.woff2')
                format('woff2'),
              url('/fonts/ibm-plex/ibm-plex-sans-v7-latin-500.woff')
                format('woff');
          }
          @font-face {
            font-family: 'IBM Plex Sans';
            font-style: normal;
            font-weight: 600;
            font-display: swap;
            src: local('IBM Plex Sans SemiBold'), local('IBMPlexSans-SemiBold'),
              url('/fonts/ibm-plex/ibm-plex-sans-v7-latin-600.woff2')
                format('woff2'),
              url('/fonts/ibm-plex/ibm-plex-sans-v7-latin-600.woff')
                format('woff');
          }
        `}</style>
      </UserProvider>
    </ApolloProvider>
  )
}

export default MyApp
