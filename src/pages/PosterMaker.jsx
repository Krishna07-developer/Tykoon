import html2canvas from 'html2canvas'
import { TextField, Button, Box, Paper, Stack } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { CommonContext } from '../contexts/CommonContext'
import { AuthContext } from '../contexts/AuthContext'
import { END_POINT } from '../Constants'
import Loader from '../components/Loader'
import useNetwork from '../hooks/useNetwork'
import { useNavigate } from 'react-router-dom'



function PosterMaker() {

  const { userData }               = useContext(AuthContext)
  const { showLoader, hideLoader, showSnackbar } = useContext(CommonContext) 
  const { fetchApi } = useNetwork()
  const navigate     = useNavigate()

  const [loading, setLoading]     = useState(true)
  const [posters, setPosters]     = useState([])
  const [selPoster, setSelPoster] = useState({})


  useEffect(() => {
    getPosters()
  }, [])

  const getPosters = async() => {

    const resp = await fetchApi(END_POINT.GET_POSTERS, {})
    setLoading(false)
    if (!resp) return

    setPosters(resp.posters)
  }

  const generateImage = (poster) => {

    setSelPoster(poster)

    showLoader()
    setTimeout(() => {
      const input = document.getElementById('posterCont')
      html2canvas(input, {
                  useCORS : true
      })
      .then((canvas) => {
        
        const imgData = canvas.toDataURL('image/png', 1.0)
        const a = document.createElement("a")
        a.href = imgData
        a.download = "";
        document.body.appendChild(a)
        a.click();
        document.body.removeChild(a)
      })
      hideLoader()
      showSnackbar("Poster downloaded successfully !")
    }, 1500)
  }

  return (<>

    <h2>New Posters Today</h2>

    {
      loading ? <Loader /> : 
      <>
        {
          posters?.length ? <>

            {
              posters.map((poster) => {
                return(<>  
                  <Paper sx={{mb:4}}>
                    <Box sx={{position:'relative', width:'inherit' }}>
                      <Stack sx={{position:'absolute', left:'15px', top:'15px'}}>
                        <img src={userData?.companies[0].logo} style={{width:'80px', height:'80px'}}/>
                        {userData?.companies[0].name}
                      </Stack>
                      <img src={poster.imgUrl} 
                        style={{width:'100%'}}/>
                    </Box>
                    <Button sx={{marginTop:'20px', mr:2}} variant='outlined' 
                      onClick={() => navigate('/editPoster', { state : poster })}>
                      Edit
                    </Button>
                    <Button sx={{marginTop:'20px'}} variant='contained' onClick={() => generateImage(poster)}>
                      Download
                    </Button>
                  </Paper>
                </>)
              })
            }
          </> : 
          <>
            <h1>No Posters Found</h1>
          </>
        }
      </>
    }

    <Box id="posterCont" sx={{position:'absolute', left:'-9999px', width:'512px', height:'512px' }}>
      <Stack sx={{position:'absolute', left:'15px', top:'15px'}}>
        <img src={userData?.companies[0].logo} style={{width:'100px', height:'100px'}}/>
        {userData?.companies[0].name}
      </Stack>
      <img src={selPoster.imgUrl} 
        style={{width:'inherit'}}/>
    </Box>

  </>)
}

export default PosterMaker