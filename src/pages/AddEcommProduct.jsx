import React,  {useContext, useEffect, useState} from 'react'
import { TextField, Button, Box, Card, Paper, Grid } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm, Controller } from "react-hook-form"
import { CommonContext } from '../contexts/CommonContext'
import ImageLoader from '../components/ImageLoader'
import FileUploadButton from '../components/FileUploadButton'
import useNetwork from '../hooks/useNetwork'
import { END_POINT } from '../Constants'
import { AuthContext } from '../contexts/AuthContext'


function AddEcommProduct() {

  const { fetchApi }  = useNetwork()
  const navigate      = useNavigate()
  const location      = useLocation()

  const [productImgUrl, setProductImgUrl]  = useState('')

  const activeIndex = location?.state.activeIndex || 0,
        isEdit      = location.state.isEdit,
        userData    = location.state.userData

  const { showLoader, hideLoader, showAlert, showSnackbar } = useContext(CommonContext)
  const { register, handleSubmit, control, reset, formState : {errors} } = useForm()
  const { setUserData : setCacheUserData } = useContext(AuthContext)

  async function handleProductImgUpload(downloadUrl) {

    setProductImgUrl(downloadUrl)
  }

  async function onFormSubmit(data) {

    if (!isEdit && !productImgUrl) {
      showSnackbar('Please upload product image', 'error')
      return
    }

    data.imgUrls = [productImgUrl || userData.ecommProducts[activeIndex].imgUrls[0]]
    let finalData = userData?.ecommProducts || []

    if (isEdit) {
      finalData[activeIndex] = data
    } else {
      data.id = Date.now()
      finalData.push(data)
    }

    const ecommProducts = {
      ecommProducts : finalData
    } 

    showLoader()
    const resp = await fetchApi(END_POINT.UPDATE_USER_PROFILE, ecommProducts)
    hideLoader()
    if (!resp) return

    setCacheUserData({})
    navigate(-1)
    showSnackbar('Ecommerce product updated successfully !')
  }

  const deleteProduct = async() => {

    let finalData =  new Array(userData?.ecommProducts)
    finalData.splice(activeIndex, 1)

    const ecommProducts = {
      ecommProducts : finalData || []
    } 

    showLoader()
    const resp = await fetchApi(END_POINT.UPDATE_USER_PROFILE, ecommProducts)
    hideLoader()
    if (!resp) return

    setCacheUserData({})
    navigate(-1)
    showSnackbar('Ecommerce product deleted successfully !')    
  }


  return(<>
          <Box>
          <h2> { isEdit ? 'Edit' : 'Add'} Ecommerce Product</h2>
          <form onSubmit={handleSubmit(onFormSubmit)}>

            <Box mb={3}>
              <TextField
                placeholder="Enter product name"
                label="Product Name"
                variant="outlined"
                fullWidth
                defaultValue={isEdit ? userData.ecommProducts[activeIndex].name : ''}
                name="name"
                {...register("name", {
                  required: "Required field"
                })}
                error={Boolean(errors?.name)}
                helperText={errors?.name?.message}
              />
            </Box>

            <Box mb={3}>
              <TextField
                placeholder="Enter product description"
                label="Product Description"
                variant="outlined"
                fullWidth
                defaultValue={isEdit ? userData.ecommProducts[activeIndex].description : ''}
                name="description"
                multiline
                rows={3}
                {...register("description",{
                  required: "Required field"
                })}
                error={Boolean(errors?.description)}
                helperText={errors?.description?.message}
              />
            </Box>

            <Box mb={3}>
              <TextField
                placeholder="Enter product price"
                label="Price"
                variant="outlined"
                fullWidth
                type='number'
                defaultValue={isEdit ? userData.ecommProducts[activeIndex].price : ''}
                name="price"
                {...register("price", {
                  required: "Required field"
                })}
                error={Boolean(errors?.price)}
                helperText={errors?.price?.message}
              />
            </Box>

            <Box mb={3}>
              <FileUploadButton btnText="Upload Product Image" onFileChange={handleProductImgUpload} />
            </Box>

            <Box mb={3}>
              {
                (isEdit || productImgUrl) && 
                <ImageLoader props={{imgUrl: (productImgUrl || userData?.ecommProducts[activeIndex]?.imgUrls[0]), 
                  styles: {width:'100px'}}} />
              }
            </Box>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isEdit ? 'Save' : 'Add'} 
          </Button>
          {
            isEdit ?  
            <Button variant="outlined" color="danger"  sx={{mt:4}} fullWidth
              onClick={() => deleteProduct()}>
              Delete Product
            </Button> : null
          }
          
        </form>
        </ Box>
  </>)
}

export default AddEcommProduct