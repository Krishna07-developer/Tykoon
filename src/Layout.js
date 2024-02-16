import React, { useContext, useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { Outlet, useNavigation } from 'react-router-dom'
import { ACTION_BLOCKED_ROUTES } from './Constants'
import BottomNavBar from './components/BottomNavBar'
import { CommonContext } from './contexts/CommonContext'
import Sidebar from './components/Sidebar'

const styles = {
	mainCont : {

	},
	mainContDesk : {

	}
}
function Layout() {

	const { isDesktop } = useContext(CommonContext)

	useEffect(() => {

	}, [])

	return(<>
		<Box sx={{background:'#f2fcff', display:'flex', justifyContent:'flex-start', overflow:'hidden'}}>
			{/* {
			  ACTION_BLOCKED_ROUTES.includes(window.location.pathname) ? 
				null : 
				<>
					<Box>
						Desktop Nav Header
					</Box>
					<Box>
							Mobile Nav
					</Box>
				</> 
			} */}
			
			<Box sx={{padding: isDesktop ? '5vh 0 5vh 0' : '5vw 5vw 10vh 5vw', maxWidth:'700px', width:'100%', 
								overflowX:'unset', overflowY:'scroll', minHeight:'90vh',
								left: isDesktop ? '18vw' : '', position:'relative',
								background:'#f2fcff', height:'-webkit-fill-available',maxHeight:'79vh'}}>
				<Outlet />
			</Box>
		

			{/* {
				ACTION_BLOCKED_ROUTES.includes(window.location.pathname) ? null : 
				<>
					<Box>
						Footer
					</Box>
					<Box>
						Left side menu
					</Box>
				</>
			} */}

			{
				(ACTION_BLOCKED_ROUTES.includes(window.location.pathname) || isDesktop) ? null : 
				<BottomNavBar />
			}
			{
				isDesktop ? <Sidebar /> : null
			}

		</Box>
		</>
)
}

export default Layout