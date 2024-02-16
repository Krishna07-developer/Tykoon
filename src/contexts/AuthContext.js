import React, { useEffect, useState, useContext } from 'react'
import { Preferences } from '@capacitor/preferences'
import { useNavigate } from 'react-router-dom'

export const AuthContext = React.createContext()

export const AuthContextProvider = (props) => {

  const navigate = useNavigate()

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [userId, setUserId]                 = useState(null)
  const [userData, setUserData]             = useState({})

  useEffect(() => {

  }, [])

  const value = {
    isUserLoggedIn,
    setIsUserLoggedIn,
    userLoginSuccessfull,
    userId,
    setUserId,
    userData,
    setUserData,
    logout
  }

  async function userLoginSuccessfull(data) {

   const resp = await Preferences.set({
      key: 'userId',
      value: data.mobileNo.toString(),
    })
  }

  async function logout() {

    setUserId(null)
    setUserData({})
    await Preferences.remove({ key: 'userId' })
    navigate("/", {replace:true})
  }

  return(
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}