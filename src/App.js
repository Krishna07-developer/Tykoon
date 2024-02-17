import logo from './logo.svg'
import './App.css'
import Button                      from '@mui/material/Button'
import { ThemeProvider, 
         createTheme 
        }                          from '@mui/material/styles'
import Layout from './Layout'
import { Routes, Route, BrowserRouter as Router, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { CommonProvider } from './contexts/CommonContext'
import Loader from './components/Loader'
import Authentication from './pages/Authentication'
import { AuthContextProvider } from './contexts/AuthContext'
import RequireAuth from './components/RequireAuth'
import { useContext, useEffect, useState } from 'react'
import { Preferences } from '@capacitor/preferences'
import Landing from './pages/Landing'
import UiHelpers from './components/UiHelpers'
import Card from './pages/Card'
import Profile from './pages/Profile'
import UpdatePersonalDetails from './pages/UpdatePersonalDetails'
import UpdateCompanyDetails from './pages/UpdateCompanyDetails'
import UpdateProducts from './pages/UpdateProducts'
import UpdateSocialMedia from './pages/UpdateSocialMedia'
import UpdatePayments from './pages/UpdatePayments'
import UpdateGallery from './pages/UpdateGallery'
import AppsPage from './pages/AppsPage'
import Network from './pages/Network'
import Appointments from './pages/Appointments'
import Enquiries from './pages/Enquiries'
import AddTask from './pages/AddTask'
import GenerateInvoice from './pages/GenerateInvoice'
import PosterMaker from './pages/PosterMaker'
import EditPoster from './pages/EditPoster'
import Ecommerce from './pages/Ecommerce'
import AddEcommProduct from './pages/AddEcommProduct'
import ViewCard from './pages/ViewCard'
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import Themes from './pages/Themes'
import ViewTasks from './pages/ViewTasks'
import GenerateQuotation from './pages/GenerateQuotation'

const theme = createTheme({
  palette: {
    primary: {
      main : '#058cdb',
      // main : '#f7941d'
    },
    secondary: {
      main : '#2199f'
    },
    danger : {
      main : '#ff0000'
    }
  },
  typography: {
    fontFamily:'Riveruta',
    button: {
      textTransform: 'none'
    }
  },
  components: {
    MuiInputBase : {
      styleOverrides : {
        input : {
          // color:'red',
          
        },
      }
    },
    MuiDialog : {
      styleOverrides : {
        paper : {
          margin:'10px',
          maxWidth:'unset'
        }
      }
    },
    MuiPaper : {
      styleOverrides : {
        root : {
          padding:'10px'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides : {
        notchedOutline : {
          // borderColor:'red',
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          // color:'red',
          "&.Mui-focused": {
            // color: 'red',
            // borderColor:'red'
          },
        },
      }
    },
  }
})

CapacitorUpdater.notifyAppReady()

function App() {

  const location = useLocation()

  useEffect(() => {

  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
        <CommonProvider>
          
          <Routes location={location} key={location.pathname}>
            <Route element={<UiHelpers />}>   
              
              <Route exact path="/" element={<Authentication />}/>
              <Route exact path="/auth" element={<Authentication />}/>  
              <Route path="/*" element={<Card />} />

              <Route element={<RequireAuth />}>      
           
                <Route element={<Layout />}>
                  <Route exact path="/home" element={<Home />}/>
                  <Route exact path="/profile" element={<Profile />}/>
                  <Route path="/updatePersonalDetails" element={<UpdatePersonalDetails />}/>
                  <Route path="/updateCompanyDetails" element={<UpdateCompanyDetails />}/>
                  <Route path="/UpdateProducts" element={<UpdateProducts />}/>
                  <Route path="/updateSocialMedia" element={<UpdateSocialMedia />}/>
                  <Route path="/UpdatePayments" element={<UpdatePayments />}/>  
                  <Route path="/updateGallery" element={<UpdateGallery />}/>
                  <Route path="/apps" element={<AppsPage />}/>
                  <Route path="/network" element={<Network />}/>

                  <Route path="/appointments" element={<Appointments />}/>
                  <Route path="/addTask" element={<AddTask />}/>
                  <Route path="/enquiries" element={<Enquiries />}/>
                  <Route path="/createInvoice" element={<GenerateInvoice />}/>
                  <Route path="/createQuotation" element={<GenerateQuotation />}/>
                  <Route path="/posterMaker" element={<PosterMaker />}/>
                  <Route path="/editPoster" element={<EditPoster />}/>
                  <Route path="/ecommerce" element={<Ecommerce />}/>
                  <Route path="/addEcommProduct" element={<AddEcommProduct />}/>
                  <Route path="/viewCard/:id" element={<ViewCard />}/>
                  <Route path="/themes" element={<Themes />}/>
                  <Route path="/viewTasks" element={<ViewTasks />}/>
                </Route>
              </Route> 
            </Route>
          </Routes>
          
        </CommonProvider>
        </AuthContextProvider>
      </ThemeProvider> 
    </>

  )
}

export default App
