import { useContext, useEffect, useState } from "react"
import { END_POINT } from "../Constants"
import useNetwork from "../hooks/useNetwork"
import { Button, Box, Paper, TextField, Grid, Fab, Badge} from '@mui/material'
import Modal from '@mui/material/Modal'
import { useForm } from "react-hook-form"
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation'
import InputAdornment from '@mui/material/InputAdornment'
import CartPopup from "../pages/CartPopup"
import { CommonContext } from "../contexts/CommonContext"

const styles = {
  modalStyle : {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  },
  appointmentBox : {
    background : 'white',
    padding:'20px',
    borderRadius:'5px'
  }
}

const CardBase = (Theme) => {

  const CardTheme = (props) => {
    
    const { showLoader, hideLoader, isDesktop, showSnackbar, showPopup } = useContext(CommonContext)
    const card                                    = props.card
    const { fetchApi }                            = useNetwork()
    const [loading, setLoading]                   = useState(true)
    const [appointmentModal, setAppointmentModal] = useState(false)
    const [enquiryModal, setEnquiryModal]         = useState(false)
    const [dateTime, setDateTime]                 = useState(null)
    const [cartData, setCartData]                 = useState({})
  
    const { register, handleSubmit, control, reset, formState : {errors} } = useForm()
    const { register : register2, handleSubmit : handleSubmit2, reset : reset2, formState : {errors2} } = useForm()
    
    
    function openUrl(url) {
      if (url.slice(0,4) != 'http')
        url = 'https://'+url
      window.open(url, '_blank')
    }
  
    function callMe(number) {
      window.open(`tel:${number}`, '_self')
    }
  
    function whatsappMe(number) {
      window.open(`https://wa.me/91${number}`, '_blank')
    }
  
    function mailMe(mailId) {
      window.open(`mailto:${mailId}`)
    }
  
    const initApptBooking = () => {
      reset()
      setAppointmentModal(true)
    }
  
    const initEnquiryBooking = () => {
      reset()
      setEnquiryModal(true)
    }
  
    const bookAppointment = async(data) => {
  
      if (dateTime && dateTime.$d) data.appointmentTime = dateTime.$d.getTime()
      data.appointmentTo = card.mobileNo
  
      showLoader()
      const resp = await fetchApi(END_POINT.NEW_APPOINTMENT, data)
      hideLoader()
  
      setAppointmentModal(false)
      if (!resp) return
      showSnackbar("Appointment booked successfully.")
    }
  
    const sendEnquiry = async(data) => {
  
      data.enquiryTo = card.mobileNo
  
      showLoader()
      const resp = await fetchApi(END_POINT.NEW_ENQUIRY, data)
      hideLoader()
  
      setEnquiryModal(false)
      if (!resp) return
      showSnackbar("Enquiry sent successfully.")
    }
  
    const showCartModal = () => {
      showPopup(<CartPopup cartData={cartData} whatsappNo={card.whatsappNo} />)
    }
  
    const updateCart = (itemData, isIncrease) => {
  
      let newCartData = cartData || {}
  
          // Item present in cart
          if (newCartData[itemData.id]) {
            
            newCartData[itemData.id].count = newCartData[itemData.id].count + (isIncrease ? 1 : -1)
            if (newCartData[itemData.id].count <= 0) delete newCartData[itemData.id]
          } 
      
          else {
      
            itemData.count =  1
            newCartData[itemData.id] = itemData    
          }
  
      if (isIncrease) {
  
        newCartData.totalCount    = (newCartData.totalCount    || 0)  + (itemData.enableBogo ? 2 : 1)
        newCartData.totalAmount   = (newCartData.totalAmount   || 0)  + Number(itemData.price)
      } else {
  
        newCartData.totalCount    = newCartData.totalCount    - (itemData.enableBogo ? 2 : 1)
        newCartData.totalAmount   = newCartData.totalAmount   - Number(itemData.price)
      }
  
      newCartData.totalCount    = Math.max(0, newCartData.totalCount)
      newCartData.totalAmount   = Math.max(0, newCartData.totalAmount)
      setCartData({...newCartData})
    }

    return(<>
      <Modal
        open={appointmentModal}
        onClose={() => setAppointmentModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={styles.modalStyle}>
          <Box style={styles.appointmentBox}>
            Book  Appointment for {card.fullName}
            <form onSubmit={handleSubmit(bookAppointment)} key={1}>

              <Box mb={3} mt={3}>
                <TextField
                  placeholder="Enter your full name"
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  autoFocus
                  autoComplete='off'
                  name="userName"
                  {...register("userName", {
                    required: "Required field"
                  })}
                  error={Boolean(errors?.userName)}
                  helperText={errors?.userName?.message}
                />
              </Box>

              <Box mb={3}>
                <TextField
                  placeholder="Enter your mobile number"
                  label="Mobile Number"
                  variant="outlined"
                  fullWidth
                  autoComplete='off'
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

              <Box mb={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker  sx={{width:'100%'}} 
                  renderInput={(props) => <TextField {...props} />}
                  label="Select Date and Time"
                  value={dateTime}
                  inputFormat="DD/MM/YYYY hh:mm A"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end">
                        <InsertInvitationIcon />
                      </InputAdornment>
                    ),
                  }}
                  minDateTime={dayjs(Date.now())}
                  onChange={(newValue) => {
                    setDateTime(newValue)
                  }}
                />
                </LocalizationProvider>
              </Box>

              <Box sx={{display:'flex'}}>
                <Button variant="outlined" sx={{marginRight:2}}
                  onClick={() => setAppointmentModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Send 
                </Button>
              </Box>

            </form>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={enquiryModal}
        onClose={() => setEnquiryModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={styles.modalStyle}>
          <Box style={styles.appointmentBox}>
            Send Enquiry to {card.fullName}
            <form onSubmit={handleSubmit2(sendEnquiry)} key={2}>

              <Box mb={3} mt={3}>
                <TextField
                  placeholder="Enter your full name"
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  autoFocus
                  autoComplete='off'
                  name="userName"
                  {...register2("userName", {
                    required: "Required field"
                  })}
                  error={Boolean(errors2?.userName)}
                  helperText={errors2?.userName?.message}
                />
              </Box>

              <Box mb={3}>
                <TextField
                  placeholder="Enter your mobile number"
                  label="Mobile Number"
                  variant="outlined"
                  fullWidth
                  autoComplete='off'
                  name="mobileNo"
                  {...register2("mobileNo", {
                    required: "Required field",
                    pattern: {
                      value: /^[7896]\d{9}$/,
                      message: "Invalid mobile number",
                    },
                  })}
                  error={Boolean(errors2?.mobileNo)}
                  helperText={errors2?.mobileNo?.message}
                />
              </Box>

              <Box mb={3}>
                <TextField
                  placeholder="Describe your query here"
                  label="Your Query"
                  variant="outlined"
                  fullWidth
                  autoComplete='off'
                  name="description"
                  multiline
                  rows={2}
                  {...register2("description",{
                    required: "Required field"
                  })}
                  error={Boolean(errors2?.description)}
                  helperText={errors2?.description?.message}
                />
              </Box>

              <Box sx={{display:'flex'}}>
                <Button variant="outlined" sx={{marginRight:2}}
                  onClick={() => setEnquiryModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Send 
                </Button>
              </Box>

            </form>
          </Box>
        </Box>
      </Modal>

      <Theme card={props.card}
        callMe={callMe}
        whatsappMe={whatsappMe}
        mailMe={mailMe}
        initApptBooking={initApptBooking}
        initEnquiryBooking={initEnquiryBooking}
        openUrl={openUrl}
        cartData={cartData}
        updateCart={updateCart}
        showCartModal={showCartModal} />
    </>)
  }

  return CardTheme
}

export default CardBase