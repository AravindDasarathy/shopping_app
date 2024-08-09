import { InventoryCreate } from '../../components'

const handleSubmit = (args) => console.log(args)

export default function NewInventoryItem() {
  return <InventoryCreate onSubmit={handleSubmit} categories={[]} />
}
