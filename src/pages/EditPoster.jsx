import { Box, Button, FormControlLabel, FormGroup, Paper, Stack } from "@mui/material"
import { useContext, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { CommonContext } from "../contexts/CommonContext"
import { useLocation } from "react-router-dom"
import { ColorPicker, useColor } from "react-color-palette"
import "react-color-palette/css"
import Slider from '@mui/material/Slider'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import html2canvas from 'html2canvas'
import Checkbox from '@mui/material/Checkbox'


function EditPoster(props) {
  
  const location      = useLocation()
  const { userData }  = useContext(AuthContext)
  const { showLoader, hideLoader, showSnackbar } = useContext(CommonContext)
  const poster = location.state

  const [color, setColor]           = useColor("red")
  const [fontSize, setFontSize]     = useState(20)
  const [fontWeight, setFontWeight] = useState('normal')
  const [compLogo, setCompLogo]     = useState(true)
  const [showItems, setShowItems]   = useState({
    companyName : true,
    mobileNo    : false,
    profilePic  : false,
    fullName    : false
  })


  const generateImage = (poster) => {

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
        a.download = ""
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      })
      hideLoader()
      showSnackbar("Poster downloaded successfully !")
    }, 1500)
  }

  const onSelChange = (e) => {
    let newObj = showItems
    newObj[`${e.target.value}`] = e.target.checked
    setShowItems({...newObj})
  }

  return(<>
    <h2>Edit Poster</h2>
    <Paper>
      <Box sx={{position:'relative', width:'inherit' }}>
        <Stack sx={{position:'absolute', left:'15px', top:'15px'}}>
          <img src={userData?.companies[0].logo} style={{width:'80px', height:'80px'}}/>
          <Box sx={{color:color.hex, fontSize:fontSize, fontWeight:fontWeight}}> 
            <Box>
            {
              showItems.companyName ? userData?.companies[0].name : null
            }
            </Box>
            <Box>
            {
              showItems.mobileNo ? userData?.mobileNo : null
            }
            </Box>
          </Box>
        </Stack>
        <img src={poster.imgUrl} 
          style={{width:'100%'}}/>
        
        <Box sx={{padding:'0px 10px'}}>

          <Box mt={2}>Include</Box>
          <Box mb={3}> 
            <FormGroup onChange={(e) => onSelChange(e)}>
              <FormControlLabel value='companyName' control={<Checkbox defaultChecked/>} label="Company Name" />
              <FormControlLabel value='mobileNo' control={<Checkbox/>} label="Mobile Number" />
              {/* <FormControlLabel value='profilePic' control={<Checkbox/>} label="Profile Picture" />
              <FormControlLabel value='fullName' control={<Checkbox/>} label="User Name" /> */}
            </FormGroup>
          </Box>

          <p>Text Color</p>
          <ColorPicker
            color={color}
            hideAlpha={true}
            hideInput={["rgb", "hsv", "hex"]}
            onChange={setColor}
          />
          
          <Box mt={3}>Text Size</Box>
          <Box sx={{padding:'0 10px'}}>
            <Slider
              defaultValue={20}
              step={2}
              min={10}
              onChange={(e) => setFontSize(e.target.value)}
              max={40}
              valueLabelDisplay="auto"
            />
          </Box>


          <Box mb={2}>Font Weight</Box>
          <Box mb={3}>
            <ToggleButtonGroup
              color="primary"
              value={fontWeight}
              exclusive
              onChange={(event, newType) => setFontWeight(newType)}
              aria-label="Font Weight"
            >
              <ToggleButton value="normal">Normal</ToggleButton>
              <ToggleButton value="lighter">Medium</ToggleButton>
              <ToggleButton value="bold">Bold</ToggleButton>
            </ToggleButtonGroup>
          </Box>



        </Box>
      </Box>

      <Button variant="contained" fullWidth
        onClick={generateImage}>
          Save
      </Button>
    </Paper>

    <Box id="posterCont" sx={{position:'absolute', left:'-9999px', width:'512px', height:'512px' }}>
        <Stack sx={{position:'absolute', left:'15px', top:'15px'}}>
          <img src={userData?.companies[0].logo} style={{width:'80px', height:'80px'}}/>
          <Box sx={{color:color.hex, fontSize:fontSize, fontWeight:fontWeight}}> 
            <Box>
            {
              showItems.companyName ? userData?.companies[0].name : null
            }
            </Box>
            <Box>
            {
              showItems.mobileNo ? userData?.mobileNo : null
            }
            </Box>
          </Box>
        </Stack>
        <img src={poster.imgUrl} 
          style={{width:'100%'}}/>
    </Box>
  </>)
}

export default EditPoster