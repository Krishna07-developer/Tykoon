import React, { useContext } from 'react'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import stockpolice from '../assets/tykoon-full-logo.png'
import { CommonContext } from '../contexts/CommonContext';
import Activities from './Activities';

const styles = {
  sidebarCont : {
    position : 'absolute',
    left:0,
    top:0,
    width:'15vw',
    height:'100vh',
    boxShadow:'3px 0px 10px 0px #d9d9d9'
  },
  logoImg : {
    width:'10vw',
    height:'70px',
    marginLeft:'1vw'
  }
}

function Sidebar() {

  const navigate = useNavigate()
  const { showPopup } = useContext(CommonContext)

  const boxSX = {
    padding:'10px',
    cursor:'pointer',
    margin:'10px',
    borderBottom : '1px solid #cbcbff',
    "&:hover": {
      backgroundColor: '#cbcbff'
    },
  };

  return (
    <Box style={styles.sidebarCont}>
      <img src={stockpolice} style={styles.logoImg} />
      <Box sx={boxSX} onClick={() => navigate("/home")}>
          Home
       </Box>
       <Box sx={boxSX} onClick={() => navigate("/network")}>
          Network
       </Box>
       <Box sx={boxSX} onClick={() => showPopup(<Activities />)}>
          New
       </Box>
       <Box sx={boxSX} onClick={() => navigate("/apps")}>
          Apps
       </Box>
       <Box sx={boxSX} onClick={() => navigate("/profile")}>
          Profile
       </Box>
    </Box>
  )
}

export default Sidebar
