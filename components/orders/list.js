import { tableHeaders } from '../../constants'
import { StaticTable } from '../qwk'

export default function OrderList({ orders }) {
  console.log('Orders', orders)
  const transformedData = []
  return <StaticTable data={transformedData} headers={tableHeaders.orders} />
}
