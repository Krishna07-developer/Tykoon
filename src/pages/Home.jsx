import { useContext, useEffect, useState } from "react"
import { END_POINT } from "../Constants"
import useNetwork from "../hooks/useNetwork"
import { CommonContext } from "../contexts/CommonContext"
import Loader from "../components/Loader"
import { AuthContext } from "../contexts/AuthContext"
import TykoonFullLogo from '../assets/tykoon-full-logo.png'
import { useNavigate } from "react-router-dom"
import InvoiceIcon from '../assets/invoice.png'
import { Button, Box, Card, Paper, Stack, Divider } from '@mui/material'
import ViewsIcon from '../assets/views.png'
import RatingIcon from '../assets/rating.png'
import ApptIcon from '../assets/appointment.png'
import EnquiryIcon from '../assets/enquiry.png'
import SendIcon from '@mui/icons-material/Send'
import ShareLink from '../components/ShareLink'
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { Capacitor } from "@capacitor/core"
import AppBlocker from "../components/AppBlocker"

const styles = {
  contentCard : {
    height:80,
    minWidth:'100px',
    display: 'flex',
    width:'35%',
    flexDirection:'column',
    justifyContent:'center',
    padding:'10px 20px 0 20px',
    borderRadius:'5px',
    boxShadow: '5px 5px 15px 5px #eaeaea'
  },
  contentCardDesk : {
    height:80,
    minWidth:'100px',
    display: 'flex',
    flexDirection:'column',
    justifyContent:'center',
    padding:'10px 20px 0 20px',
    borderRadius:'5px',
    boxShadow: '5px 5px 15px 5px #eaeaea'
  },
  actIcon : {
    width:'30px'
  }
}

function Home() { 

    const { fetchApi }              = useNetwork()
    const navigate                  = useNavigate()
    const { showPopup, isDesktop,
            setBlocker }            = useContext(CommonContext)
    const { userData, setUserData } = useContext(AuthContext)

    const [loading, setLoading] = useState(true)


    useEffect(() => {
      getLanding()
    }, [])

    const getLanding = async() => {
      
      const resp = await fetchApi(END_POINT.GET_LANDING, {})
      setLoading(false)
      if (!resp) return
   
      // if (resp.action == 'UPDATE') {
      //   setBlocker(true)
      //   showPopup(<AppBlocker />)

      //   const updateData = await CapacitorUpdater.download({
      //     version : resp.currVersion,
      //     url     : resp.newBuildUrl
      //   })
      //   await CapacitorUpdater.set(updateData)
      //   setBlocker(false)
      // }

      setUserData(resp)
    }

    const shareCardLink = async() => {
      showPopup(<ShareLink /> )
    }

    return (<>
    {
      loading ? <Loader /> : 
      <Stack> 
        <img src={TykoonFullLogo} style={{width:'200px'}} />  

        <Stack spacing={{ sm: 1, xs:1, lg:4,  }} mt={5}  direction="row" 
          justifyContent="space-around" useFlexGap flexWrap="wrap">
          
          <Paper style={isDesktop ? styles.contentCardDesk : styles.contentCard}>
            <Stack direction="row">
              <span style={styles.cardIcon}>
                <img src={ViewsIcon} style={styles.actIcon}/>
              </span>
              <Box sx={{fontSize:'35px', ml:2, color:'orange'}}>{userData.cardViews || 0}</Box>
            </Stack>
            
            <Button>
              Card Views
            </Button>
          </Paper>

          <Paper style={isDesktop ? styles.contentCardDesk : styles.contentCard}>
            <Stack direction="row">
              <span style={styles.cardIcon}>
                <img src={RatingIcon} style={styles.actIcon}/>
              </span>
              <Box sx={{fontSize:'35px', ml:2}}>{userData.rating || 1}</Box>  
            </Stack>
            <Button>
              Rating
            </Button>
          </Paper>

          <Paper style={isDesktop ? styles.contentCardDesk : styles.contentCard} 
            onClick={() => navigate('/appointments')}>
            <Stack direction="row">
              <span style={styles.cardIcon}>
                <img src={ApptIcon} style={styles.actIcon}/>
              </span>
              <Box sx={{fontSize:'35px', ml:2}}>{userData.appointmentCount || 0}</Box>  
            </Stack>
            <Button>
              Appointments
            </Button>
          </Paper>

          <Paper style={isDesktop ? styles.contentCardDesk : styles.contentCard} 
            onClick={() => navigate('/enquiries')}>
              <Stack direction="row">
                <span style={styles.cardIcon}>
                  <img src={EnquiryIcon} style={styles.actIcon}/>
                </span>
              <Box sx={{fontSize:'35px', ml:2}}>{userData.enquiryCount || 0}</Box>  
            </Stack>
            <Button>
              Enquiries
            </Button>
          </Paper>
        </Stack>

        <Box>
          <Button sx={{marginTop:'20px', mr:2}} variant='outlined'
            onClick={() => navigate(`/viewCard/${userData.tykoonUrl}`)}>
            View My Card
          </Button>
          <Button sx={{marginTop:'20px'}} variant='contained'  onClick={shareCardLink}
            endIcon={<SendIcon />}>
            Share Card
          </Button>
        </Box>

        <Stack mt={2}>
          <h2>Your Tasks Today</h2>
          {
            userData.tasks.length ? <>
              {
                userData.tasks.map((task, index) => {
                  return <Paper key={index} sx={{mb:2}}>
                    
                    <Stack sx={{mb:1, mt:1,}} direction="row" justifyContent="space-between">
                      <b>{task.title}</b> 
                    </Stack>
      
                    <Box sx={{mb:1, mt:1,}}>
                      {task.description}
                    </Box>

                    <Box sx={{mb:1, mt:1,}}>
                      {new Date(task.taskDate).toLocaleTimeString().split(' ')[0].slice(0, -3)} &nbsp;
                      {new Date(task.taskDate).toLocaleTimeString().split(' ')[1]}
                    </Box>

                    <Stack sx={{mb:1, mt:1,}} direction="row"   spacing={2}
                      divider={<Divider orientation="vertical" flexItem />}>
                      <Box>
                        {task.duration} Mins 
                      </Box>
                      <Box>
                        {task.type == 'Online' ? task.type  : task.location}
                      </Box>
                    </Stack>
                  </Paper>
                })
              }
            </> : 
            <>
              No Tasks For Today 😊
            </>
          }
        </Stack>

      </Stack>
    }
    </>)
}

export default Home