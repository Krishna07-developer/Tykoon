import { createMeeting, generateRefreshToken } from '../services/api'
import React,  {useContext, useEffect, useState} from 'react'
import { CommonContext } from '../contexts/CommonContext'
import { useForm, Controller } from "react-hook-form"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation'
import InputAdornment from '@mui/material/InputAdornment'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { TextField, Button, Box, Paper , FormControl, InputLabel, MenuItem, Select, Modal } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { END_POINT } from '../Constants'
import useNetwork from '../hooks/useNetwork'


function AddTask() {

  const navigate     = useNavigate()
  const { fetchApi } = useNetwork()

  const [dateTime, setDateTime] = useState(null)
  const [type, setType]         = useState('Online')
  const [duration, setDuration] = useState('30')

  const { register, handleSubmit, control, reset, formState : {errors} } = useForm()
  const { showLoader, hideLoader, showAlert, showSnackbar } = useContext(CommonContext)

  useEffect(() => {

  }, [])

  async function onFormSubmit(data) {

    if (!dateTime) {
      showSnackbar('Please select date and time', 'error')
      return
    } else {
      data.taskDate = dateTime.$d.getTime()
    }

    const params = {
      ...data,
      duration  : duration,
      type      : type
    }
    
    showLoader()
    const resp = await fetchApi(END_POINT.ADD_TASK, params)
    hideLoader()

    if (!resp) return
    setDateTime(null)
    showSnackbar("Task added successfully.")
    reset()
    navigate(-1)
  }

  return (
    <>
      <Box>
        <h2>Add New Task</h2>
        
        <form onSubmit={handleSubmit(onFormSubmit)}>

          <Box mb={3}>
            <TextField
              placeholder="Enter title"
              label="Title"
              variant="outlined"
              fullWidth
              name="title"
              {...register("title", {
                required: "Required field"
              })}
              error={Boolean(errors?.title)}
              helperText={errors?.title?.message}
            />
          </Box>

          <Box mb={3}>
            <TextField
              placeholder="Enter description"
              label="Description"
              variant="outlined"
              fullWidth
              name="description"
              multiline
              rows={4}
              {...register("description")}
              error={Boolean(errors?.description)}
              helperText={errors?.description?.message}
            />
          </Box>

          <Box mb={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker sx={{width:'100%'}}
                renderInput={(props) => <TextField {...props} />}
                label="Select Date and Time"
                inputFormat="DD/MM/YYYY hh:mm A"
                value={dateTime}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <InsertInvitationIcon />
                    </InputAdornment>
                  )
                }}
                
                onChange={(newValue) => {
                  setDateTime(newValue)
                }}
              />
            </LocalizationProvider>
          </Box>

          <Box mb={3}>
            <FormControl 
              sx={{margin:'10px 0', width:'50vw', maxWidth:'300px'}}>  
              <InputLabel id="demo-select-small">Duration</InputLabel>
                <Select
                  fullWidth
                  value={duration}
                  labelId="duration"
                  placeholder="Duration"
                  required
                  onChange={(e) => setDuration(e.target.value)}
                  label="Duration">
                  <MenuItem value={'15'}>15 Mins</MenuItem>
                  <MenuItem value={'30'}>30 Mins</MenuItem>
                  <MenuItem value={'45'}>45 Mins</MenuItem>
                  <MenuItem value={'60'}>1 Hour</MenuItem>
                  <MenuItem value={'120'}>2 Hours</MenuItem>
                </Select>
              </FormControl>
          </Box>

          <Box mb={3}>
            <ToggleButtonGroup
              color="primary"
              value={type}
              exclusive
              onChange={(event, newType) => setType(newType)}
              aria-label="Platform"
            >
              <ToggleButton value="Online">Online</ToggleButton>
              <ToggleButton value="Offline">Offline</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          {
            type === 'Online' ? 
            <Box>
            </Box> :
            <Box>
              <TextField
                placeholder="Enter location"
                label="Location"
                variant="outlined"
                fullWidth
                name="location"
                {...register("location")}
                error={Boolean(errors?.location)}
                helperText={errors?.location?.message}
              />
            </Box>
          }
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{marginBottom:'25px', marginTop:'25px'}}>
          Save 
        </Button>
      </form>
     </Box>
    </>
  )
}

export default AddTask
