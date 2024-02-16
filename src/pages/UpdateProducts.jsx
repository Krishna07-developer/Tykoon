import React,  {useContext, useEffect, useState} from 'react'
import { TextField, Button, Box, Card, Paper, Grid } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm, Controller } from "react-hook-form"
import { AuthContext } from '../contexts/AuthContext'
import { CommonContext } from '../contexts/CommonContext'
import ImageLoader from '../components/ImageLoader'
import Loader from '../components/Loader'
import FileUploadButton from '../components/FileUploadButton'
import useNetwork from '../hooks/useNetwork'
import { END_POINT } from '../Constants'


function UpdateProducts() {

  const location = useLocation()
  const navigate = useNavigate()


  const [loading, setLoading]             = useState(true)
  const [userData, setUserData]           = useState({})
  const [productImgUrl, setProductImgUrl] = useState('')

  const { fetchApi }  = useNetwork()
  const { showLoader, hideLoader, showAlert, showSnackbar } = useContext(CommonContext)
  const { register, handleSubmit, control, reset, formState : {errors} } = useForm()
  const { setUserData : setCacheUserData } = useContext(AuthContext)

  
  useEffect(() => {
    setUserData(location.state)
    setLoading(false)
  }, [])

  async function handleProductImgUpload(downloadUrl) {

    setProductImgUrl(downloadUrl)
    if (userData.products)
      userData.products[0].imgUrls = [downloadUrl]
    else  
      userData.products = [{imgUrls : [downloadUrl]}]
  }
  
  async function onFormSubmit(data) {

    if (productImgUrl || (userData?.products && userData.products.imgUrls))
      data.imgUrls = [productImgUrl || userData.products[0].imgUrls[0]]

    const productsData = {
      products : [data]
    } 
    
    showLoader()
    const resp = await fetchApi(END_POINT.UPDATE_USER_PROFILE, productsData)
    hideLoader()
    if (!resp) return

    setCacheUserData({})
    navigate(-1)
    showSnackbar('Products data updated successfully !')
  }

  return (
    <>
      {
        loading ? <Loader /> :
        <Box>
          <h2>Update Products & Services</h2>
          <form onSubmit={handleSubmit(onFormSubmit)}>

            <Box mb={3}>
              <TextField
                placeholder="Enter product name"
                label="Product Name"
                variant="outlined"
                fullWidth
                defaultValue={userData?.products ? userData.products[0].name : ''}
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
                defaultValue={userData?.products ? userData.products[0].description : ''}
                name="description"
                multiline
                rows={4}
                {...register("description",{
                  required: "Required field"
                })}
                error={Boolean(errors?.description)}
                helperText={errors?.description?.message}
              />
            </Box>

            <Box mb={3}>
              <FileUploadButton btnText="Upload Product Banner" onFileChange={handleProductImgUpload} />
            </Box>

            <Box mb={3}>
                {
                  userData?.products && userData.products[0].imgUrls ?
                  <ImageLoader props={{imgUrl: (productImgUrl || userData.products[0].imgUrls[0]), 
                    styles: {width:'100px'}}} />
                  : null
                }
            </Box>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save 
          </Button>
        </form>
        </ Box>
      }
    </>
  )
}

export default UpdateProducts
