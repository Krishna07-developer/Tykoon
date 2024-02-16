import React, { useContext, useState } from 'react'
import { Badge, BottomNavigation, BottomNavigationAction } from '@mui/material'
import Paper from '@mui/material/Paper'
import { useNavigate } from 'react-router-dom'
import GroupsIcon from '@mui/icons-material/Groups'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import PersonIcon from '@mui/icons-material/Person'
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic'
import Activities from './Activities'
import { CommonContext } from '../contexts/CommonContext'

import HomeIcon from '../assets/nav-home.png'
import HomeActIcon from '../assets/nav-home-act.png'
import NetworkIcon from '../assets/nav-network.png'
import NetworkActIcon from '../assets/nav-network-act.png'
import NewIcon from '../assets/nav-new.png'
import AppsIcon from '../assets/nav-apps.png'
import AppsActIcon from '../assets/nav-apps-act.png'
import ProfileIcon from '../assets/nav-profile.png'
import ProfileActIcon from '../assets/nav-profile-act.png'

function BottomNavBar() {

  const navigate      = useNavigate()
  const { showPopup } = useContext(CommonContext)

	const [activeIndex, setActiveIndex] = useState(0)

  return (<>
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height:'7vh', zIndex:'444', background:'white', maxWidth:'500px',
                  margin:'10px', padding:'5px 0', borderRadius:'20px'}} elevation={3}>
      <BottomNavigation
        sx={{background:'none'}}
        onChange={(event, newIndex) => {
          setActiveIndex(newIndex)
          switch (newIndex) {
            case 0:
              navigate('/home')
              break
            case 1:
              navigate('/network')
              break
            case 2:
              showPopup(<Activities />)
              break
            case 3:
              navigate('/apps')
              break
            case 4:
              navigate('/profile')
              break
            default:
              break
          }
        }}
        showLabels>

        <BottomNavigationAction label="Home" sx={{color:window.location.pathname == '/home' ? '#058cdb' : '#bfbfbf', minWidth:'auto'}}
          icon={<img className='nav-ic' src={window.location.pathname == '/home' ? HomeActIcon : HomeIcon} />}/>

        <BottomNavigationAction label="Network" sx={{color:window.location.pathname == '/network' ? '#058cdb' : '#bfbfbf', minWidth:'auto'}}
        icon={<img className='nav-ic' src={window.location.pathname == '/network' ? NetworkActIcon : NetworkIcon} />}/> 

        <BottomNavigationAction label="New" sx={{ color:'#bfbfbf', minWidth:'auto'}}
        icon={<img className='nav-ic' src={NewIcon} />}/> 

        <BottomNavigationAction label="Apps" sx={{color:window.location.pathname == '/apps' ? '#058cdb' : '#bfbfbf', minWidth:'auto'}}
        icon={<img className='nav-ic' src={window.location.pathname == '/apps' ? AppsActIcon : AppsIcon} />}/> 

        <BottomNavigationAction label="Profile" sx={{color:window.location.pathname == '/profile' ? '#058cdb' : '#bfbfbf', minWidth:'auto'}}
        icon={<img className='nav-ic' src={window.location.pathname == '/profile' ? ProfileActIcon : ProfileIcon} />}/> 

      </BottomNavigation>
    </Paper>
  </>
  )
}

export default BottomNavBar