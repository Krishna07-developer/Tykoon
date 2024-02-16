import React,  {useContext, useEffect, useState} from 'react'
import { TextField, Button, Box, Card, Paper, Grid } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm, Controller } from "react-hook-form"
import { AuthContext } from '../contexts/AuthContext'
import { CommonContext } from '../contexts/CommonContext'
import ImageLoader from '../components/ImageLoader'
import useNetwork from '../hooks/useNetwork'
import Loader from '../components/Loader'
import FileUploadButton from '../components/FileUploadButton'
import { END_POINT } from '../Constants'


function UpdatePayments() {

  const [loading, setLoading]   = useState(true)
  const [userData, setUserData] = useState({})
  const [qrImgUrl, setQrImgUrl] = useState('')

  const { fetchApi } = useNetwork()
  const location     = useLocation()
  const navigate     = useNavigate()

  const { register, handleSubmit, control, reset, formState : {errors} } = useForm()
  const { showLoader, hideLoader, showAlert, showSnackbar } = useContext(CommonContext)
  const { setUserData : setCacheUserData } = useContext(AuthContext)

  useEffect(() => {
    setUserData(location.state)
    setLoading(false)
  }, [])

  async function handleQrImgUpload(downloadUrl) {
    setQrImgUrl(downloadUrl)
    setUserData({payments : {qrImgUrls : [downloadUrl]}})
  }
  
  async function onFormSubmit(data) {

    let paymentObj = {}
    if (qrImgUrl || (userData?.payments && userData.payments.qrImg))
      paymentObj.qrImgUrls    = [qrImgUrl || userData.payments.qrImg[0]]
    paymentObj.upi = data.upi
    paymentObj.accounts = [
      {
        accountName   : data.accountName,
        accountNumber : data.accountNumber,
        ifscCode      : data.ifscCode
      }
    ]
    const paymentData = {
      payments : paymentObj
    } 

    showLoader()
    const resp = await fetchApi(END_POINT.UPDATE_USER_PROFILE, paymentData)
    hideLoader()
    if (!resp) return

    setCacheUserData({})
    navigate(-1)
    showSnackbar('Payment details updated successfully !')
  }

  return (
    <>
      {
        loading ? <Loader /> :
        <Box>
          <h2>Update Payment Details</h2>
          <form onSubmit={handleSubmit(onFormSubmit)}>

            <h4>Bank Account Details</h4>
            <Box mb={3}>
              <TextField
                placeholder="Enter your bank account name"
                label="Account Name"
                ariant="outlined"
                fullWidth
                defaultValue={userData?.payments && userData.payments.accounts ? userData.payments.accounts[0].accountName : null}
                name="accountName"
                {...register("accountName")}
                error={Boolean(errors?.accountName)}
                helperText={errors?.accountName?.message}
              />
            </Box>

            <Box mb={3}>
              <TextField
                placeholder="Enter your bank account number"
                label="Account Number"
                ariant="outlined"
                fullWidth
                defaultValue={userData?.payments && userData.payments.accounts ? userData.payments.accounts[0].accountNumber : null}
                name="accountNumber"
                {...register("accountNumber")}
                error={Boolean(errors?.accountNumber)}
                helperText={errors?.accountNumber?.message}
              />
            </Box>

            <Box mb={3}>
              <TextField
                placeholder="Enter your ifsc code"
                label="IFSC Code"
                ariant="outlined"
                fullWidth
                defaultValue={userData?.payments && userData.payments.accounts ? userData.payments.accounts[0].ifscCode : null}
                name="ifscCode"
                {...register("ifscCode")}
                error={Boolean(errors?.ifscCode)}
                helperText={errors?.ifscCode?.message}
              />
            </Box>

            <h4>UPI Details</h4>

            <Box mb={3}>
              <TextField
                placeholder="Enter your UPI ID"
                label="UPI ID"
                ariant="outlined"
                fullWidth
                defaultValue={userData?.payments ? userData.payments.upi : null}
                name="upi"
                {...register("upi")}
                error={Boolean(errors?.upi)}
                helperText={errors?.upi?.message}
              />
            </Box>

            <h4>Payment QR Code</h4>

            <Box mb={3}>
              <FileUploadButton btnText="Upload Payment QR" onFileChange={handleQrImgUpload}/>
            </Box>

            <Box mb={3}>
              {
                userData.payments && userData?.payments.qrImgUrls && userData.payments.qrImgUrls[0] ?
                <ImageLoader props={{imgUrl:userData.payments.qrImgUrls[0], styles : {width:'100px'}}} /> : null
              }
            </Box>

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{marginBottom:'20px'}}>
            Save 
          </Button>
        </form>
        </ Box>
      }
    </>
  )
}

export default UpdatePayments
