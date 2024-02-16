import React,  {useContext, useEffect, useState} from 'react'
import { TextField, Button, Box, Card, Paper, Grid } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm, Controller } from "react-hook-form"
import { CommonContext } from '../contexts/CommonContext'
import ImageLoader from '../components/ImageLoader'
import Loader from '../components/Loader'
import FileUploadButton from '../components/FileUploadButton'
import useNetwork from '../hooks/useNetwork'
import { END_POINT } from '../Constants'
import { AuthContext } from '../contexts/AuthContext'


function UpdateCompanyDetails() {

  const location      = useLocation()
  const navigate      = useNavigate()
  const { fetchApi }  = useNetwork()
  const { setUserData : setCacheUserData } = useContext(AuthContext)


  const [loading, setLoading]               = useState(true)
  const [companyLogoUrl, setcompanyLogoUrl] = useState('')
  const [userData, setUserData]             = useState({})

  const { showLoader, hideLoader, showAlert, showSnackbar } = useContext(CommonContext)

  const { register, handleSubmit, control, reset, formState : {errors} } = useForm()

  useEffect(() => {
    setUserData(location.state)
    setLoading(false)
  }, [])

  async function handleCompanyLogoUpload(downloadUrl) {
    setcompanyLogoUrl(downloadUrl)
    if (userData?.companies)
      userData.companies[0].logo = downloadUrl
    else 
      userData.companies = [{logo:downloadUrl}]
  }

  async function onFormSubmit(data) {

    if (companyLogoUrl || (userData?.companies && userData?.companies[0].logo))
      data.logo = (companyLogoUrl || userData.companies[0].logo)

    const companyData = {
      companies : [data]
    } 

    showLoader()
    const resp = await fetchApi(END_POINT.UPDATE_USER_PROFILE, companyData)
    hideLoader()
    if (!resp) return

    setCacheUserData({})
    navigate(-1)
    showSnackbar('Company details updated successfully !')
  }

  return (
    <>
      {
        loading ? <Loader /> :
        <Box>
          <h2>Update Company Details</h2>
          <form onSubmit={handleSubmit(onFormSubmit)}>

            <Box mb={3}>
              <TextField
                placeholder="Enter company name"
                label="Company Name"
                variant="outlined"
                fullWidth
                defaultValue={userData?.companies ? userData?.companies[0].name : ''}
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
                placeholder="Enter company description"
                label="Description"
                variant="outlined"
                fullWidth
                defaultValue={userData?.companies ? userData.companies[0]?.description : ''}
                name="description"
                multiline
                rows={2}
                {...register("description",{
                  required: "Required field"
                })}
                error={Boolean(errors?.description)}
                helperText={errors?.description?.message}
              />
            </Box>

            <Box mb={3}>
              <TextField
                placeholder="Enter company address"
                label="Company Address"
                variant="outlined"
                fullWidth
                defaultValue={userData?.companies ? userData.companies[0]?.address : ''}
                name="address"
                multiline
                rows={4}
                {...register("address",{
                  required: "Required field"
                })}
                error={Boolean(errors?.address)}
                helperText={errors?.address?.message}
              />
            </Box>

            <h4>Company Logo</h4>

            <Box mb={3}>
              <FileUploadButton btnText="Upload Company Logo" onFileChange={handleCompanyLogoUpload} />
            </Box>

            <Box mb={3}>
              {
                userData?.companies && userData?.companies[0].logo ?
                <ImageLoader props={{imgUrl: (companyLogoUrl || userData?.companies[0].logo), styles:{width:'100px'}}} 
                /> : null
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

export default UpdateCompanyDetails
