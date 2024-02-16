import React, { useState, useContext } from 'react'
import { Button, Box, Card, Paper, Grid, makeStyles } from '@mui/material'
import meetingImg from '../assets/meeting.png'
import invoiceImg from '../assets/invoice.png'
import quotationImg from '../assets/quotation.png'
import { useNavigate } from 'react-router-dom'
import { CommonContext } from '../contexts/CommonContext'
import PosterImg from '../assets/poster.png'

const styles = {
  actCont : {
    width:'70vw',
    maxWidth:'400px',
    display:'flex',
    flexDirection:'column',
    padding:'0 4vw'
  },
  actItem : {
    width:'40%',
    display:'flex',
    justifyContent:'center',
    flexDirection:'column',
    alignItems:'center',
    fontSize:'15px',
    cursor:'pointer'
  },
  actBox : {
    display:'flex',
    justifyContent:'space-evenly',
    marginBottom:'20px',
    marginTop:'10px'
  },
  logoImg : {
    width:'60px',
    marginBottom:'10px'
  }
}

function Activities() {

  const navigate = useNavigate()
  const { hidePopup } = useContext(CommonContext)

  const handleClick = (index) => {
    switch(index) {
      case 1:
        hidePopup()
        navigate("/createInvoice")
        break
      case 2:
        hidePopup()
        navigate("/createQuotation")
        break
      case 3:
        hidePopup()
        navigate("/addTask")
        break
      case 4:
        hidePopup()
        navigate("/posterMaker")
        break
      default:
        break
    }
  }

  return (
    <>
      <Box style={styles.actCont}>
        <Box style={styles.actBox}>
          <Box style={styles.actItem} onClick={() => handleClick(1)}>
            <img src={invoiceImg} style={styles.logoImg}/>
            Invoice
          </Box>
          <Box style={styles.actItem}  onClick={() => handleClick(2)}>
            <img src={quotationImg} style={styles.logoImg}/>
            Quotation
          </Box>
        </Box>
        <Box style={styles.actBox}>
          <Box style={styles.actItem} onClick={() => handleClick(3)}>
            <img src={meetingImg} style={styles.logoImg}/>
            Task
          </Box>
          <Box style={styles.actItem}  onClick={() => handleClick(4)}>
            <img src={PosterImg} style={styles.logoImg}/>
            Poster
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Activities
