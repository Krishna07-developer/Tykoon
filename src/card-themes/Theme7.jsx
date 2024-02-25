import { Button, Box, Paper, Grid,  useMediaQuery, Stack, Dialog, TextField, Card, } from '@mui/material'
import { FaUserTie } from "react-icons/fa";
import { LiaIndustrySolid } from "react-icons/lia";
import { LuStore } from "react-icons/lu";
import { GrGallery } from "react-icons/gr";
import { MdPayments } from "react-icons/md";
import { MdOutlinePermMedia } from "react-icons/md";
import styled from "@emotion/styled"
import statueOfEquality from "../assets/statueOfEquality.jpg"
import { MdPictureAsPdf } from "react-icons/md";
import FountainImg from "../assets/fountainImage.jpeg"
import JeeyarSwami from "../assets/jeeyarswamy.png"
import { IoTimeOutline } from "react-icons/io5";
import ReactPlayer from "react-player"
import { useEffect, useState } from "react"
import Facebook from "../assets/facebook.png"
import Twitter from "../assets/twitter.png"
import Telegram from "../assets/telegram.png"
import Youtube from "../assets/youtube.png"
import Whatsup from "../assets/whatsup.png"
import Instagram from "../assets/instagram.png"
import Website from "../assets/websiteIcon.png"
import Call from "../assets/callIcon.png"
import Email from "../assets/mail.png"
import { useForm } from "react-hook-form"
import { IoCloseOutline } from "react-icons/io5";
import {addNewContact} from "../api"
import TickMark from "../assets/tickmark.png"
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";



const UserCard = styled(Paper)(()=>({
    display:'flex',
    flexDirection:'column',
    background : `url(${statueOfEquality})`,
    position : 'relative',
    color : 'black',
    backgroundSize : '100%',
    backgroundPosition : 'top center',
    backgroundRepeat : 'no-repeat',
    backgroundColor : '#ffe5c4',
    justifyContent : 'center',
    fontFamily : ' Teko, sans-serif',
    // alignItems : 'center',
    // maxWidth :'50vw',
    width : '500px',
    '@media (max-width : 600px)' : {
      width : 'fit-content'
    }
}))

const ProfileDiv = styled(Box)(()=>({
    position : 'relative',
    width : '180px',
    height : '180px',
    margin : '-2vh 0  3vh 20vw',
    '@media (max-width : 600px)' : {
      width : '100px',
      height : '100px',
      margin : '10vh 0  5vh 80vw',
      
    }
}))

const CardsNav = styled(Box)(()=>({
  width : '5vw',
  height : '6vh',
  display : 'flex',
  flexDirection : 'column',
  alignItems : 'center',
  backgroundColor : '#d39854',
  position : 'relative',
  boxShadow : '0 2px 4px black',
  '&:hover' : {
    opacity : '0.5',
    fontSize : '32px'
  },
  '@media (max-width : 600px)' : {
    width : '13vw',
    height : '6vh',
    '&::before' : {
      borderWidth : '4vw 5vw 0 0',
      borderColor : 'white transparent transparent transparent',
      width : ''
    }
  }

}))

const NavBox = styled(Box)(()=>({
  display : 'flex',
  flexDirection : 'column',
  alignItems : 'center',
  fontSize : '14px',
  color : 'black',
  fontWeight : '700',
  flexWrap : 'nowrap',
  cursor : 'pointer',
  gap : '5px',
  '&:hover' : {
    fontSize : '16px',
    flexWrap : 'nowrap'
  },
  '@media (max-width : 600px)' : {
    flexWrap : 'nowrap',
    fontSize : '12px'
  }

}))

const ButtonTypeBox = styled(Paper)(()=>({
  margin : '10px',
  display : 'flex' , 
  justifyContent : 'space-between',
  alignItems : 'center',
  fontSize : '16px',
  gap : '5px',
  padding : '10px',
  cursor : 'pointer',
  boxShadow : '2px 1px 4px  black',
  flexWrap : 'nowrap',
  backgroundColor : '#d39854',
  color : 'white',
  '@media (max-width : 600px)' : {
    textAlign : 'center'
  }
}))


