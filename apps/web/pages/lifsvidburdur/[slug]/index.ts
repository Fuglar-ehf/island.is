import withApollo from '@island.is/web/graphql/withApollo'
import { withLocale } from '@island.is/web/i18n'
import { withContentfulEditor } from '@island.is/contentful-editor'
import lifeEventScreen from '@island.is/web/screens/LifeEvent/LifeEvent'

export default withContentfulEditor(
  withApollo(withLocale('is')(lifeEventScreen)),
)
