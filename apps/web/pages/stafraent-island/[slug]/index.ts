import withApollo from '@island.is/web/graphql/withApollo'
import { withLocale } from '@island.is/web/i18n'
import aboutSubScreen from '@island.is/web/screens/AboutSubPage/AboutSubPage'
import { withContentfulEditor } from '@island.is/contentful-editor'

import { environment } from '../../../environments/environment'

export default withContentfulEditor(
  withApollo(withLocale('is')(aboutSubScreen)),
  environment.contentful,
)
