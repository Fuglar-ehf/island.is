import { bootstrap } from '@island.is/infra-next-server'
import proxyConfig from './proxy.config.json'

bootstrap({
  name: 'web',
  appDir: 'apps/web',
  proxyConfig,
})
