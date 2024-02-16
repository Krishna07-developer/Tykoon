import React, {useContext, useEffect, useState} from 'react'
import { Button, Box, Paper, TextField, Grid} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { END_POINT } from '../Constants'
import Loader from '../components/Loader'
import useNetwork from '../hooks/useNetwork'

function Enquiries() {

  const navigate     = useNavigate()
  const { fetchApi } = useNetwork()

  const [loading, setLoading]           = useState(true)
  const [enquiries, setEnquiries]       = useState([])

  useEffect(() => {

    getEnquiries()
  }, [])

  const getEnquiries = async() => {

    const resp = await fetchApi(END_POINT.GET_ENQUIRIES , {})
    setLoading(false)
    setEnquiries(resp.enquiries)
  }

  return (
    <>
    {
      loading ? 
      <Loader /> :
      <Box>
        <h2>Enquiries</h2>
        { 
          enquiries?.length ? 
          enquiries.map((enquiry, index) => {
            return <Paper key={index} sx={{mb:2}}>
              
              <Box sx={{mb:1, mt:1,}}>
                <b>User Name : </b> {enquiry.userName}
              </Box>

              <Box sx={{mb:1, mt:1,}}>
                <b>User Mobile : </b> {enquiry.mobileNo}
              </Box>

              <Box sx={{mb:1, mt:1,}}>
                <b>Query : </b> {enquiry.description}
              </Box>

              <Box sx={{mb:1, mt:1,}}>
                <b>Enquiry date : </b>{new Date(enquiry.timeStamp).toDateString() || 'N/A'}
              </Box>

            </Paper>
          }) : 
          <Box>
            No Enquiries Found
          </Box>
        }
      </Box>
    }
    </>
  )
}

export default Enquiries
