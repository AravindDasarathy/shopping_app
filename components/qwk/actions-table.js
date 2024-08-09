import React from 'react'
import QwkTextField from './text-field'
import QwkDialogBox from './dialog-box'
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
  Paper,
  IconButton,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import RemoveIcon from '@material-ui/icons/Delete'
import CheckIcon from '@material-ui/icons/Check'
import { useFormik } from 'formik'
import Dot from 'dot-object'

export default function QwkActionsTable({
  data,
  headers,
  transformFunction,
  editableFields,
  onEdit,
  onRemove,
}) {
  console.log('Qwk table data', data)
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

  const editFieldsArray = editableFields ? editableFields.map((data) => data.fieldName) : []
  const isActionsNeeded = !!editFieldsArray.length

  // the following state is maintained so that the user can edit only one row at a time.
  const [editIndex, setEditIndex] = React.useState(-1)
  const [editDialog, setEditDialog] = React.useState(false)
  const [deleteDialog, setDeleteDialog] = React.useState(false)

  const formik = useFormik({
    initialValues: data && transformFunction ? transformFunction(data) : [],
  })
  const { initialValues, values, handleChange } = formik

  const findValueIndex = (id) => values.findIndex((data) => id === data.id)

  const setDataType = {
    integer: (inputValue) => Number(inputValue),
    string: (inputValue) => inputValue.toString(),
    float: (inputValue) => parseFloat(inputValue),
  }

  const getEditedData = (initialData, newData) => {
    const editedData = {}
    editableFields.forEach(({ fieldName, path, dataType }) => {
      // The below 'if' block is executed if any field is edited.
      if (initialData[fieldName].toString() !== newData[fieldName].toString()) {
        // the path contains the object path. Example: "items.categories.name"
        editedData[path] = setDataType[dataType](newData[fieldName])
      }
    })
    // Dot.object() expands the dotted notation into real object format. Example: {items: {categories:{ name: "" }}}
    return Dot.object(editedData)
  }

  const generateEditableRow = (currentRowIndex, rowData, headers, handleEdit, handleRemove) => {
    return (
      <TableRow key={`tr-${rowData.id}`}>
        {headers.map((headerData, index) => (
          <TableCell key={`tr-cell-${index}`}>
            {editIndex === currentRowIndex && editFieldsArray.includes(headerData.prop) ? (
              <QwkTextField
                label={headerData.name}
                name={headerData.prop}
                value={values[findValueIndex(rowData.id)][headerData.prop]}
                onChange={(event) => {
                  const newValue = event.target.value
                  const valueIndex = findValueIndex(rowData.id)
                  handleChange(`[${valueIndex}][${headerData.prop}]`)(newValue)
                }}
              />
            ) : (
              rowData[headerData.prop] || '-'
            )}
          </TableCell>
        ))}
        <TableCell>
          {editIndex !== currentRowIndex ? (
            <IconButton color="primary" onClick={() => setEditIndex(currentRowIndex)}>
              <EditIcon />
            </IconButton>
          ) : (
            <QwkDialogBox
              open={editDialog}
              onClose={() => setEditDialog(false)}
              title={"Update the merchant's inventory?"}
              content={"The edited data will be updated in the merchant's inventory."}
              onAgree={() => {
                const editedData = getEditedData(
                  initialValues[findValueIndex(rowData.id)],
                  values[findValueIndex(rowData.id)],
                )
                if (Object.keys(editedData).length) {
                  handleEdit(rowData.id, editedData)
                }
                // the following line resets the editIndex.
                setEditIndex(-1)
                setEditDialog(false)
              }}
              onDisagree={() => setEditDialog(false)}
            >
              <IconButton color="primary" onClick={() => setEditDialog(true)}>
                <CheckIcon />
              </IconButton>
            </QwkDialogBox>
          )}
          <QwkDialogBox
            open={deleteDialog}
            onClose={() => setDeleteDialog(false)}
            title={"Delete the merchant's inventory?"}
            content={"This item will be removed from the merchant's inventory."}
            onAgree={() => {
              handleRemove(rowData.id)
              setEditDialog(false)
            }}
            onDisagree={() => setEditDialog(false)}
          >
            <IconButton color="secondary" onClick={() => setDeleteDialog(true)}>
              <RemoveIcon />
            </IconButton>
          </QwkDialogBox>
        </TableCell>
      </TableRow>
    )
  }

  const generatTableRows = values.map((dataObject, index) =>
    generateEditableRow(index, dataObject, headers, onEdit, onRemove),
  )

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((headerData, index) => (
              <TableCell key={`th-cell-${index}`}>{headerData.name}</TableCell>
            ))}
            {isActionsNeeded && <TableCell key="table-actions">Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.length ? (
            generatTableRows
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
