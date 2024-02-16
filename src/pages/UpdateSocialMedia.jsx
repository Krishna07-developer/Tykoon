import React,  {useContext, useEffect, useState} from 'react'
import { TextField, Button, Box, Card, Paper, Grid } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm, Controller } from "react-hook-form"
import { CommonContext } from '../contexts/CommonContext'
import InputAdornment from '@mui/material/InputAdornment'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'
import LanguageIcon from '@mui/icons-material/Language'
import Loader from '../components/Loader'
import { END_POINT } from '../Constants'
import useNetwork from '../hooks/useNetwork'
import { AuthContext } from '../contexts/AuthContext'


function UpdateSocialMedia() {

  const location = useLocation()
  const navigate = useNavigate()

  const [loading, setLoading]   = useState(true)
  const [userData, setUserData] = useState({})

  const { fetchApi }  = useNetwork()

  const { register, handleSubmit, control, reset, formState : {errors} } = useForm()
  const { showLoader, hideLoader, showAlert, showSnackbar } = useContext(CommonContext)
  const { setUserData : setCacheUserData } = useContext(AuthContext)

  useEffect(() => {
    setUserData(location.state)
    setLoading(false)
  }, [])

  async function onFormSubmit(data) {

    const socialMediaLinks = {
      mediaLinks : data
    }
    showLoader()
    const resp = await fetchApi(END_POINT.UPDATE_USER_PROFILE, socialMediaLinks)
    hideLoader()
    if (!resp) return

    setCacheUserData({})
    navigate(-1)
    showSnackbar('Social Media links updated successfully !')
  }

  return (
    <>
      {
        loading ? <Loader /> :
        <Box>
          <h2>Update Socia Media Links</h2>

          <form onSubmit={handleSubmit(onFormSubmit)}>

            <Box mb={3}>
              <TextField
                placeholder="Enter your facebook link"
                label="Facebook link"
                variant="outlined"
                fullWidth
                defaultValue={userData?.mediaLinks?.facebookLink}
                name="facebookLink"
                {...register("facebookLink",{
                pattern: {
                  value: /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/i,
                  message: "Invalid url pattern",
                }})}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FacebookIcon />
                    </InputAdornment>
                  ),
                }}
                error={Boolean(errors?.facebookLink)}
                helperText={errors?.facebookLink?.message}
              />
            </Box>

            <Box mb={3}>
              <TextField
                placeholder="Enter your twitter link"
                label="Twitter link"
                variant="outlined"
                fullWidth
                defaultValue={userData?.mediaLinks?.twitterLink}
                name="twitterLink"
                {...register("twitterLink",{
                pattern: {
                  value: /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/i,
                  message: "Invalid url pattern",
                }})}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TwitterIcon />
                    </InputAdornment>
                  ),
                }}
                error={Boolean(errors?.twitterLink)}
                helperText={errors?.twitterLink?.message}
              />
            </Box>

            <Box mb={3}>
              <TextField
                placeholder="Enter your linkedin link"
                label="LinkedIn link"
                variant="outlined"
                fullWidth
                defaultValue={userData?.mediaLinks?.linkedinLink}
                name="linkedinLink"
                {...register("linkedinLink",{
                pattern: {
                  value: /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/i,
                  message: "Invalid url pattern",
                }})}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkedInIcon />
                    </InputAdornment>
                  ),
                }}
                error={Boolean(errors?.linkedinLink)}
                helperText={errors?.linkedinLink?.message}
              />
            </Box>

            <Box mb={3}>
              <TextField
                placeholder="Enter your instagram link"
                label="Instagram link"
                variant="outlined"
                fullWidth
                defaultValue={userData?.mediaLinks?.instagramLink}
                name="instagramLink"
                {...register("instagramLink",{
                pattern: {
                  value: /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/i,
                  message: "Invalid url pattern",
                }})}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <InstagramIcon />
                    </InputAdornment>
                  ),
                }}
                error={Boolean(errors?.instagramLink)}
                helperText={errors?.instagramLink?.message}
              />
            </Box>

            <Box mb={3}>
              <TextField
                placeholder="Enter your website link"
                label="Website link"
                variant="outlined"
                fullWidth
                defaultValue={userData?.mediaLinks?.websiteLink}
                name="websiteLink"
                {...register("websiteLink",{
                pattern: {
                  value: /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/i,
                  message: "Invalid url pattern",
                }})}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LanguageIcon />
                    </InputAdornment>
                  ),
                }}
                error={Boolean(errors?.websiteLink)}
                helperText={errors?.websiteLink?.message}
              />
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

export default UpdateSocialMedia
