import { Box, Button, Paper, Stack, TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import Loader from "../components/Loader"
import { END_POINT } from "../Constants"
import useNetwork from "../hooks/useNetwork"
import { useNavigate } from "react-router-dom"
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ImageLoader from "../components/ImageLoader"
import { CommonContext } from "../contexts/CommonContext"

const styles = {
  profilePic : {
    width:'70px',
    height:'70px',
    border: '1px solid #b8b8b8',
    marginTop:'15px',
    borderRadius:'50%'
  },
  defIcon: {
    fontSize:'70px'
  }
}
function Network() {

  const { fetchApi } = useNetwork()
  const navigate     = useNavigate()
  const { showLoader, hideLoader } = useContext(CommonContext)

  const [users, setUsers]           = useState([])
  const [loading, setLoading]       = useState(true)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    getNetwork()
  }, [])

  const getNetwork = async() => {

    const resp = await fetchApi(END_POINT.GET_NETWORK , {})
    setLoading(false)
    if (!resp) return

    setUsers(resp.tykoonUsers)
  }

  const goToProfile = (user) => {
    navigate(`/viewCard/${user.tykoonUrl}`)
  }

  const searchUser = async() => {

    showLoader()
    const resp = await fetchApi(END_POINT.SEARCH_NETWORK, {
      searchText : searchText
    })
    hideLoader()

    setUsers(resp.tykoonUsers)
  }

  return(<>
  {
    loading ? <Loader /> :
    <Stack>
      <h2>Tykoon Network</h2>
      <Box sx={{display:'flex', justifyContent:'space-between'}}>
        <TextField
          placeholder="Enter User Name"
          label="Search Users"
          variant="outlined"
          size='small'
          type="text"
          value={searchText}
          fullWidth
          autoComplete='off'
          name="username"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          sx={{marginLeft:'10px'}}
          onClick={() => searchUser()}
          variant='contained'>
          Search
        </Button>
      </Box>

      <Box>
        <h2>Tykoon Users</h2>
        { 
          users?.length ? 
          users.map((user, index) => {
            return <Paper key={index} sx={{mb:2}}
              onClick={() => goToProfile(user)}>
              
              <Stack direction="row">
                {
                  user?.profilePicUrl ?
                  <ImageLoader props={{imgUrl:user.profilePicUrl, styles:styles.profilePic}}/>
                  :
                  <AccountCircleIcon style={styles.defIcon}/>
                }

                <Box sx={{ml:2}}>
                  <Box sx={{mb:1, mt:1,}}>
                    <b>{user.fullName}</b> 
                  </Box>

                  <Box sx={{mb:1, mt:1,}}>
                    <b>{user.profession || user.mobileNo}</b> 
                  </Box>
                </Box>
              </Stack>
            </Paper>
          }) : 
          <Box>
            No Users Found
          </Box>
        }
      </Box>

    </Stack>
  }

  </>)
}

export default Network