import { TextField, Button, Box, Paper, Stack } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { CommonContext } from '../contexts/CommonContext'
import { AuthContext } from '../contexts/AuthContext'
import { END_POINT } from '../Constants'
import Loader from '../components/Loader'
import useNetwork from '../hooks/useNetwork'
import { useNavigate } from 'react-router-dom'

function Themes() {

  const { userData }               = useContext(AuthContext)
  const { showLoader, hideLoader, showSnackbar } = useContext(CommonContext) 
  const { fetchApi } = useNetwork()
  const navigate     = useNavigate()

  const [loading, setLoading]   = useState(true)
  const [themes, setThemes]     = useState([])


  useEffect(() => {
    getThemes()
  }, [])

  const getThemes = async() => {

    const resp = await fetchApi(END_POINT.GET_THEMES, {})
    setLoading(false)
    if (!resp) return

    setThemes(resp.themes)
  }

  const activateTheme = async(theme) => {

    const themeData = {
      theme : theme
    }
    showLoader()
    const resp = await fetchApi(END_POINT.UPDATE_USER_PROFILE, themeData)
    hideLoader()
    if (!resp) return

    showSnackbar("Theme changed successfully !")
    navigate(-1)
  }

  return (<>

    <h2>Card Themes</h2>

    {
      loading ? <Loader /> : 
      <>
        {
          themes?.length ? <>
            {
              themes.map((theme) => {
                return(<>  
                  <Paper sx={{mb:4, maxWidth:'300px'}}>
                    <Box sx={{position:'relative', width:'inherit' }}>
                      <img src={theme.imgUrl} 
                        style={{width:'100%', maxWidth:'300px'}}/>
                    </Box>
                    <Box sx={{marginTop:'10px'}}>
                      {theme.name}
                    </Box>
                    <Button sx={{marginTop:'10px'}} variant='contained' fullWidth
                      onClick={() => activateTheme(theme.id)}>
                      Select Theme
                    </Button>
                  </Paper>
                </>)
              })
            }
          </> : 
          <>
            <h2>No Themes Found</h2>
          </>
        }
      </>
    }

  </>)
}

export default Themes