const HeaderBox = styled(Box)(()=>({
  background : 'white',
  // boxShadow : '0 2px 2px black',
  // fontFamily : '',
  padding : '5px',
  borderRadius : '8px',
  marginBlock : '10px',
  color : '#B02020',
  fontWeight : '700'
}))


const FormCard = styled(Card)(() => ({
  padding: "20px",
  maxWidth: '400px'
}))




let styles = {
  underline : {
     background : '#F76D02',
     width : '170px',
     height : '3px',
     textAlign : 'center',
     marginTop : '2px',
     // marginLeft : '4vw'
  },
  h3 : {
   fontSize : '24px',
   fontWeight : '900',
   color : 'black'
  },
 aTag : {
     textDecoration : 'none',
     whiteSpace : 'nowrap',
     color : 'white'
    
 },
   navIcons : {
     fontSize : '24px',
     marginTop : '10px',
     color : 'white'
   },
   aboutMe : {
     display : 'flex',
     flexDirection : 'column',
     marginBlock : '20px ',
   },
   headerUnderline : {
     width : 'fit-content',
     paddingBlock : '1vh',
     whiteSpace : 'nowrap'
   },
   paymentLabel: {
     fontSize:'18px',
     marginBlock:'10px',
     fontWeight:'700'
   },
   invitation : {
     display : 'flex',
     alignItems : 'center',
     gap : '5px',
     padding : '10px',
     backgroundColor : '#d39854',
     margin : '10px',
     fontSize : '18px',
   },
   boxBold : {
     fontWeight : '800'
   },
   photoGalleryImg : {
     width : '100%',

     
   },
   flexItems : {
     display : 'flex',
     justifyContent : 'center',
     gap : '5px',
     alignItems : 'center'
   },
   textalign : {
     textAlign : 'center'
   },
   imgWidth : {
     width : '70px'
   },
   closeIcon : {
     fontSize : '30px',
     position : 'absolute',
     top : '20px',
     right : '20px'
   },
   register : {
     backgroundColor : '#d39854',
     color : 'white',
     borderRadius : '8px',
     padding : '12px',
     boxShadow : '0 2px 4px black',
     width : 'fit-content',
     fontWeight : '600',
     marginTop : '110%',
     marginLeft : '25%'
   }
 
 }
 
 
 const mobileStyles = {
 navIcons : {
   fontSize : '26px',
   marginTop : '10px',
   color : 'white'
 },
 gridNav : {
   paddingInline : '20px',
   marginBlock : '20px'
 },
 
 
 aboutMe : {
   display : 'flex',
   flexDirection : 'column',
   margin : '8px ',
 
 },
 mobileScreenMargin : {
   margin : '8px ',
 },
 underline : {
   background : '#F76D02',
   width : '100px',
   height : '3px',
   textAlign : 'center',
   marginTop : '2px',
   marginLeft : '2vw',
   marginBottom : '5vh'
 }
 
 }
 



function handleScroll(event) {
  event.preventDefault();
  const targetId = event.currentTarget.getAttribute("href");
  const targetElement = document.querySelector(targetId);
  

  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth" })
}
}







