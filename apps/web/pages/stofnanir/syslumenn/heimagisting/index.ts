import withApollo from '@island.is/web/graphql/withApollo'
import { withLocale } from '@island.is/web/i18n'
import Homestay from '@island.is/web/screens/Syslumenn/Homestay'

export default withApollo(withLocale('is')(Homestay))
