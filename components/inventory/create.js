import Link from 'next/link'
import { Container, Typography, Divider, Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useFormik } from 'formik'
import { TextField } from '../qwk'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5, 0),
  },
  vSpace: {
    margin: theme.spacing(2, 0),
  },
}))

export default function CreateMerchantForm(props) {
  const formik = useFormik({
    initialValues: {
      name: '',
      brand: '',
      description: '',
      skuNo: '',
      unit: '',
      price: '',
      foodLabel: '',
      taxRate: '',
      commissionRate: '', // not required field
      category: {
        id: '',
      },
    },
    onSubmit(values) {
      props.onSubmit(values)
    },
  })

  const { values, handleChange } = formik
  const classes = useStyles()

  const categoryObject = props.categories?.find(
    (data) => Number(values.category.id) === Number(data.id),
  )
  return (
    <Container component="main" maxWidth="md" className={classes.root}>
      <Typography variant="h4" component="h2" gutterBottom>
        Create new item
      </Typography>
      <Typography variant="body2" component="p" gutterBottom>
        Fields marked with * are mandatory
      </Typography>
      <Divider className={classes.vSpace} />
      <Typography variant="h5" componet="h3" gutterBottom>
        Item details
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField label="Item Name" value={values.name} onChange={handleChange} name="name" />
        <TextField
          label="Brand"
          value={values.brand}
          onChange={handleChange}
          name="brand"
          required={false}
        />
        <TextField
          label="Item Description"
          value={values.description}
          onChange={handleChange}
          name="description"
          required={false}
        />
        <TextField label="Skul No" value={values.skuNo} onChange={handleChange} name="skuNo" />
        <TextField label="Unit" value={values.unit} onChange={handleChange} name="unit" />
        <TextField label="Price" value={values.price} onChange={handleChange} name="price" />
        <TextField
          label="Food Label"
          value={values.foodLabel}
          onChange={handleChange}
          name="foodLabel"
        />
        <TextField label="Tax Rate" value={values.taxRate} onChange={handleChange} name="taxRate" />
        <TextField
          label="Commission Rate"
          value={values.commissionRate}
          onChange={handleChange}
          required={false}
          name="commissionRate"
        />
        <Autocomplete
          options={props.categories || []}
          renderOption={(option) => option.name}
          getOptionLabel={(option) => {
            if (typeof option === 'string') {
              return option
            }
            return option.name
          }}
          getOptionSelected={(option, value) => {
            return option.name === value || ''
          }}
          fullWidth
          renderInput={(params) => {
            return <TextField {...params} label="Category Name" name="category" />
          }}
          value={categoryObject ? categoryObject.name : ''}
          name="category.id"
          onChange={(event, newValue) => {
            let val
            if (newValue && typeof newValue !== 'string') {
              val = newValue.id.toString()
            }
            handleChange('category.id')(val)
          }}
          freeSolo={false}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          disableClearable={true}
        />

        <Divider className={classes.vSpace} />

        <Box mt={3}>
          <Box display="inline-block" mr={2}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
          <Link href="/inventory">
            <Button variant="contained" color="default" type="button">
              Go Back
            </Button>
          </Link>
        </Box>
      </form>
    </Container>
  )
}
