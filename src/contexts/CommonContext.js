import React, { createContext, useEffect, useState } from 'react'
import { Preferences } from '@capacitor/preferences'

export const CommonContext = createContext()

export const CommonProvider = (props) => {

  const [alert, setAlert]                 = useState(false)
  const [alertText, setAlertText]         = useState('')
  const [loader, setLoader]               = useState(false)
  const [loadingText, setLoadingText]     = useState('Loading...')
  const [snackbar, setSnackbar]           = useState(false)
  const [snackbarText, setSnackbarText]   = useState('')
  const [snackbarType, setSnackbarType]   = useState('success')
  const [updatePercent, setUpdatePercent] = useState(10)
  const [blocker, setBlocker]             = useState(false)
  const [popup, setPopup]                 = useState(false)
  const [popupComp, setPopupComp]         = useState(null)

  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia("(min-width: 768px)").matches
  )

  useEffect(() => {
    window
    .matchMedia("(min-width: 768px)")
    .addEventListener('change', e => setIsDesktop( e.matches ))
  }, [])


  const showLoader = (loadingText) => {
    setLoadingText(loadingText)
    setLoader(true)
  }

  const hideLoader = () => {
    setLoader(false)
    setLoadingText('Loading...')
  }

  const showAlert = (alertText) => {
    setAlertText(alertText)
    setAlert(true)
  }

  const hideAlert = () => {
    setAlert(false)
  }

  const showSnackbar = (snackbarText, type) => {
    setSnackbarText(snackbarText)
    setSnackbarType(type)
    setSnackbar(true)
  }

  const hideSnackbar = () => {
    setSnackbar(false)
    setSnackbarText(null)
    setSnackbarType('success')
  }

  const showPopup = (alertComp) => {
    setPopup(true)
    setPopupComp(alertComp)
 
  }

  const hidePopup = () => {
    setPopup(false)
    setPopupComp(null)
  }

  const value = {

    showLoader,
    hideLoader,
    showAlert,
    hideAlert,
    showSnackbar,
    hideSnackbar,
    setSnackbarType,
    setBlocker,
    setUpdatePercent,
    showPopup,
    hidePopup,
    setPopupComp,
    setPopup,

    popup,
    popupComp,
    loader,
    loadingText,
    alert,
    alertText,
    snackbar,
    snackbarText,
    snackbarType,
    blocker, 
    isDesktop,
    updatePercent
  }

  return <CommonContext.Provider value={value}> {props.children} </CommonContext.Provider>
}
