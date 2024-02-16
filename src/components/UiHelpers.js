import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import CloseIcon from '@mui/icons-material/Close'
import DialogTitle from '@mui/material/DialogTitle'
import { Outlet } from 'react-router-dom'
import { CommonContext } from '../contexts/CommonContext'
import { Box } from '@mui/material'
import { useContext } from 'react'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'


const styles = {
  loader : {
    position : 'fixed',
    background : 'white',
    opacity:0.6,
    left : '0',
    top : '0',
    bottom : '0',
    right:0,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    zIndex:1400,
    flexDirection:'column'
  }
}

const Alert = React.forwardRef(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})



function UiHelpers() {

  const { hideAlert, alert, alertText, popup,loader, setPopup, popupComp,
    loadingText, snackbar, hideSnackbar, snackbarText, snackbarType } = useContext(CommonContext)

  const handlePopupClose = () => {
    setPopup(false)
  }

  return(<>
    <Dialog open={alert} onClose={hideAlert}>
      {
        popup ? 
        <Box sx={{padding:'5px'}}>
          <Box sx={{textAlign:'right', cursor:'pointer'}}>
            <CloseIcon onClick={hideAlert} />
          </Box>
          <Box>
            {alertText}
          </Box>
        </Box>
        :
        <>
          <DialogTitle>
            Alert
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {alertText}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={hideAlert}>
              Close
            </Button>
          </DialogActions>
        </> 
      }
    </Dialog>
    
    {
      loader ? 
      <div style={styles.loader}> 
      <Box sx={{ display: 'flex', marginBottom:2 }}>
        <CircularProgress />
      </Box>
        { loadingText }
      </div> 
      : null
    }

    <Snackbar open={snackbar} autoHideDuration={3000} onClose={hideSnackbar}>
      <Alert onClose={hideSnackbar} severity={snackbarType} sx={{ width: '100%' }}>
        {snackbarText}
      </Alert>
    </Snackbar>  

    <Dialog open={popup} onClose={() => handlePopupClose()}>
      <Box sx={{padding:'10px'}}>
        <Box onClick={() => handlePopupClose()} sx={{textAlign:'right', cursor:'pointer'}}>
          <CloseIcon />
        </Box>
        <Box>
          {popupComp}
        </Box>
      </Box>
    </Dialog>

    <Box>
      <Outlet />
    </Box>
   
  </>)
}

export default UiHelpers