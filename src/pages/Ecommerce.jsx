import { useContext, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Box, Button, Paper, Stack } from "@mui/material"
import { useNavigate } from "react-router-dom"
import ImageLoader from "../components/ImageLoader"
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const styles = {
  productPic : {
    width:'100px'
  }
}

function Ecommerce() {
  
  const { userData } = useContext(AuthContext)
  const navigate     = useNavigate()
  
  return(<>
  <h2>Ecommerce Products</h2>
  {
    userData?.ecommProducts?.length ? <>
      {
        userData?.ecommProducts.map((product, index) => {
          return <Paper key={index} sx={{mb:2}}
            onClick={() => navigate('/addEcommProduct', 
                    {state : {activeIndex : index, isEdit : true, userData : userData}})}>
            
            <Stack direction="row">
              {
                product?.imgUrls ?
                <ImageLoader props={{imgUrl:product.imgUrls[0], styles:styles.productPic}}/>
                :
                <AccountCircleIcon style={styles.defIcon}/>
              }

              <Box sx={{ml:2}}>
                <Box sx={{mb:1, mt:1,}}>
                  <b>{product.name}</b> 
                </Box>

                <Box sx={{mb:1, mt:1,}}>
                  {product.description}
                </Box>

                <Box sx={{mb:1, mt:1,}}>
                  <b>₹ {product.price}</b> 
                </Box>
              </Box>
            </Stack>

          </Paper>
        })
      }
    </> :
    <>
      <h2>No Products Added</h2>
    </>
  }
  <Button variant="contained" fullWidth sx={{mt:3}}
    onClick={() => navigate('/addEcommProduct', { state : {isEdit : false, userData : userData}}) }>
    Add New Product
  </Button>
  </>)
}

export default Ecommerce