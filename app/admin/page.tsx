import {PropertiesListingTable} from '../ui/components/PropertiesListingTable'
import {Property} from '../../lib/Property.schema'

const AdminHomePage = async () => <>
  <PropertiesListingTable {...{
    initProperties: await Property.find({})
  }} />
</>

export default AdminHomePage
