import { Stack } from "@mui/material"
import { useForm } from "react-hook-form"
import { TextField, Button, Box } from '@mui/material'
import ShareIcon from '../assets/share.png'
import CopyIcon from '../assets/copy.png'
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { CommonContext } from "../contexts/CommonContext"


function ShareLink() {

  const { userData }     = useContext(AuthContext)
  const { showSnackbar } = useContext(CommonContext)
  const { register : registerOtp, handleSubmit : submitOtp, reset : resetOtp, formState : {errors:errorsOtp} } = useForm()

  const getMessageText = () => {
    return `Hi, Please find my Tykoon business profile here : ${process.env.REACT_APP_URL}/${userData.tykoonUrl}`
  }

  const getCardUrl = () => {
    return `${process.env.REACT_APP_URL}/${userData.tykoonUrl}`
  }

  const shareToWhatsapp = (data) => {
    window.open(`https://wa.me/${data.mobileNo}?text=${getMessageText()}`, '_blank')
  }


  function copyCardlink() {
    navigator.clipboard.writeText(getMessageText()).then(function() {
      showSnackbar("Card url copied to clipboard")
    }, function(err) {
      showSnackbar("Card url copied to clipboard")
    })
  }

  function shareCardLink() {
    if(navigator?.share) {
      navigator.share({
        title: 'Tykoon',
        text: 'Hi, Please find my Tykoon business profile here ',
        url: getCardUrl(),
      })
      .then(() => console.log('Successful share'))
      .catch((error) => copyCardlink())
    } else {
      copyCardlink()
    }
  }

  return(<>
    <Stack width="80vw" maxWidth="400px">
      <form onSubmit={submitOtp(shareToWhatsapp)}>
        <h2>Share your business profile</h2>
        <Box mb={3}>
          <TextField
            placeholder="Enter whatsapp number"
            label="Whatsapp Number"
            variant="outlined"
            fullWidth
            type="number"
            autoComplete='off'
            name="mobileNo"
            {...registerOtp("mobileNo", {
              required: "Required field"})}
            error={Boolean(errorsOtp?.mobileNo)}
            helperText={errorsOtp?.mobileNo?.message}
          />
        </Box>
        <Button type="submit" variant="contained" fullWidth>
          Send to Whatsapp
        </Button>
      </form>

      <Stack direction="row" justifyContent="space-around" mt={3}>
        <Stack alignItems="center" sx={{border:'1px solid #eaeaea', p:2, borderRadius:'10px', background:'#f2fcff'}}
          onClick={copyCardlink}>
          <img src={CopyIcon} style={{width:'30px', marginBottom:'10px'}} />
          Copy link
        </Stack>
        <Stack alignItems="center" sx={{border:'1px solid #eaeaea', p:2, borderRadius:'10px', background:'#f2fcff'}}
          onClick={shareCardLink}>
          <img src={ShareIcon} style={{width:'30px', marginBottom:'10px'}} />
          Share to device
        </Stack>
      </Stack>
    </Stack>
  </>)
}

export default ShareLink