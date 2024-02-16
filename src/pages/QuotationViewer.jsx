import { TextField, Button, Box, Paper, Stack } from '@mui/material'
import { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { jsPDF } from "jspdf"
import html2canvas from 'html2canvas'


function QuotationViewer(props) {

  const orderItems   = props.invoiceData
  const clientInfo   = props.clientInfo
  const { userData } = useContext(AuthContext)

  const downloadPdf = () => {
    const input = document.getElementById('divToPrint')
    html2canvas(input, {
                scale: 0.5,
                useCORS : true
      })
      .then((canvas) => {
        
        const imgData = canvas.toDataURL('image/png', 1.0)
        let pdf = new jsPDF('p', 'mm', 'a4')
        pdf.addImage(imgData, 'png', 0, 0)
        pdf.save("quotation.pdf")
      })
  }

  return(<Box>

  <Box sx={{width:"70vw"}}>
  {
    orderItems.length ? 
    <>
    <Stack>
      <Box sx={{fontSize:'40px', color:'#058cdb'}}>QUOTATION</Box>
    </Stack>
    <Stack mt={3}>
      <img src={userData?.companies[0].logo} style={{width:'100px', mt:1}} />
      <Box mt={1}>
        {userData?.companies[0].name}
      </Box>
      <Box>
        {userData?.companies[0].address}
      </Box>
    </Stack>
    <Stack mb={4} mt={4}>
      <b>To:</b>
      {clientInfo}
    </Stack>
     <Box sx={{display:'flex', fontWeight:'bold', background:'#eaeaea', padding:'10px'}} mb={1}>
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
        return <Box key={index} sx={{display:'flex', padding:'10px'}} mb={1}>
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
      <Box sx={{display:'flex', fontWeight:'bold', borderTop:'1px solid #eaeaea', padding:'10px'}} mt={2} pt={2}>
        <Box sx={{width:'50%'}}>
          Total
        </Box>
        <Box sx={{width:'15%'}}>

        </Box>
        <Box sx={{width:'15%', textAlign:'center'}}>
          {
            orderItems.reduce((accumulator, item) => {
              return accumulator + item.qty
            }, 0)
          }
        </Box>
        <Box sx={{width:'20%'}}>
          {
            orderItems.reduce((accumulator, item) => {
              return accumulator + (item.price * item.qty)
            }, 0)
          }
        </Box>
      </Box>
    </> : null
  }
  </Box>


  <Box sx={{position:'absolute', left:'-9999px'}}>

    <Box id="divToPrint" sx={{padding:'20px', fontSize:'30px',  width:"400mm", height:"600mm"}}>
    {
      orderItems.length ? 
      <>
      <Stack>
        <Box sx={{fontSize:'40px', color:'#058cdb'}}>QUOTATION</Box>
      </Stack>
      <Stack mt={3}>
        <img src={userData?.companies[0].logo} style={{width:'100px', mt:1}} />
        <Box mt={1}>
          {userData?.companies[0].name}
        </Box>
        <Box>
          {userData?.companies[0].address}
        </Box>
      </Stack>
      <Stack mb={4} mt={4}>
        <b>To:</b>
        {clientInfo}
      </Stack>
      <Box sx={{display:'flex', fontWeight:'bold', background:'#eaeaea', padding:'10px'}} mb={1}>
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
          return <Box key={index} sx={{display:'flex', padding:'10px'}} mb={1}>
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
        <Box sx={{display:'flex', fontWeight:'bold', borderTop:'1px solid #eaeaea', padding:'10px'}} mt={2} pt={2}>
          <Box sx={{width:'50%'}}>
            Total
          </Box>
          <Box sx={{width:'15%'}}>

          </Box>
          <Box sx={{width:'15%', textAlign:'center'}}>
            {
              orderItems.reduce((accumulator, item) => {
                return accumulator + item.qty
              }, 0)
            }
          </Box>
          <Box sx={{width:'20%'}}>
            {
              orderItems.reduce((accumulator, item) => {
                return accumulator + (item.price * item.qty)
              }, 0)
            }
          </Box>
        </Box>
      </> : null
    }
    </Box>

  </Box>


  <Button variant='contained' fullWidth sx={{mt:3}}
    onClick={downloadPdf}>
    Download PDF
  </Button>
  </Box>)
}

export default QuotationViewer