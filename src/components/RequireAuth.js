import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'
import { Preferences } from '@capacitor/preferences'
import { END_POINT } from '../Constants'
import useNetwork from '../hooks/useNetwork'
import { Box } from '@mui/material'

function RequireAuth({props}) {

  const { fetchApi } = useNetwork()

  const [ loading, setLoading ] = useState(true)

  const { isUserLoggedIn, setIsUserLoggedIn, setUserId, setUserData, userData } = useContext(AuthContext)

  useEffect(() => {
   checkLogin()
  }, [])

  async function checkLogin() {
    const { value } = await Preferences.get({ key: 'userId' })
    if (value && !userData?.tykoonUrl) {
      const resp = await fetchApi(END_POINT.GET_USER_DATA, {userId : value})
      setUserData(resp)
    } 
    setIsUserLoggedIn(value ? true : false)
    if (value) setUserId(value)
    setLoading(false)
  }
  
  return <>
    {
      loading ? <Box sx={{padding:'4vw'}}> <Loader /> </Box>  : 
      <>
        {
          isUserLoggedIn ? <Outlet /> : <Navigate to="/auth" replace="true"/> 
        }
      </>
    }
  </>
}

export default RequireAuth
