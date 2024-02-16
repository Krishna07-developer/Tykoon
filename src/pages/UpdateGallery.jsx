import React,  {useContext, useEffect, useState} from 'react'
import { TextField, Button, Box, Card, Paper, Grid } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm, Controller } from "react-hook-form"
import { CommonContext } from '../contexts/CommonContext'
import useNetwork from '../hooks/useNetwork'
import FileUploadButton from '../components/FileUploadButton'
import { END_POINT } from '../Constants'
import Loader from '../components/Loader'
import ImageLoader from '../components/ImageLoader'
import { AuthContext } from '../contexts/AuthContext'


function UpdateGallery() {

  const location = useLocation()
  const navigate = useNavigate()
  
  const [loading, setLoading]   = useState(true)
  const [userData, setUserData] = useState({})

  const { fetchApi } = useNetwork()
  const { setUserData : setCacheUserData } = useContext(AuthContext)
  const { showLoader, hideLoader, showAlert, showSnackbar } = useContext(CommonContext)

  useEffect(() => {
    setUserData(location.state)
    setLoading(false)
  }, [])

  function removeProuctImg(imgUrl) {
    showLoader()
    const galleryData = {
      gallery : {
        imgUrls : userData.gallery.imgUrls.filter(img => img != imgUrl)
      }
    }
    updateGalleryData(galleryData, true, imgUrl)
  }

  async function handleProductImgUpload(downloadUrl) {
    
    let data = {}
    data.imgUrls = userData?.gallery?.imgUrls || []
    data.imgUrls.push(downloadUrl)
    const galleryData = {
      gallery : data
    } 
    updateGalleryData(galleryData,false, downloadUrl)
  }

  async function updateGalleryData(galleryData, isRemove, imgUrl) {

    showLoader()

    if(isRemove) 
      userData.gallery.imgUrls = userData.gallery.imgUrls.filter(img => img != imgUrl)  
    if (!userData.gallery)  
      userData.gallery = galleryData.gallery

    const resp = await fetchApi(END_POINT.UPDATE_USER_PROFILE, galleryData)
    hideLoader()
    if (!resp) return

    setCacheUserData({})
    navigate(-1)
    showSnackbar('Gallery images updated successfully !')
  }

  return (
    <>
      {
        loading ? <Loader /> :
        <Box>
          <h2>Update Gallery Items</h2>

          <Box mb={3} mt={3}>
            {
              userData.gallery && userData.gallery.imgUrls && userData.gallery.imgUrls.length ?
              userData.gallery.imgUrls.map(img => 
                <Paper sx={{margin:'10px', display:'flex', alignItems:'center', justifyContent:'center'}}  key={img}>
                  <ImageLoader props={{imgUrl:img, styles : {width:'100px'}}} />
                  <Button
                    variant="contained"
                    onClick={() => removeProuctImg(img)}
                    component="label">
                    Remove
                  </Button>
                </Paper>
              ) : null
            }
          </Box>
          <Box pb={5}>
            <FileUploadButton btnText="Upload New Image" onFileChange={handleProductImgUpload} />
          </Box>
      </ Box>
      }
    </>
  )
}

export default UpdateGallery
