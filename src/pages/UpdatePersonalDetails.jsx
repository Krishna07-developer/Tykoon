import React,  {useContext, useEffect, useState} from 'react'
import { TextField, Button, Box, Card, Paper, Grid, Input } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm, Controller } from "react-hook-form"
import { AuthContext } from '../contexts/AuthContext'
import { CommonContext } from '../contexts/CommonContext'
import ImageLoader from '../components/ImageLoader'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Loader from '../components/Loader'
import useNetwork from '../hooks/useNetwork'
import { END_POINT } from '../Constants'
import FileUploadButton from '../components/FileUploadButton'


const styles = {
  center : {
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  profilePicCont : {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    fontSize:'25vw'
  },
  profilePic : {
    width:'30vw',
    height:'30vw',
    border: '1px solid #b8b8b8',
    borderRadius:'50%'
  },
  defIcon: {
    fontSize:'25vw'
  }
}

function UpdatePersonalDetails() {

  const location                 = useLocation()
  const { fetchApi, uploadFile } = useNetwork()
  const navigate                 = useNavigate()

  const { showLoader, hideLoader, showAlert, showSnackbar } = useContext(CommonContext)

  const [loading, setLoading]   = useState(true)
  const [userData, setUserData] = useState({})

  const { register, handleSubmit, control, reset, formState : {errors} } = useForm()
  const { setUserData : setCacheUserData } = useContext(AuthContext)


  useEffect(() => {
    setUserData(location.state)
    setLoading(false)
  }, [])

  async function updateProfilePicUrl(imgUrl) {

    showLoader()
    const resp = await fetchApi(END_POINT.UPDATE_USER_PROFILE, { profilePicUrl : imgUrl })
    hideLoader()
    if (!resp) return

    userData['profilePicUrl'] = imgUrl
    showSnackbar("Profile updated successfully !")
  }

  async function onFormSubmit(data) {

    showLoader()
    const resp = await fetchApi(END_POINT.UPDATE_USER_PROFILE, data)
    hideLoader()
    if (!resp) return

    setCacheUserData({})
    navigate(-1)
    showSnackbar("Profile updated successfully !")
  }

  return (
    <>
      {
        loading ? <Loader /> :
        <Box style={styles.whiteBg}>
          <h2 style={styles.center}>Update Personal Details</h2>
          <div style={styles.profilePicCont}> 
            {
              userData?.profilePicUrl ?
              <ImageLoader props={{imgUrl:userData.profilePicUrl, styles: {width:'100px'} }}/>
               :
              <AccountCircleIcon style={styles.defIcon}/>
            }
          </div>

          <FileUploadButton btnText='Update Profile Pic' onFileChange={updateProfilePicUrl} />
          
          <form onSubmit={handleSubmit(onFormSubmit)}>

            <Box mb={3}>
              <TextField
                placeholder="Enter your full name"
                label="Full Name"
                variant="outlined"
                fullWidth
                defaultValue={userData.fullName}
                name="fullName"
                {...register("fullName", {
                  required: "Required field"
                })}
                error={Boolean(errors?.fullName)}
                helperText={errors?.fullName?.message}
              />
            </Box>

            <Box mb={3}>
              <TextField
                placeholder="Enter your mobile number"
                label="Mobile Number"
                variant="outlined"
                fullWidth
                defaultValue={userData.mobileNo}
                disabled
                name="mobileNo"
                {...register("mobileNo", {
                  pattern: {
                    value: /^[7896]\d{9}$/,
                    message: "Invalid mobile number",
                  },
                })}
                error={Boolean(errors?.mobileNo)}
                helperText={errors?.mobileNo?.message}
              />
            </Box>

            <Box mb={3}>
              <TextField
                placeholder="Enter whatsapp number"
                label="WhatsApp Number"
                variant="outlined"
                fullWidth
                defaultValue={userData.whatsappNo}
                name="whatsappNo"
                {...register("whatsappNo", {
                  required: "Required field",
                  pattern: {
                    value: /^[7896]\d{9}$/,
                    message: "Invalid mobile number",
                  },
                })}
                error={Boolean(errors?.whatsappNo)}
                helperText={errors?.whatsappNo?.message}
              />
            </Box>

            <Box mb={3}>
              <TextField
                placeholder="Enter your email"
                label="Email ID"
                variant="outlined"
                fullWidth
                autoComplete='off'
                name="email"
                defaultValue={userData.email}
                {...register("email", {
                  required: "Required field",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={Boolean(errors?.email)}
                helperText={errors?.email?.message}
              />
            </Box>

            <Box mb={3}>
              <TextField
                placeholder="Enter your designation"
                label="Proffesion"
                variant="outlined"
                fullWidth
                defaultValue={userData.profession}
                name="profession"
                {...register("profession")}
                error={Boolean(errors?.profession)}
                helperText={errors?.profession?.message}
              />
            </Box>

            <Box mb={3}>
              <TextField
                placeholder="Enter address"
                label="Address"
                variant="outlined"
                fullWidth
                defaultValue={userData.address}
                name="address"
                multiline
                rows={4}
                {...register("address")}
                error={Boolean(errors?.address)}
                helperText={errors?.address?.message}
              />
            </Box>

            <Box mb={3}>
              <TextField
                placeholder="Enter description about you"
                label="About Me"
                variant="outlined"
                fullWidth
                defaultValue={userData.aboutMe}
                name="aboutMe"
                multiline
                rows={4}
                {...register("aboutMe")}
                error={Boolean(errors?.aboutMe)}
                helperText={errors?.aboutMe?.message}
              />
            </Box>

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{marginBottom:'25px'}}>
            Save 
          </Button>
        </form>
        </ Box>
      }
    </>
  )
}

export default UpdatePersonalDetails
