import React, {useContext, useEffect, useState} from 'react'
import { Button, Box, Paper , Grid} from '@mui/material'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { getUserData } from '../services/api'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import ImageLoader from '../components/ImageLoader'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Loader from '../components/Loader'
import useNetwork from '../hooks/useNetwork'
import { END_POINT } from '../Constants'

const styles = {
  userCard : {
    display:'flex',
    flexDirection:'column'
  },
  profilePic : {
    width:'30vw',
    height:'30vw',
    border: '1px solid #b8b8b8',
    marginTop:'15px',
    borderRadius:'50%',
    maxWidth:'200px',
    maxHeight:'200px'
  },
  defIcon: {
    fontSize:'25vw'
  },
  profilePicCont : {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  menuItem: {
    padding:'10px', 
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    cursor:'pointer'
  },
  center : {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    marginTop:'0px'
  }
}

function Profile() {  
  
  const navigate     = useNavigate()
  const { logout }   = useContext(AuthContext)
  const { fetchApi } = useNetwork()
  
  const [userData, setUserData] = useState({})
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async() => {

    const resp = await fetchApi(END_POINT.GET_USER_DATA, {})
    setLoading(false)
    setUserData(resp)
  }

  return (
    <>
    {
      loading ? <Loader /> :
      <>
      <Box width="100%">
        <h2 style={styles.center}>My Profile</h2>
        <Paper style={styles.userCard}>
          <div style={styles.profilePicCont}> 
            {
              userData?.profilePicUrl ?
              <ImageLoader props={{imgUrl:userData.profilePicUrl, styles:styles.profilePic}}/>
               :
              <AccountCircleIcon style={styles.defIcon}/>
            }
          </div>

          <Box sx={{p:2}}>
            <Box sx={{mb:1, mt:1,}}>
              <b>Name : </b> {userData.fullName}
            </Box>
            <Box sx={{mb:1, mt:1,}}>
              <b>Email : </b> {userData.email}
            </Box>
            <Box sx={{mb:1, mt:1,}}>
              <b>Mobile : </b> {userData.mobileNo}
            </Box>
            <Box sx={{display:'flex'}}>
              <Button variant="outlined" size="medium" onClick={() => logout()}>
                Logout
              </Button>
            </Box>
          </Box>
        
        </Paper>
      </Box>
      <Box>
        <h2>Update Card Details</h2>
          <Grid  columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} mb={2}>
              <Paper style={styles.menuItem} onClick={() => navigate('/updatePersonalDetails', { state : userData})}>
                <span>
                  Personal Details
                </span>
                <NavigateNextIcon />
              </Paper>
            </Grid>
            <Grid item xs={12} mb={2}>
              <Paper style={styles.menuItem} onClick={() => navigate('/UpdateCompanyDetails', { state : userData})}>
                <span>Company Details</span> 
                <NavigateNextIcon />
              </Paper>
            </Grid>
            <Grid item xs={12} mb={2}>
              <Paper style={styles.menuItem} onClick={() => navigate('/UpdateProducts', { state : userData})}>
                <span>Products & Services</span> 
                <NavigateNextIcon />
              </Paper>
            </Grid>
            <Grid item xs={12} mb={2}>
              <Paper style={styles.menuItem} onClick={() => navigate('/updateSocialMedia', { state : userData})}>
                <span>Social Media Links</span> 
                <NavigateNextIcon />
              </Paper>
            </Grid>
            <Grid item xs={12} mb={2}>
              <Paper style={styles.menuItem} onClick={() => navigate('/UpdateGallery', { state : userData})}>
                <span>Gallery</span>
                <NavigateNextIcon />
              </Paper>
            </Grid>
            <Grid item xs={12} mb={2}>
              <Paper style={styles.menuItem} onClick={() => navigate('/UpdatePayments', { state : userData})}>
                <span>Payment Details</span>
                <NavigateNextIcon />
              </Paper>
            </Grid>
           
          </Grid>
        </Box>
      </>
      
    }
    </>
  )
}

export default Profile
