import { Button, Box, Paper, TextField, Grid, Fab, Badge} from '@mui/material'
import { useContext, useState } from 'react'
import { CommonContext } from '../contexts/CommonContext'


function CartPopup(props) {

  const [custMobile, setCustMobile]             = useState(null)
  const { showSnackbar } = useContext(CommonContext)
  const cartData   = props.cartData,
        whatsappNo = props.whatsappNo

  const shareToWhatsapp = (data) => {

    if (!custMobile) {
      showSnackbar("Please add your mobile number to order", "error")
      return
    }
    window.open(`https://wa.me/${whatsappNo}?text=${getEcommOrder()}`, '_blank')
  }

  const getEcommOrder = () => {
    let itemText = 'Hi, Please take my order of below items : %0a'
    Object.keys(cartData).map((item, index) => {
      if (item == 'totalAmount' || item == 'totalCount') return
      itemText = itemText + (index + 1) + '.' + cartData[item].name + ' - ' + cartData[item].count + ' ' + '%0a'
    })
    itemText = itemText + 'Total Amount : ₹' + cartData.totalAmount + '%0aMy mobile no : ' + custMobile 
    return itemText
  }

  return (<>
    <Box sx={{width:'80vw'}}>
      <h2>Your Cart</h2>
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
      Object.keys(cartData).map((item, index) => {

        if (item == 'totalAmount' || item == 'totalCount') return

        return <Box key={index} sx={{display:'flex'}} mb={1}>
          <Box sx={{width:'50%'}}>
            { cartData[item].name}
          </Box>
          <Box sx={{width:'15%'}}>
            {cartData[item].price}
          </Box>
          <Box sx={{width:'15%', textAlign:'center'}}>
            {cartData[item].count}
          </Box>
          <Box sx={{width:'20%'}}>
            {cartData[item].count * cartData[item].price}
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
        </Box>
        <Box sx={{width:'20%'}}>
          ₹ { cartData.totalAmount }
        </Box>
      </Box>
    </>
      <Box sx={{mt:3}}>
        <TextField
          placeholder="Enter your mobile number"
          label="Enter Your Mobile Number"
          variant="outlined"
          fullWidth
          onChange={(e) => setCustMobile(e.target.value)}
          autoComplete='off'
          type="number"
          name="mobileNo"
        />
      </Box>
      <Button variant="contained" sx={{mt:3}} fullWidth onClick={shareToWhatsapp}>
        Order Now</Button>
    </Box>
  </>)
}

export default CartPopup