import React, { useContext, useState, useEffect } from 'react'
import { TextField, Button, Box } from '@mui/material'
import { useForm } from "react-hook-form"
import { CommonContext } from '../contexts/CommonContext'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import TykoonLogo from '../assets/tykoon-full-logo.png'
import { Capacitor } from '@capacitor/core'
import { useLocation } from 'react-router-dom'
import useNetwork from "../hooks/useNetwork"
import { END_POINT, ERROR_CODES } from '../Constants'
import { Preferences } from '@capacitor/preferences'
import Loader from '../components/Loader'


const styles = {
  homeLogo : {
    width : '92vw',
    maxWidth:'350px'
  },
  mainCont : {
    maxWidth:'500px', 
    marginTop:'15vh', 
    display:'flex', 
    justifyContent:'center', 
    flexDirection:'column'
  },
  mainContDesk : {
    marginTop:'15vh', 
    display:'flex', 
    justifyContent:'center', 
    flexDirection:'column',
    padding:'1vw 30vw 5vw 30vw'
  }
}

function Authentication(props) {

  const navigate     = useNavigate()
  const location     = useLocation()
  const { fetchApi } = useNetwork()

  const { userLoginSuccessfull } = useContext(AuthContext)

  const [showOtp, setShowOtp]       = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [userData, setUserData]     = useState(null)
  const [loading, setLoading]       = useState(true)

  const { register, handleSubmit, control, reset, formState : {errors:errors} } = useForm()
  const { register : registerOtp, handleSubmit : submitOtp, reset : resetOtp, formState : {errors:errorsOtp} } = useForm()
  const { register : registerUser, handleSubmit : signupUser, reset : resetSignup, formState : {errors:errorSignup} } = useForm()
  const { showLoader, hideLoader, isDesktop } = useContext(CommonContext)


  useEffect(() => {
    checkLogin()
  }, [])

  async function checkLogin() {

    const { value } = await Preferences.get({ key: 'userId' }) 
    setLoading(false)
    if (value) navigate("/home")
  }

  const switchLogin = () => {
    setShowSignIn(!showSignIn) 
    reset()
    resetSignup()
  }

  const loginUser = async(data) => {

    showLoader()
    const userResp = await fetchApi(END_POINT.GET_USER_DATA, {userId : data.mobileNo})
    hideLoader()
    if (!userResp) return

    setUserData(userResp)
    const params = { mobileNo  : data.mobileNo,
                     platform  : Capacitor.getPlatform(),
                     timeStamp : Date.now()
                   }
    sendOtp(params)
  }

  const sendOtp = async(params) => {

    showLoader()
    const resp = await fetchApi(END_POINT.GENERATE_SIGNUP_OTP, params)
    hideLoader()
    if (!resp) return

    setShowOtp(true)
  }

  const verifyOtp = async(data) => {

    const params = {
      mobileNo : userData.mobileNo,
      otp      : data.otp
    }

    showLoader()
    const resp = await fetchApi(END_POINT.VALIDATE_SIGNUP_OTP, params)
    hideLoader()
    if (!resp) return

    if (showSignIn) 
      goToHome()
    else
      createNewUser()
  }

  const signUpNewUser = async(data) => {

    showLoader()
    const userResp = await fetchApi(END_POINT.CHECK_USER_EXISTS, {mobileNo : data.mobileNo})
    hideLoader()
    if (!userResp) return

    const params = { mobileNo  : data.mobileNo,
                     fullName  : data.fullName,
                     platform  : Capacitor.getPlatform(),
                     timeStamp : Date.now()
                   }
    setUserData(params)
    sendOtp(params)
  }

  const createNewUser = async() => {

    showLoader()
    const resp = await fetchApi(END_POINT.CREATE_NEW_USER, userData)
    hideLoader()
    if (!resp) return

    goToHome()
  }

  const goToHome = async() => {
    await userLoginSuccessfull(userData)
    navigate('/home')
  }

  return (<>
    {
      loading ? <Loader /> : 
      <Box style={isDesktop ? styles.mainContDesk : styles.mainCont}>
        <Box>
          <Box sx={{textAlign:'center', marginTop:'2vh'}}>
            <img src={TykoonLogo} style={styles.homeLogo}/>
          </Box>
          {
            showOtp ? 
            <Box sx={{textAlign:'center', padding:'4vw', display:'flex', flexDirection:'column', alignItems:'center'}}>
              <Box sx={{width:'100%'}}>
                <form onSubmit={submitOtp(verifyOtp)}>
                  <h5>Enter OTP sent to your mobile number</h5>
                  <Box mb={3}>
                    <TextField
                      placeholder="Enter OTP"
                      label="OTP Number"
                      variant="outlined"
                      fullWidth
                      type="number"
                      autoComplete='off'
                      name="otp"
                      {...registerOtp("otp", {
                        required: "Required field"})}
                      error={Boolean(errorsOtp?.otp)}
                      helperText={errorsOtp?.otp?.message}
                    />
                  </Box>
                  <Button type="submit" variant="contained" color="primary" fullWidth id='sign-in-button'>
                    Verify OTP
                  </Button>
                </form>
              </Box> 
            </Box> : null
          }
        </Box>
        <Box>
          {
            showOtp ? null : 
            <Box>
              {
                showSignIn ?
                <Box p={2}>
                  <h2>Login</h2>
                  <Box>   
                    <form onSubmit={handleSubmit(loginUser)} key={1}>
                    <Box mb={3}>
                        <TextField
                          placeholder="Enter your mobile number"
                          label="Mobile Number"
                          variant="outlined"
                          fullWidth
                          autoComplete='off'
                          type="number"
                          name="mobileNo"
                          {...register("mobileNo", {
                            required: "Required field",
                            pattern: {
                              value: /^[7896]\d{9}$/,
                              message: "Invalid mobile number",
                            },
                          })}
                          error={Boolean(errors?.mobileNo)}
                          helperText={errors?.mobileNo?.message}
                        />
                      </Box>

                      <Button type="submit" variant="contained" color="primary" fullWidth>
                        Log In 
                      </Button>
                    </form>
                    <Box onClick={switchLogin} sx={{textAlign:'center', marginTop:'35px'}}>
                      <Button variant='outlined'>Create Account</Button>
                    </Box>
                  </Box>  
                </Box> 
                : 
                <Box p={2}>
                  <h2>Become a Tykoon</h2>
                  <form onSubmit={signupUser(signUpNewUser)} key={2}>
                    <Box mb={3}>
                      <TextField
                        placeholder="Enter your full name"
                        label="Full Name"
                        variant="outlined"
                        fullWidth
                        autoComplete='off'
                        name="fullName"
                        {...registerUser("fullName", {
                          required: "Required field"
                        })}
                        error={Boolean(errorSignup?.fullName)}
                        helperText={errorSignup?.fullName?.message}
                      />
                    </Box>

                    <Box mb={3}>
                      <TextField
                        placeholder="Enter your mobile number"
                        label="Mobile Number"
                        variant="outlined"
                        fullWidth
                        autoComplete='off'
                        type="number"
                        name="mobileNo"
                        {...registerUser("mobileNo", {
                          required: "Required field",
                          pattern: {
                            value: /^[7896]\d{9}$/,
                            message: "Invalid mobile number",
                          },
                        })}
                        error={Boolean(errorSignup?.mobileNo)}
                        helperText={errorSignup?.mobileNo?.message}
                      />
                    </Box>

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                      Sign Up 
                    </Button>
                  </form>
                      
                  <Box onClick={switchLogin} sx={{textAlign:'center', marginTop:'35px'}}>
                    <Button variant='outlined'>Login</Button>
                  </Box>
                </Box>
              }
            </Box>
          }
        </Box>
      </Box>
    }
  </>)
}

export default Authentication
