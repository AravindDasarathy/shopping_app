import { tableHeaders } from '../../constants'
import { StaticTable } from '../qwk'

export default function InventoryList({ inventoryItems }) {
  console.log('Inventory Items', inventoryItems)

  const transformedData = []
  return <StaticTable data={transformedData} headers={tableHeaders.inventoryItems} />
}
