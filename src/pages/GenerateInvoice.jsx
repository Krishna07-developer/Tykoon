import { TextField, Button, Box, Paper, Stack } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { CommonContext } from '../contexts/CommonContext'
import InvoiceViewer from './InvoiceViewer'
import { AuthContext } from '../contexts/AuthContext'


function GenerateInvoice() {

  const [showAddForm, setShowAddForm]   = useState(true)
  const [orderItems, setOrderItems]     = useState([])
  const [clientInfo, setClientInfo]     = useState('')

  const { showPopup, showAlert } = useContext(CommonContext)
  const { userData }  = useContext(AuthContext)

  const { register, handleSubmit, control, reset, formState : {errors} } = useForm()

  const addProduct = (data) => {
    let newOrderItems = orderItems
    newOrderItems.push(data)
    setOrderItems(newOrderItems)
    setShowAddForm(false)
    reset()
  }

  const showInvoice = () => {
    if (!userData?.companies?.length) {
      showAlert("Please add your company details in your profile to generate invoice.")
      return
    }
    showPopup(<InvoiceViewer invoiceData={orderItems} clientInfo={clientInfo}/>)
  }

  const resetDetails = () => {
    setOrderItems([])
  }


  return(<>
  <h2>Generate Invoice</h2>
  <Paper>
  <Box mb={3}>
    <TextField
      placeholder="Enter Client Details"
      label="Client Details"
      variant="outlined"
      fullWidth
      multiline
      rows={3}
      onChange={(e) => setClientInfo(e.target.value)}
    />
  </Box>
  
  {
    orderItems.length ? 
    <>
     <Box sx={{display:'flex', fontWeight:'bold'}} mb={1}>
        <Box sx={{width:'50%'}}>
          Item Name
        </Box>
        <Box sx={{width:'15%'}}>
          Price
        </Box>
        <Box sx={{width:'15%', textAlign:'center'}}>
          Qty
        </Box>
        <Box sx={{width:'20%'}}>
          Total
        </Box>
      </Box>
      {
      orderItems.map((item, index) => {
        return <Box key={index} sx={{display:'flex'}} mb={1}>
          <Box sx={{width:'50%'}}>
            {item.title}
          </Box>
          <Box sx={{width:'15%'}}>
            {item.price}
          </Box>
          <Box sx={{width:'15%', textAlign:'center'}}>
            {item.qty}
          </Box>
          <Box sx={{width:'20%'}}>
            {item.qty * item.price}
          </Box>
        </Box>
      })
      }
      <Box sx={{display:'flex', fontWeight:'bold', borderTop:'1px solid #eaeaea'}} mt={2} pt={2}>
        <Box sx={{width:'50%'}}>
          Total
        </Box>
        <Box sx={{width:'15%'}}>

        </Box>
        <Box sx={{width:'15%', textAlign:'center'}}>
          {
            orderItems.reduce((accumulator, item) => {
              return accumulator + item.qty;
            }, 0)
          }
        </Box>
        <Box sx={{width:'20%'}}>
          {
            orderItems.reduce((accumulator, item) => {
              return accumulator + (item.price * item.qty);
            }, 0)
          }
        </Box>
      </Box>
    </> : null
  }
  </Paper>
  {
    showAddForm ? 
    <Paper sx={{padding:'10px', marginTop:'10px', mb:3}}>
      <h2>Add invoice items</h2>
      <form onSubmit={handleSubmit(addProduct)}>

        <Box mb={3}>
          <TextField
            placeholder="Enter item name"
            label="Item Name"
            variant="outlined"
            fullWidth
            name="title"
            {...register("title", {
              required: "Required field"
            })}
            error={Boolean(errors?.title)}
            helperText={errors?.title?.message}
          />
        </Box>

        <Box mb={3}>
          <TextField
            placeholder="Enter Quantity"
            label="Quantity"
            variant="outlined"
            fullWidth
            type='number'
            autoComplete='off'
            {...register("qty", {
              required: "Required field"
            })}
            error={Boolean(errors?.qty)}
            helperText={errors?.qty?.message}
          />
        </Box>

        <Box mb={3}>
          <TextField
            placeholder="Enter Price"
            label="Price"
            variant="outlined"
            fullWidth
            type='number'
            autoComplete='off'
            {...register("price", {
              required: "Required field"
            })}
            error={Boolean(errors?.price)}
            helperText={errors?.price?.message}
          />
        </Box>

        <Box>
          <Button variant="outlined" onClick={() => setShowAddForm(false)}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" sx={{marginLeft:'10px', width:'25vw'}}>
            Add
          </Button>
        </Box>
      </form>
    </Paper> : 
    <Stack mt={2} mb={3} direction="row">
      <Button variant="outlined" onClick={() => resetDetails()} sx={{mr:2}}>
        Clear Items
      </Button>
      <Button variant="outlined" onClick={() => setShowAddForm(true)}>
        Add more items
      </Button>
    </Stack>
  }
  <Button variant='contained' fullWidth disabled={!orderItems.length || showAddForm || !clientInfo}
    onClick={() => showInvoice()}>
    Generate Invoice
  </Button>
  </>)
}

export default GenerateInvoice