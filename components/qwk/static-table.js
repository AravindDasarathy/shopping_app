import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
  Paper,
} from '@material-ui/core'

const generateRow = (rowData, headerData) => (
  <TableRow key={`tr-${rowData.id}`}>
    {headerData.map((header, index) => (
      <TableCell key={`tr-cell-${index}`}>{rowData[header.prop] || '-'}</TableCell>
    ))}
  </TableRow>
)

export default function QwkStaticTable({ data, headers }) {
  /*
    expected header format:
      [
        { name: 'Item', prop: 'itemName' },
        { name: 'Price', prop: 'price' }
      ]

    expected data format:
      [
        { id: 1, itemName: 'Monitor', price: 10000 },
        { id: 2, itemName: 'Keyboard', price: 1500 }
      ]
  */
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((headerData, index) => (
              <TableCell key={`th-cell-${index}`}>{headerData.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.length ? (
            data.map((dataObject) => generateRow(dataObject, headers))
          ) : (
            <TableRow>
              <TableCell colSpan={headers.length} align="center">
                <Typography variant="body1">No data to show!</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