const Theme7 = (props) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const isSmallScreen = useMediaQuery('(max-width : 600px)')
  const [minTimeout, setMinTimeout] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => { setOpen(false) };
  const [analytics , setAnalytics] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setMinTimeout(true)
    }, 2000)

    setOpen(true)
  }, [])

  const onFormSubmit = (data) => {
    const apiParams = {
      name: data.Name,
      mobileNo: data.MobileNumber,
      adtype: 'Participate Kumbh'
    }
    // addNewContact(apiParams)
    // setTimeout(() => {
    //   reset();
    //   setSubmitted(true)
    //   // setOpen(false)
    // }, 1000)
    
  }

  useEffect(()=>{
    const firebaseConfig = {
      apiKey: "AIzaSyBOos_Y37rF6v-DRugmBOsrPSCXrSB3BiU",
      authDomain: "tykooncard.firebaseapp.com",
      projectId: "tykooncard",
      storageBucket: "tykooncard.appspot.com",
      messagingSenderId: "931057095645",
      appId: "1:931057095645:web:cf66c9fcc4c58c551bdc34",
      measurementId: "G-BR84BY8ZZ7"
    };

    const app = initializeApp(firebaseConfig);
    const analyticsInstance = getAnalytics(app);
    setAnalytics(analyticsInstance)
  },[])

  const marginTop = {
    marginTop : isSmallScreen ?  '1vh': '5vh'
  }

  const socialMediaIcons = [
    {
      name : 'Whatsapp',
      icon : Whatsup,
      href : 'https://wa.me/919281079474?text=Hi'
    },
    {
      name : 'Call',
      icon : Call,
      href : 'tel:/7901422022'
    },
    {
      name : 'Gmail',
      icon : Email,
      href : 'mailto:contact@statueofequality.org'
    },
    {
      name : 'Youtube',
      icon : Youtube,
      href : 'https://www.youtube.com/@Statueofequality'
    },
    {
      name : 'FaceBook',
      icon : Facebook,
      href : 'https://www.facebook.com/statueofequality'
    },
    {
      name : 'Instagram',
      icon : Instagram,
      href : 'https://www.instagram.com/statue_of_equality/'
    },
    {
      name : 'Twitter',
      icon : Twitter,
      href : 'https://twitter.com/StatueEquality'
    },
    
    {
      name : 'Telegram',
      icon : Telegram,
      href : 'https://t.me/+gnJOlvrMHK0zZGVl'
    },
    

  ]

  const jeeyarSwamySocialMedias = [
    {
      name : 'Facebook',
      icon : Facebook,
      href : 'https://www.facebook.com/jeeyarswamy'
    },
    {
      name : 'Instagram',
      icon : Instagram,
      href : 'https://www.instagram.com/jeeyarswamy/'
    },
    {
      name : 'Twitter',
      icon : Twitter,
      href : 'https://twitter.com/HHCHINNAJEEYAR'
    },
    {
      name : 'Youtube',
      icon : Youtube,
      href : 'https://www.youtube.com/user/jetworld'
    }
  ]



  return (<>  
           
          <UserCard>
            
          {submitted ?
            <Dialog
                  open={open}
                  onClose={handleClose}>
                  <Stack sx={{padding:'30px', textAlign:'center', alignItems:'center'}}>
                    <img src={TickMark} width={100} />
                    <Box sx={{fontFamily:'ptr', color:'gray'}}>'Thank you for showing your interest !'</Box>
                    <Box sx={{ marginTop:'10px'}}>You will recieve a confirmation text for your registered mobile number.</Box>
                    <Button variant='outlined' onClick={handleClose} sx={{marginTop:'10px'}} >Close</Button>
                  </Stack>
            </Dialog>
            :
            <Dialog
                  open={open}
                  onClose={handleClose} >
                  <IoCloseOutline style={{fontSize :'28px',position:'absolute',right:'10px',cursor:'pointer'}} onClick={handleClose}/>
                  <FormCard>
                    <h3>Register For participate</h3>
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                      <Box mb={3}>
                        <TextField
                          placeholder="Enter Name"
                          label='Name'
                          variant="outlined"
                          name="Name"
                          fullWidth
                          {...register("Name", {
                            required: "Required field"
                          })}
                          error={Boolean(errors?.Name)}
                          helperText={errors?.Name?.message}
                        />
                      </Box>

                      <Box mb={3}>
                        <TextField
                          placeholder="Enter Mobile Number"
                          label='Mobile Number'
                          variant="outlined"
                          name="MobileNumber"
                          fullWidth
                          {...register("MobileNumber", {
                            required: "Required field"
                          })}
                          error={Boolean(errors?.MobileNumber)}
                          helperText={errors?.MobileNumber?.message}
                        />
                      </Box>
                      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginBottom: '25px', marginTop: '25px', marginInline: 'auto' }}>
                        Register
                      </Button>
                    </form>
                  </FormCard>
                </Dialog>
              }


            <ProfileDiv>
                <Box><img src={JeeyarSwami} alt="" width={'100%'}/></Box>
                <p style={isSmallScreen ? mobileStyles.underline:styles.underline}></p>
            </ProfileDiv>

            
                <Button  sx={{...styles.register}}>
                <a href="https://statueofequality.org/register/" style={{...styles.aTag}}>
                REGISTER TO PARTICIPATE
                </a>
                </Button>
            

           <Box sx={{...marginTop}}>
          <h4 id="socialMedia">FOLLOW US ON</h4>
          <Grid container>
            {
              socialMediaIcons.map((eachItem)=>{
                return <Grid item xs={3}>
                <NavBox>
                    <a href={eachItem.href} target='_blank'><img src={eachItem.icon} alt="" style={styles.imgWidth} onClick={()=>{logEvent(analytics, `${eachItem.name}ClickedCount`)}}/></a>
                    {eachItem.name}
                </NavBox>
              </Grid>
              })
              
            }
          </Grid>
          </Box>
          <Box>
            <h4>FOLLOW CHINNAJEEYARSWAMY!</h4>
            <Grid container>
              {
                jeeyarSwamySocialMedias.map((eachIcon)=>{
                  return <Grid item xs={3}>
                    <NavBox>
                      <a href={eachIcon.href} target='_blank'><img src={eachIcon.icon} alt='' style={styles.imgWidth} onClick={()=>{logEvent(analytics, `${eachIcon.name}ClickedCount`)}}/></a>
                      {eachIcon.name}
                    </NavBox>
                  </Grid>
                })
              }
            </Grid>
          </Box>

          <Box sx={{display : 'flex', justifyContent : 'space-around' , marginBlock : '10px'}}>
            <a href="https://statueofequality.org/home/" target='_blank' style={{textDecoration : 'none'}}>
            <ButtonTypeBox>
              Statue Of Equality Website
              <img src={Website} alt="" style={{width : '70px'}}/>
            </ButtonTypeBox>
            </a>
              <a href="https://chinnajeeyar.org/" target='_blank' style={{textDecoration : 'none'}}>
              <ButtonTypeBox>
                Jeeyar Swamy Website
                <img src={Website} alt="" style={{width : '70px'}}/>
              </ButtonTypeBox>
              </a>
          </Box>
          

          <div style={{display : 'flex' , justifyContent : 'center'}}><p style={styles.underline}></p></div>
          
            <a href="https://donations.divyasaketham.org/product-category/samatha-kumbh-2024/" style={{textDecoration : 'none', color : 'white',textWrap : 'nowrap',margin : 'auto'}}>
            <Button variant="contained" sx={{boxShadow : '0 2px 4px black',fontWeight : '600',backgroundColor:'#ad2e2a'}}>
                  PARTICIPATE IN DONATION
            </Button>
            </a>

          <Grid container spacing={3} sx={isSmallScreen && mobileStyles.gridNav}>
            <Grid item xs={4} md={4}>
                <a href="#aboutMe" style={styles.aTag} onClick={handleScroll}>
                    <NavBox>
                      <CardsNav>
                          <FaUserTie style={isSmallScreen ? mobileStyles.navIcons: styles.navIcons}/>
                      </CardsNav>
                      ABOUT
                    </NavBox>
                </a>
            </Grid>
            <Grid item xs={4} md={4}>
                <a href="#fountain" style={styles.aTag} onClick={handleScroll}>
                    <NavBox>
                      <CardsNav>
                          <LiaIndustrySolid style={isSmallScreen ? mobileStyles.navIcons: styles.navIcons}/>
                      </CardsNav>
                      FOUNTAIN
                    </NavBox>
                </a>
            </Grid>
            <Grid item xs={4} md={4}>
                <a href="#fun-time" style={styles.aTag} onClick={handleScroll}>
                    <NavBox>
                      <CardsNav>
                          <LuStore style={isSmallScreen ? mobileStyles.navIcons: styles.navIcons}/>
                      </CardsNav>
                      FUN TIME
                    </NavBox>
                </a>
            </Grid>
            <Grid item xs={4} md={4}>
                <a href="#gallery" style={styles.aTag} onClick={handleScroll}>
                    <NavBox>
                      <CardsNav>
                          <GrGallery style={isSmallScreen ? mobileStyles.navIcons: styles.navIcons}/>
                      </CardsNav>
                      GALLERY
                    </NavBox>
                </a>
            </Grid>
            <Grid item xs={4} md={4}>
                <a href="#timings" style={styles.aTag} onClick={handleScroll}>
                    <NavBox>
                      <CardsNav>
                          <MdPayments style={isSmallScreen ? mobileStyles.navIcons: styles.navIcons}/>
                      </CardsNav>
                      PAYMENTS
                    </NavBox>
                </a>
            </Grid>
            <Grid item xs={4} md={4}>
                <a href="#socialMedia" style={styles.aTag} onClick={handleScroll}>
                    <NavBox>
                      <CardsNav>
                          <MdOutlinePermMedia style={isSmallScreen ? mobileStyles.navIcons: styles.navIcons}/>
                      </CardsNav>
                     SOCIAL MEDIA
                    </NavBox>
                </a>
            </Grid>
          </Grid>

          <Box sx={{marginBlock : '5vh '}}>
          <HeaderBox style={styles.headerUnderline}>SAMATHA KUMB 2024 INVITATION LINKS :</HeaderBox>
          <Stack sx={{ maxWidth : '300px',margin : 'auto',padding : '10px'}}>
            <Button variant="contained" sx={styles.invitation}><MdPictureAsPdf /><a href="https://statueofequality.org/wp-content/uploads/2024/02/Samatha-Kumbh-2024-FEB-20-MAR-1.pdf" target="_blank" style={{...styles.aTag , color : 'white'}}>Invitation In English</a></Button>
            <Button variant="contained" sx={styles.invitation}><MdPictureAsPdf /><a href="https://statueofequality.org/wp-content/uploads/2024/01/Samatha_Kumb_Telugu.pdf" target="_blank" style={{...styles.aTag , color : 'white'}}>Invitation In Telugu</a></Button>
            <Button variant="contained"  sx={styles.invitation}><MdPictureAsPdf /><a href="https://statueofequality.org/wp-content/uploads/2024/01/Samatha_Kumb_Hindi.pdf" target="_blank" style={{...styles.aTag , color : 'white'}}>Invitation In Hindhi</a></Button>
          </Stack>
         </Box>

          <Box sx={isSmallScreen ? mobileStyles.aboutMe: styles.aboutMe}>
            <HeaderBox style={styles.headerUnderline} id="aboutMe">ABOUT STATUE OF EQUALITY :</HeaderBox>
            <Box sx={{lineHeight : '1.5'}}>
            The Statue of Equality is a statue of the 11th-century Indian philosopher Ramanuja,
            located on the premises of the Chinna Jeeyar Trust at Muchintal, Ranga Reddy district 
            in the outskirts of Hyderabad. <span style={{fontWeight : 'bold'}}>It is the second tallest sitting statue in the world.</span> 
            The project of building the statue was conceptualised by the trust to commemorate <span style={{fontWeight : 'bold'}}>1,000 
            year birth anniversary of Ramanuja</span>, costing an estimated ₹1,000 crore (US$130 million), 
            the project was paid for through the donations of devotees in a major part.
            </Box>
          </Box>

          <ReactPlayer url={'https://www.youtube.com/watch?v=QfSMfEodOgM'} controls={false} width={'100%'} pip={true} stopOnUnmount={false}/>

          <Box>
            <HeaderBox style={styles.headerUnderline} id="fountain">FOUNTAIN AND LASER SHOW :</HeaderBox>
            <Box>
              <img src={FountainImg} alt="" width={'100%'}/>
            </Box>
            <Box sx={{textAlign : 'center'}}>
                <h3 style={{color : '#fa6a02'}}>LASER SHOW * EVENINGS ONLY *</h3>
                <h4>Monday to Friday</h4>
                <p>07:00 pm and 08:00 pm</p>
                <h4>Saturday and Sunday</h4>
                <p>6:15 pm, 7:15 pm and 8:15 pm</p>
            </Box>
          </Box>

          <Box>
            <HeaderBox style={styles.headerUnderline} id="gallery">PHOTO GALLERY :</HeaderBox>
            <Box>
              <h4>SAMATHA KUMBH 2023 HIGHLIGHTS :-</h4>
              <Grid container spacing={2} >
                <Grid item xs={12} md={6}>
                  <Box sx={styles.photoGalleryImg}>
                      <a href="https://photos.google.com/share/AF1QipOLSvYvhOFSJqoOZ9UTgJeBR64znkszaw2qP9VkR92AYVQVEImPG50CGjRwt0ylTQ?key=QTdGWHhKV0IwNUtlN1UweVJ3ZlRqZ3lpelZDeVpR" target="_blank" style={styles.photoGalleryImg}>
                      <img src="https://statueofequality.org/wp-content/uploads/2023/02/Samatha-Kumbh-Day-1-Celebrations.jpg" alt="" width={'100%'} /></a>
                      <Box>Feb 2 2023</Box>
                  </Box>
                    
                </Grid>
               
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.photoGalleryImg}>
                    <a href="https://photos.google.com/share/AF1QipOZhV9hZh1jyX64VPeiZFsG_io6-rwAqWCk5q61vO1zjxF6G8libVd0tUGw6B1Lqw?key=R2xhcTB2YUpmbGhKUlpPVDd1UlZnRmRudEZBVF93" target="_blank" style={styles.photoGalleryImg}>
                    <img src="https://statueofequality.org/wp-content/uploads/2023/02/MAV.jpg" alt="" width={'100%'}/>
                    </a>
                    <Box>Feb 3 2023</Box>
                    </Box>
                    
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.photoGalleryImg}>
                      <a href="https://photos.google.com/share/AF1QipMfghaiR_a64KoKsv_-SqW32gUAjbLCcngmEKtaU1LU016TsvYxP7WbCgGqsQSnsg?key=Smt5b2x0dmpYWWtwMlEtLWxiakt6Qnl5cjBpZEFB" target="_blank" >
                      <img src="https://statueofequality.org/wp-content/uploads/2023/02/Samathakumbh-Day-2.jpg" alt="" width={'100%'}/>
                      </a>
                      
                      <Box>Feb 4 2023</Box>
                    </Box>
                    
                  </Grid>
                  <Grid item xs={12} md={6}>
                    
                    <Box sx={styles.photoGalleryImg}>
                    <a href="https://photos.google.com/share/AF1QipOaTKjV1JoDAnE2mZ1k9CEasZlGVdyFfa5QpzhcGDrXOV34TTk9y8yICv-xbVikBQ?key=RWV1bG1Pa3laaG5YQklUeE1DbDRGQW5BUUVScGRn" target="_blank" >
                    <img src="https://statueofequality.org/wp-content/uploads/2023/02/Samatha-kumbh-Feb-5-2.jpg" alt="" width={'100%'}/>
                    </a>
                    
                    <Box>Feb 5 2023</Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    
                    <Box sx={styles.photoGalleryImg}>
                    <a href="https://photos.google.com/share/AF1QipOJYA_XtmAdtbitw33IBpNoaK0skWX40cJ9V4IlGdT3Zksnz-ENg71MqCiJHKzpLw?key=VHlBbkZfNlJVanR2TlVhaTB3UE1GYk5zNHI4TkZB" target="_blank" >
                    <img src="https://statueofequality.org/wp-content/uploads/2023/02/Samatha-kumbh-Feb-6-1.jpg" alt="" width={'100%'}/>
                    </a>
                    
                    <Box>Feb 6 2023</Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                   
                    <Box sx={styles.photoGalleryImg}>
                    <a href="https://photos.google.com/share/AF1QipO0XoN5__OqSph_83NXYkkHVbHifB1xx4H-9voyZ_NGIwiPLEsyq2S0a0K4Jrc7sA?key=T2lTVFBXTmFzem92QnROLUFobWU5MnRBQ0JybDJ3" target="_blank" >
                    <img src="https://statueofequality.org/wp-content/uploads/2023/02/Samatha-kumbh-Feb-7-1.jpg" alt="" width={'100%'}/>
                    </a>
                    
                    <Box>Feb 7 2023</Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                   
                    <Box sx={styles.photoGalleryImg}>
                    <a href="https://photos.google.com/share/AF1QipOg-86JFHVyDScyt7aUqa_5mLSmWeV89h3YLfQTZvVSDmzNXo1K7LysHcNfMtzU0w?key=X0tFTXBiUFpRaFNGSU1HdjQ0ZU5HOWF5OGNjdFVR" target="_blank" >
                    <img src="https://statueofequality.org/wp-content/uploads/2023/03/HH-Chinna-Jeeyar-Swamiji-with-Children.jpeg" alt="" width={'100%'}/>
                    </a>
                  
                    <Box>Feb 8 2023</Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    
                    <Box sx={styles.photoGalleryImg}>
                    <a href="https://photos.google.com/share/AF1QipOizqtPjQsAcjAsZG1wmK6xWHUF3cFDsPPVfgO5FKsocw6jhVjL5F83o8TNIqsFow?key=ZmNRNlE1SS1YWlpqOW1fcjhyZ3hQTmN2Rkhqc3FB" target="_blank" >
                    <img src="https://statueofequality.org/wp-content/uploads/2023/02/HH-Chinna-Jeeyar-Swamiji-Lord-Sri-Rama-Chandra-Swami.jpg" alt="" width={'100%'}/>
                    </a>
                    
                    <Box>Feb 9 2023</Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    
                   <Box sx={styles.photoGalleryImg}>
                   <a href="https://photos.google.com/share/AF1QipPKlET7EhHSn2BJIT7Tx2rXivHAEmnQG-Yw0wXZsFoDvtwDsOT7JbN42evp2Q0EWw?key=Tks2RnRuTmtrS3BFWWdaMW13OXI5cmdUVmw0QWt3" target="_blank" >
                    <img src="https://statueofequality.org/wp-content/uploads/2023/03/18-garudas-seva-samatha-kumbh-2023.jpg" alt="" width={'100%'}/>
                    </a>
                   
                    <Box>Feb 10 2023</Box>
                   </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    
                    <Box sx={styles.photoGalleryImg}>
                    <a href="https://photos.google.com/share/AF1QipNboFmlj3pVGLIK86nrP89jCKEzyvXJWclsT6XTbC0XU-22NoM2g-pNePJRrqTOzA?key=Nl9RY215b1ZJM3gyUWlsMldlelRzYTdsN0c3MzZn" target="_blank" >
                    <img src="https://statueofequality.org/wp-content/uploads/2023/02/HH-Chinna-Jeeyar-Swamiji-Samatha-Kumbh-2023-Ratthotsvam.jpg" alt="" width={'100%'}/>
                    </a>
                  
                    <Box>Feb 11 2023</Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    
                    <Box sx={styles.photoGalleryImg}>
                    <a href="https://photos.google.com/share/AF1QipOKEYXOkfsey-izWvdiW81Kzb74ZeSB3-tFRQxe0rQVAQBEuV2UUoZTmwBwPwah3Q?key=QU5oNlBGcVhHd09KTWNvQ2NkWEcxLUt0Y2MyMEdB" target="_blank" >
                    <img src="https://statueofequality.org/wp-content/uploads/2023/03/Samatha-Kumbh-Maha-Kumbha-prokshana.jpg" alt="" width={'100%'}/>
                    </a>
                    
                    <Box>Feb 12 2023</Box>
                    </Box>
                  </Grid>
                </Grid>
            </Box>
          </Box>


         <Box>
            <HeaderBox style={styles.headerUnderline} id="timings">TIMINGS AND FEE :</HeaderBox>
            <Stack marginBlock={4}>
              <h4>Timings:</h4>
              <Paper sx={{textAlign : 'center', paddingBlock : '10px'}}>
                <Box sx={{...styles.flexItems, color : '#048018'}}><IoTimeOutline/> VISITING HOURS</Box>
                <Box>Monday to Friday</Box>
                <Box sx={styles.flexItems}><span style={{ fontWeight : '700'}}>Hours:</span>11:00 am – 08:00 pm</Box>
                <Box>Saturday and Sunday</Box>
                <Box sx={styles.flexItems}><span style={{ fontWeight : '700'}}>Hours:</span>11:00 am – 08:30 pm</Box>
                <Box sx={{color : 'red'}}><span style={{ fontWeight : '700'}}>Closed:</span>Every Wednesday</Box>
              </Paper>
            </Stack>
            <Paper>
              <h4>Entry Fee:</h4>
              <Box sx={{display : 'flex' , gap : '2px'}}><span style={{...styles.boxBold, width : '15%'}}>₹ 200</span><span>- per Adult</span></Box>
              <Box sx={{display : 'flex' , gap : '2px'}}><span style={{...styles.boxBold, width : '15%'}}>₹ 125</span><span>- per Child (between 5-12 years)</span></Box>
              <Box sx={{display : 'flex' , gap : '2px'}}><span style={{...styles.boxBold, width : '15%'}}>₹ 40</span><span>- for Car Parking</span></Box>
            </Paper>
          </Box>
          
          <a href="https://samaroham.divyasaketham.org/" style={{margin : 'auto'}}>
          <Button  variant="contained" sx={{marginBlock : '20px',boxShadow : '0 2px 4px black',fontWeight : '600',backgroundColor:'#ad2e2a'}}>Book Entry Pass</Button>
          </a>
        

          <Box>
            <HeaderBox style={styles.headerUnderline} id="fun-time">FUN TIME - CHITRALEKHANAM :</HeaderBox>
            <Box>
              <img src="https://lh3.googleusercontent.com/pw/ABLVV84Pwh0yn4bVrPelTnLoW_kFotMkSaaokUKd3g06iqsSZb3IVl3Zq0rrk5y-TIegdruejQ7EQe0CXaiTrIARTnUPV8axKfWCrlCkM7mgo8AFmfP5QY-fSaHmHCwRMf8vSDcVR5ffcLwK2WGXN9IlU1ZU=w411-h913-s-no-gm?authuser=0" alt="" width={'100%'} />
            </Box>
            <Box>
              <img src="https://lh3.googleusercontent.com/pw/ABLVV86VZB1KL46gvex_DOlpAo7XwcH6psHd0uNmaAFj8LGxFjOyeewnRe5I9tVaSe-NfUuZTKcGjwQ6NkF3gggZ0DxG8Y1IXtUb2PdvCs9egNHsnXPF_KOl3eqMs3CtlXH704WJsg4ptg-lgsgw65xHiNXd=w1498-h913-s-no-gm?authuser=0" alt="" width={'100%'} />
            </Box>
            <ButtonTypeBox style={{ display : 'flex' , justifyContent : 'center'}}>
              <a href="https://photos.google.com/share/AF1QipPIVt-ErJmzOcXsQfnJhHH0gZj0Y8CvWRqifwuxOzcIawIFyijfPa55B0KcVLREfQ?pli=1&key=MW1jNWNPVERzaDdTekZGT0Rwa0o2VUFuUjVELWtn" target="_blank" style={{...styles.aTag , color : '#F4C5C9' }}>VIEW MORE GALLERY</a>
            </ButtonTypeBox> 
          </Box>


          <Box marginBlock={5}>
            <Box sx={{display : 'flex' , flexDirection :'column' , alignItems : 'center' , gap : '5px'}}>
              <Box textAlign={'center'}><img src="https://statueofequality.org/wp-content/uploads/2022/12/dress-code--300x265.jpeg" alt="" /></Box>
              <Stack textAlign={'center'}>
                <h3>ENTRY DRESS CODE</h3>
                <h3>TO MAINTAIN THE SOCIAL AND SPIRITUAL AMBIENCE WITHIN THE COMPLEX,PLEASE FOLLOW THE DRESS CODE</h3>
                <p>For those who are not appropriately dressed, please contact the office for traditional dresses, available at
                nominal prices.</p>
                <p><span style={{color : 'red'}}>Note:</span>Dress code is strictly applicable for all above 5+ years.</p>
              </Stack>
            </Box>
          </Box>


          <Box sx={isSmallScreen && mobileStyles.mobileScreenMargin}>
            <HeaderBox style={styles.headerUnderline}>ADDRESS :</HeaderBox>
            <Box sx={{paddingBlock : '5px'}}>
              <h4>STATUE OF EQUALITY</h4>
              <p>Sri Ramanagaram, Muchintal Road,Palmakol P.O.Shamshabad,HYDERABAD 509325</p>
              <Box sx={{display : 'flex' , gap : '10px'}}><span style={{fontWeight : '700' , width : '20%'}}>Contact:</span><span style={{width : '80%'}}>7901422022, +91 7330754646</span></Box>
              <Box sx={{display : 'flex' , gap : '10px'}}><span style={{fontWeight : '700',  width : '20%'}}>Email:</span><span style={{width : '80%'}}>contact@statueofequality.org, srs.samaroham@chinnajeeyar.org</span></Box>
            </Box>
          </Box>
          
          </UserCard>
          
        
     
      
  </>)
}

export default Theme7