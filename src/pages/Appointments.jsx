import React, {useContext, useEffect, useState} from 'react'
import { Button, Box, Paper, TextField, Grid} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { END_POINT } from '../Constants'
import Loader from '../components/Loader'
import useNetwork from '../hooks/useNetwork'

function Appointments() {

  const navigate     = useNavigate()
  const { fetchApi } = useNetwork()

  const [loading, setLoading]           = useState(true)
  const [appointments, setAppointments] = useState([])

  useEffect(() => {

    getAppointments()
  }, [])

  const getAppointments = async() => {

    const resp = await fetchApi(END_POINT.GET_APPOINTMENTS , {})
    setLoading(false)
    setAppointments(resp.appointments)
  }

  return (
    <>
    {
      loading ? 
      <Loader /> :
      <Box>
        <h2>Appointments</h2>
        { 
          appointments?.length ? 
          appointments.map((appointment, index) => {
            return <Paper key={index} sx={{mb:2}}>
              
              <Box sx={{mb:1, mt:1,}}>
                <b>User Name : </b> {appointment.userName}
              </Box>

              <Box sx={{mb:1, mt:1,}}>
                <b>User Mobile : </b> {appointment.mobileNo}
              </Box>

              <Box sx={{mb:1, mt:1,}}>
                <b>Appointment Date : </b>
                {
                  appointment.appointmentTime ? 
                  <>
                  {new Date(appointment?.appointmentTime).toDateString()}, &nbsp;
                  </> : 'N/A'
                }
              </Box>

              <Box sx={{mb:1, mt:1,}}>
                <b>Appointment Time : </b>
                {
                  appointment.appointmentTime ? 
                  <>
                  {new Date(appointment.appointmentTime).toLocaleTimeString()}
                  </> : 'N/A'
                }
              </Box>

              <Box sx={{mb:1, mt:1,}}>
                <b>Booked On : </b>{new Date(appointment.timeStamp).toDateString() || 'N/A'}
              </Box>

            </Paper>
          }) : 
          <Box>
            No Appointments Found
          </Box>
        }
      </Box>
    }
    </>
  )
}

export default Appointments
