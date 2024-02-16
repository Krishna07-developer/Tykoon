import { Box, Button, Stack } from '@mui/material'
import LandingBg from '../assets/landing-bg.png'
import TykoonFullLogo from '../assets/tykoon-full-logo.png'
import { useContext } from 'react'
import { CommonContext } from '../contexts/CommonContext'
import { useNavigate } from 'react-router-dom'

const styles = {
  header : {
    padding:'25px',
    position:'absolute',
    top:'0',
    width:'-webkit-fill-available',
    height:'10vh'
  },
  mainLogo : {
    width:'200px'
  },
  mainCont : {
    paddingTop:'0vh'
  },
  menuItem : {
    padding:'20px',
    cursor:'pointer',
    "&:hover": {
      border:'1px solid red'
    }
  }
}
function Landing() {

  const navigate = useNavigate()
  const { isDesktop } = useContext(CommonContext)

  return <>
    <Stack style={styles.mainCont}>

        <Stack style={styles.header} direction={isDesktop ? 'row' : 'column'}  justifyContent="space-between" alignItems="center">
          <img src={TykoonFullLogo} style={styles.mainLogo} />
          {/* <Stack direction="row">
            <Box style={styles.menuItem}>
              {'Whats Tykoon'}
            </Box>
            <Box style={styles.menuItem}>
              Features
            </Box>
            <Box style={styles.menuItem}>
              Contact Us
            </Box>
          </Stack> */}
        </Stack>

        <Stack sx={{height:'100vh', paddingTop:'20vh', backgroundImage: `url(${LandingBg})`}}>
          <Stack sx={{ml: isDesktop ? 10 : 5, mt:10, p: isDesktop ? 4 : 1, width: isDesktop ? '50%' : '80%', background:'white'}}>
            <Box sx={{color:'#058cdb', fontSize:'50px', fontWeight:'bold'}}>
              One card for all your business needs
            </Box>
            <Box sx={{color:'orange', fontSize:'25px', fontWeight:'600', mb:7, mt:5}}>
              GET YOUR DIGITAL VISITING CARD           
            </Box>
            <Box>
              <Button variant='outlined' size='large' sx={{marginRight:'20px'}}
                onClick={() => navigate('/auth')}>
                Login
              </Button>
              <Button variant='contained' size='large'
                onClick={() => navigate('/auth')}>
                Signup
              </Button>
            </Box>
          </Stack>
        </Stack>

    </Stack>
  
    
  </>
}

export default Landing