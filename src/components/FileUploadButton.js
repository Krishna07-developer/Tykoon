import { TextField, Button, Box, Card, Paper, Grid, Input } from '@mui/material'
import { styled } from '@mui/material/styles'
import useNetwork from '../hooks/useNetwork'
import { useContext } from 'react'
import { CommonContext } from '../contexts/CommonContext'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

function FileUploadButton(props) {

  const { uploadFile }             = useNetwork()
  const { showLoader, hideLoader } = useContext(CommonContext)

  const initFileUpload = async(e) => {

    showLoader()
    const resp = await uploadFile(e)
    hideLoader()

    props.onFileChange(resp)
  }

  return <>
    <Box mb={3} mt={2}>
      <Button variant="contained" component="label">
        {props.btnText}
        <VisuallyHiddenInput type="file" onChange={initFileUpload}/>
      </Button>
    </Box>
  </>
}

export default FileUploadButton