import React, { ReactNode } from 'react'
import { Image, OrganizationPage } from '@island.is/web/graphql/schema'
import {
  Box,
  BreadCrumbItem,
  Breadcrumbs,
  GridContainer,
  Link,
  Navigation,
  NavigationItem,
  Text,
} from '@island.is/island-ui/core'

import * as styles from './OrganizationWrapper.treat'
import cn from 'classnames'
import NextLink from 'next/link'
import {
  HeadWithSocialSharing,
  Main,
  OrganizationFooter,
  SidebarWrapper,
} from '@island.is/web/components'
import { useWindowSize } from 'react-use'
import { theme } from '@island.is/island-ui/core'
import { useLinkResolver } from '@island.is/web/hooks/useLinkResolver'

interface NavigationData {
  title: string
  activeItemTitle?: string
  items: NavigationItem[]
}

interface WrapperProps {
  pageTitle: string
  pageDescription?: string
  pageFeaturedImage?: Image
  organizationPage?: OrganizationPage
  breadcrumbItems?: BreadCrumbItem[]
  mainContent?: ReactNode
  sidebarContent?: ReactNode
  navigationData: NavigationData
  fullWidthContent?: boolean
}

export const OrganizationWrapper: React.FC<WrapperProps> = ({
  pageTitle,
  pageDescription,
  pageFeaturedImage,
  organizationPage,
  breadcrumbItems,
  mainContent,
  sidebarContent,
  navigationData,
  fullWidthContent = false,
  children,
}) => {
  const isMobile = useWindowSize().width < theme.breakpoints.md
  const { linkResolver } = useLinkResolver()

  const headerBg = pageFeaturedImage
    ? `url(${pageFeaturedImage.url}), linear-gradient(99.09deg, #24268E 23.68%, #CD1270 123.07%)`
    : `linear-gradient(99.09deg, #24268E 23.68%, #CD1270 123.07%)`

  return (
    <>
      <HeadWithSocialSharing
        title={pageTitle}
        description={pageDescription}
        imageUrl={pageFeaturedImage?.url}
        imageWidth={pageFeaturedImage?.width?.toString()}
        imageHeight={pageFeaturedImage?.height?.toString()}
      />
      <Box className={styles.headerBg} style={{ background: headerBg }}>
        <GridContainer>
          <Box marginTop={[1, 1, 3]} marginBottom={5}>
            <Breadcrumbs
              color="white"
              items={breadcrumbItems ?? []}
              renderLink={(link, item) => {
                return item?.href ? (
                  <NextLink href={item?.href}>{link}</NextLink>
                ) : (
                  link
                )
              }}
            />
          </Box>
        </GridContainer>
        <Box className={styles.headerWrapper}>
          <SidebarWrapper sidebarContent={''} hideSidebarInMobile={true}>
            <Box paddingTop={2}>
              <Link
                href={
                  linkResolver('organizationpage', [organizationPage.slug]).href
                }
              >
                <Box display="flex" flexDirection="row" alignItems="center">
                  {!!organizationPage.organization.logo.url && (
                    <img
                      src={organizationPage.organization.logo.url}
                      className={styles.headerLogo}
                      alt=""
                    />
                  )}
                  <Text
                    variant="h1"
                    as="h1"
                    color="white"
                    marginTop={[0, 0, 3]}
                  >
                    {organizationPage.title}
                  </Text>
                </Box>
              </Link>
            </Box>
          </SidebarWrapper>
        </Box>
      </Box>
      <Main>
        <Box paddingTop={[0, 0, 8]}>
          <SidebarWrapper
            fullWidthContent={fullWidthContent}
            sidebarContent={
              <>
                <Box
                  className={cn(
                    styles.navigation,
                    organizationPage.organization.logo.url
                      ? styles.navigationWithLogo
                      : styles.navigationWithoutLogo,
                  )}
                >
                  <Navigation
                    baseId="pageNav"
                    isMenuDialog={isMobile}
                    items={navigationData.items}
                    title={navigationData.title}
                    activeItemTitle={navigationData.activeItemTitle}
                    renderLink={(link, item) => {
                      return item?.href ? (
                        <NextLink href={item?.href}>{link}</NextLink>
                      ) : (
                        link
                      )
                    }}
                  />
                </Box>
                {sidebarContent}
              </>
            }
          >
            {mainContent ?? children}
          </SidebarWrapper>
        </Box>
        {mainContent ? children : ''}
      </Main>
      <OrganizationFooter organizationPage={organizationPage} />
    </>
  )
}
