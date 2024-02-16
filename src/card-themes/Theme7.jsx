import CardBase from "./CardBase"
import ImageLoader from '../components/ImageLoader'
import { Button, Box, Paper, Grid, Fab, Badge, Card , useMediaQuery, Stack, Table, TableHead, TableRow, TableCell, TableContainer, TableBody} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'
import LanguageIcon from '@mui/icons-material/Language'
import CallIcon from '@mui/icons-material/Call'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import EmailIcon from '@mui/icons-material/Email'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { FaUserTie } from "react-icons/fa";
import { LiaIndustrySolid } from "react-icons/lia";
import { LuStore } from "react-icons/lu";
import { GrGallery } from "react-icons/gr";
import { MdPayments } from "react-icons/md";
import { MdOutlinePermMedia } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";
import { TbBrandBooking } from "react-icons/tb";
import { FaYoutube } from "react-icons/fa";
import {  FaBoxArchive, FaTelegram } from "react-icons/fa6";
import styled from "@emotion/styled"
import statueOfEquality from "../assets/statueOfEquality.jpg"
import { MdPictureAsPdf } from "react-icons/md";
import FountainImg from "../assets/fountainImage.jpeg"
import JeeyarSwami from "../assets/jeeyarswamy.png"
import { IoTimeOutline } from "react-icons/io5";
import ReactPlayer from "react-player"
import { useEffect, useState } from "react"


const UserCard = styled(Paper)(()=>({
    display:'flex',
    flexDirection:'column',
    background : `url(${statueOfEquality})`,
    position : 'relative',
    color : 'black',
    backgroundSize : '100%',
    backgroundPosition : 'top center',
    backgroundRepeat : 'no-repeat',
    width : '100%',
    backgroundColor : '#fffac3',
    justifyContent : 'center',
    '@media (max-width : 600px)' : {
      marginTop : '-8vh',
      marginBottom :'10vh'
    }
}))

const ProfileDiv = styled(Box)(()=>({
    position : 'relative',
    width : '180px',
    height : '180px',
    margin : '-3vw 0  3vh 20vw',
    '@media (max-width : 600px)' : {
      width : '100px',
      height : '100px',
      margin : '-4vh 0  5vh 60vw',
      
    }
}))

const CardsNav = styled(Box)(()=>({
  width : '5vw',
  height : '6vh',
  display : 'flex',
  flexDirection : 'column',
  alignItems : 'center',
  backgroundColor : '#fd8d4f',
  position : 'relative',
  
  // '&::before' : {
  //   content : '""',
  //   position : 'absolute',
  //   top : '0',
  //   left : '0',
  //   borderWidth : '1vw 1.5vw 0 0',
  //   borderStyle : 'solid',
  //   borderColor : 'white transparent transparent transparent',
  //   width : '0',
  //   zIndex : '1',
  // },
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
  gap : '2px',
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
  boxShadow : '0 0 10px  black',
  flexWrap : 'nowrap',
  backgroundColor : '#fd8d4f',
  color : 'white',
  '@media (max-width : 600px)' : {
    textAlign : 'center'
  }
}))







let styles = {
brandLogo : {
    zIndex : '20',
    margin : '-40px 0 0 -10px'
},
logoImg : {
    width : '42%'
},
  profilePic : {
    width : '100%',
    height : '100%',
    marginTop:'50px',
    marginLeft : '3vw',
    backgroundColor : 'white',
    borderRadius : '50%'
  },
  defIcon: {
    fontSize:'25vw'
  },
 headerName : {
    margin : '30px 0 30px 20vw ',
    textAlign : 'left',
    lineHeight : '0.5'
 },
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
 circleBox : {
    border : '2px solid #B02020',
    borderRadius : '50%',
    width : 'max-content',
    margin : '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor : 'pointer',
    boxShadow : '0 0 7px 2px gray'
 },
circleIcon : {
    background : '#B02020',
    borderRadius : '50%',
    fontSize : '24px',
    padding : '10px',
    margin : '3px',
    color : 'white'  
},
aTag : {
    textDecoration : 'none'
},
  contactCont: {
    display:'flex',
    marginTop:'20px',
    justifyContent:'space-around'
  },
  followUsBox : {
    display : 'flex' ,
    flexDirection : 'column' ,
  },
  socialMediaCont: {
    display:'flex',
    justifyContent:'space-around',
    gap : '5px',
   
  },
  enquiryCont: {
    display:'flex',
    marginBlock:'10px',
    justifyContent:'space-around',
  },
  navIcons : {
    fontSize : '24px',
    marginTop : '10px',
    color : 'white'
  },

  MediaIcon: {
    padding:'10px',
    borderRadius:'50%',
    backgroundColor : 'black',
    color : 'white',
    marginTop : '5px',
    fontSize : '18px'
  },
  aboutMe : {
    display : 'flex',
    flexDirection : 'column',
    marginBlock : '20px ',
  },
  headerUnderline : {
    borderBottom : '2px solid #B02020',
    width : 'fit-content',
    paddingBlock : '2vh',
    color : '#B02020'
  },
  
  galleryCont: {
    display:'flex'
  },
  galleryImg : {
    height:'50vw',
    width:'35vw',
    maxWidth:'400px',
    borderRadius:'5px'
  },

  companiesCont: {
    display:'flex',
    flexDirection:'column',
    justifyContent : 'center',
  },
  companyCont: {
    border:'1px solid gray',
    padding:'10px',
    borderRadius:'10px',
  },
  companyNameCont : {
    fontSize:'20px',
    marginBottom:'10px',
    borderBottom:'1px solid #eaeaea'
  },
  companyDescCont : {
    fontSize:'17px'
  },
  companyImg: {
    width:'80vw',
    maxWidth:'400px',
    borderRadius:'5px'
  },

  ecommCont : {
    border:'1px solid gray',
    padding:'10px',
    borderRadius:'10px',
    margin:'10px',
    textAlign:'center',
    display:'grid',
  },
  ecommProdImg: {
    width:'22vw',
    borderRadius:'5px'
  },

  productsCont: {
    display:'flex',
    flexDirection:'column'
  },
  productCont: {
    border:'1px solid #919191',
    padding:'10px',
    borderRadius:'10px'
  },
  productNameCont: {
    fontSize:'20px',
    marginBottom:'10px',
    borderBottom:'1px solid #eaeaea'
  },
  productDescCont: {
    fontSize:'17px',
    marginBottom:'10px'
  },
  prodImg: {
    width:'80vw',
    borderRadius:'5px',
    marginTop:'10px',
    maxWidth:'400px'
  },
  
  paymentLabel: {
    fontSize:'18px',
    marginBlock:'10px',
    fontWeight:'280'
  },
  invitation : {
    display : 'flex',
    alignItems : 'center',
    gap : '5px'
  },
  boxBold : {
    fontWeight : '800'
  },
  photoGalleryImg : {
    width : '200px'
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
  

}


const mobileStyles = {

headerName : {
  margin : '30px 0 30px 55vw ',
  textAlign : 'left',
  lineHeight : '0.5'
},
 defIcon: {
  fontSize:'20px',
},
enquiryCont: {
  display:'flex',
  marginBlock:'10px',
  justifyContent:'space-around',
  marginInline : '20px',
  alignItems : 'center'
},
navIcons : {
  fontSize : '26px',
  marginTop : '10px',
  color : 'white'
},
gridNav : {
  paddingInline : '20px'
},


aboutMe : {
  display : 'flex',
  flexDirection : 'column',
  margin : '8px ',

},
mobileScreenMargin : {
  margin : '8px ',
},
followUsBox : {
  marginLeft : '10px'
},
socialMediaCont: {
  display:'flex',
  justifyContent:'center',
  gap : '8px'
},
MediaIcon: {
  padding:'10px',
  borderRadius:'50%',
  backgroundColor : '#590009',
  color : 'white',
  marginTop : '5px',
  fontSize : '16px'
},
underline : {
  background : '#F76D02',
  width : '100px',
  height : '3px',
  textAlign : 'center',
  marginTop : '2px',
  marginLeft : '2vw',
  marginBottom : '5vh'
},
companiesCont: {
  display:'flex',
  flexDirection:'column',
  justifyContent : 'center',
  maxWidth : '330px'
},

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
  
  const {card, callMe, whatsappMe, mailMe, initApptBooking, initEnquiryBooking,
         openUrl, cartData, updateCart, showCartModal} = props
         const isDesktop = true

  const isSmallScreen = useMediaQuery('(max-width : 600px)')
  const [minTimeout, setMinTimeout] = useState(false)
  const [videoStart, setVideoStart] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setMinTimeout(true)
    }, 2000)
  }, [])

  const marginTop = {
    marginTop : isSmallScreen ? '40vh' : '30vh'
  }

  return (<>
    {
      card ? <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', background:'#f2fcff', 
                        padding: isDesktop ? '20px' : ''}}> 
      <Box p={2} sx={{ maxWidth:'500px'}}>
        
        <UserCard>
              <a href="https://statueofequality.org/register/" style={styles.aTag}>
                <h3 style={{color : '#B02020'}}>Create New Account</h3>
              </a>

            <ProfileDiv>
                <Box><img src={JeeyarSwami} alt="" width={'100%'}/></Box>
                <p style={isSmallScreen ? mobileStyles.underline:styles.underline}></p>
            </ProfileDiv>
              {/* <Box sx={{zIndex : '0'}}>
                <ReactPlayer height="100%" width="100%" playing={minTimeout ? true : false} onStart={() => setVideoStart(true)} muted url='https://firebasestorage.googleapis.com/v0/b/tykoon-fbbbb.appspot.com/o/posters%2Ffialn_cut_mp4.mp4?alt=media&token=b87170d8-b083-49dc-bb94-06d9d104315f' />
              </Box> */}



          <Grid container spacing={isSmallScreen ? 2: 1} paddingInline={isSmallScreen ? 0: 5} marginInline={isSmallScreen ? 1: 2} style={marginTop}>
            <Grid item xs={4}>
                <Box sx={styles.circleBox}>
                    {
                    card.mobileNo ? 
                    <WhatsAppIcon style={styles.circleIcon} onClick={() => whatsappMe('7901422022')}/> : null
                    }
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box sx={styles.circleBox}>
                    {
                    card.mobileNo ? 
                    <CallIcon style={styles.circleIcon} onClick={() => callMe('7901422022')}/> : null
                    }
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box sx={styles.circleBox}>
                    {
                    card.email ? 
                    <EmailIcon style={styles.circleIcon} onClick={() => mailMe(' contact@statueofequality.org')}/> : null
                    }
                </Box>
            </Grid>
            
          </Grid>

          <Box sx={isSmallScreen ? mobileStyles.followUsBox: styles.followUsBox} marginBlock={isSmallScreen ? 1: 5}>
          <p id="socialMedia" style={{color : 'rgb(176, 32, 32)' , paddingInline:'10px'}}>FOLLOW US ON</p>
          <Box style={isSmallScreen ? mobileStyles.socialMediaCont: styles.socialMediaCont}>
            <NavBox>
              <CardsNav>
                {
                  card?.mediaLinks?.facebookLink ? 
                  <FacebookIcon style={isSmallScreen ? mobileStyles.MediaIcon:styles.MediaIcon} onClick={() => openUrl('https://www.facebook.com/statueofequality')} /> : null
                }
              </CardsNav>
              FACEBOOK
            </NavBox>
            <NavBox>
              <CardsNav>
                {
                  card?.mediaLinks?.twitterLink ? 
                  <TwitterIcon style={isSmallScreen ? mobileStyles.MediaIcon:styles.MediaIcon}  onClick={() => openUrl('https://twitter.com/StatueEquality')} /> : null
                }
              </CardsNav>
              TWITTER
            </NavBox>
            <NavBox>
              <CardsNav>
                {
                  card?.mediaLinks?.instagramLink ? 
                  <InstagramIcon style={isSmallScreen ? mobileStyles.MediaIcon:styles.MediaIcon} onClick={() => openUrl('https://www.instagram.com/statue_of_equality/')} /> : null
                }
              </CardsNav>
              INSTAGRAM
            </NavBox>
            <NavBox>
              <CardsNav>
                {
                  card?.mediaLinks?.linkedinLink ? 
                  <LinkedInIcon style={isSmallScreen ? mobileStyles.MediaIcon: styles.MediaIcon} onClick={() => openUrl('https://statueofequality.org/home/')} /> : null
                }
              </CardsNav>
              WEBSITE
            </NavBox>
            <NavBox>
              <CardsNav>
                {
                  card?.mediaLinks?.linkedinLink ? 
                  <FaYoutube style={isSmallScreen ? mobileStyles.MediaIcon: styles.MediaIcon} onClick={() => openUrl('https://www.youtube.com/@Statueofequality')} /> : null
                }
              </CardsNav>
              YOUTUBE
            </NavBox>
          </Box>
          </Box>

          <Box sx={{display : 'flex', justifyContent : 'space-around' , marginBlock : '10px'}}>
            <ButtonTypeBox>
              Facebook Page
              <FacebookIcon style={{fontSize : '24px'}}/>
            </ButtonTypeBox>
            <ButtonTypeBox>
              Telegram Page
              <FaTelegram style={{fontSize : '24px'}}/>
            </ButtonTypeBox>
          </Box>
          

          <div style={{display : 'flex' , justifyContent : 'center'}}><p style={styles.underline}></p></div>
          
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
                <a href="#payments" style={styles.aTag} onClick={handleScroll}>
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
          <h4 style={styles.headerUnderline}>Samatha Kumb 2024 Invitation Links :</h4>
          <Stack>
            <Box sx={styles.invitation}><MdPictureAsPdf /><a href="https://statueofequality.org/wp-content/uploads/2024/02/Samatha-Kumbh-2024-FEB-20-MAR-1.pdf" target="_blank" style={{...styles.aTag , color : '#EC6C02'}}>Invitation In English</a></Box>
            <Box sx={styles.invitation}><MdPictureAsPdf /><a href="https://statueofequality.org/wp-content/uploads/2024/01/Samatha_Kumb_Telugu.pdf" target="_blank" style={{...styles.aTag , color : '#EC6C02'}}>Invitation In Telugu</a></Box>
            <Box sx={styles.invitation}><MdPictureAsPdf /><a href="https://statueofequality.org/wp-content/uploads/2024/01/Samatha_Kumb_Hindi.pdf" target="_blank" style={{...styles.aTag , color : '#EC6C02'}}>Invitation In Hindhi</a></Box>
          </Stack>
         </Box>

          <Box sx={isSmallScreen ? mobileStyles.aboutMe: styles.aboutMe}>
            <h3 style={styles.headerUnderline} id="aboutMe">About Statue Of Equality :</h3>
            <Box sx={{lineHeight : '1.5'}}>
            The Statue of Equality is a statue of the 11th-century Indian philosopher Ramanuja,
            located on the premises of the Chinna Jeeyar Trust at Muchintal, Ranga Reddy district 
            in the outskirts of Hyderabad. It is the second tallest sitting statue in the world. 
            The project of building the statue was conceptualised by the trust to commemorate 1,000 
            year birth anniversary of Ramanuja, costing an estimated ₹1,000 crore (US$130 million), 
            the project was paid for through the donations of devotees in a major part.
            </Box>
          </Box>

          <ReactPlayer url={'https://www.youtube.com/watch?v=QfSMfEodOgM'} controls={false} width={'100%'} pip={true} stopOnUnmount={false}/>

          <Box>
            <h3 style={styles.headerUnderline} id="fountain">Fountain and Laser Show:</h3>
            <Box>
              <img src={FountainImg} alt="" width={'100%'}/>
            </Box>
          </Box>

          <Box sx={isSmallScreen && mobileStyles.mobileScreenMargin}>
            <h3 style={styles.headerUnderline} id="gallery">Photo Gallery :</h3>
            <Box>
              <h4>SAMATHA KUMBH 2023 HIGHLIGHTS :-</h4>
              <Grid container spacing={2} marginInline={isSmallScreen ? 5 : 0}>
                <Grid item xs={12} md={6}>
                    <Stack>
                      <Box sx={styles.photoGalleryImg}>
                      <a href="https://photos.google.com/share/AF1QipOLSvYvhOFSJqoOZ9UTgJeBR64znkszaw2qP9VkR92AYVQVEImPG50CGjRwt0ylTQ?key=QTdGWHhKV0IwNUtlN1UweVJ3ZlRqZ3lpelZDeVpR" target="_blank">
                      <img src="https://statueofequality.org/wp-content/uploads/2023/02/Samatha-Kumbh-Day-1-Celebrations.jpg" alt="" width={'100%'} /></a></Box>
                      <Box>Feb 2 2023</Box>
                    </Stack>
                </Grid>
               
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.photoGalleryImg}>
                    <a href="https://photos.google.com/share/AF1QipOZhV9hZh1jyX64VPeiZFsG_io6-rwAqWCk5q61vO1zjxF6G8libVd0tUGw6B1Lqw?key=R2xhcTB2YUpmbGhKUlpPVDd1UlZnRmRudEZBVF93" target="_blank">
                    <img src="https://statueofequality.org/wp-content/uploads/2023/02/MAV.jpg" alt="" width={'100%'}/>
                    </a>
                    </Box>
                    <Box>Feb 3 2023</Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.photoGalleryImg}>
                    <a href="https://photos.google.com/share/AF1QipMfghaiR_a64KoKsv_-SqW32gUAjbLCcngmEKtaU1LU016TsvYxP7WbCgGqsQSnsg?key=Smt5b2x0dmpYWWtwMlEtLWxiakt6Qnl5cjBpZEFB" target="_blank">
                    <img src="https://statueofequality.org/wp-content/uploads/2023/02/Samathakumbh-Day-2.jpg" alt="" width={'100%'}/>
                    </a>
                    </Box>
                    <Box>Feb 4 2023</Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.photoGalleryImg}>
                    <a href="https://photos.google.com/share/AF1QipOaTKjV1JoDAnE2mZ1k9CEasZlGVdyFfa5QpzhcGDrXOV34TTk9y8yICv-xbVikBQ?key=RWV1bG1Pa3laaG5YQklUeE1DbDRGQW5BUUVScGRn" target="_blank">
                    <img src="https://statueofequality.org/wp-content/uploads/2023/02/Samatha-kumbh-Feb-5-2.jpg" alt="" width={'100%'}/>
                    </a>
                    </Box>
                    <Box>Feb 5 2023</Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.photoGalleryImg}>
                    <a href="https://photos.google.com/share/AF1QipOJYA_XtmAdtbitw33IBpNoaK0skWX40cJ9V4IlGdT3Zksnz-ENg71MqCiJHKzpLw?key=VHlBbkZfNlJVanR2TlVhaTB3UE1GYk5zNHI4TkZB" target="_blank">
                    <img src="https://statueofequality.org/wp-content/uploads/2023/02/Samatha-kumbh-Feb-6-1.jpg" alt="" width={'100%'}/>
                    </a>
                    </Box>
                    <Box>Feb 6 2023</Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.photoGalleryImg}>
                    <a href="https://photos.google.com/share/AF1QipO0XoN5__OqSph_83NXYkkHVbHifB1xx4H-9voyZ_NGIwiPLEsyq2S0a0K4Jrc7sA?key=T2lTVFBXTmFzem92QnROLUFobWU5MnRBQ0JybDJ3" target="_blank">
                    <img src="https://statueofequality.org/wp-content/uploads/2023/02/Samatha-kumbh-Feb-7-1.jpg" alt="" width={'100%'}/>
                    </a>
                    </Box>
                    <Box>Feb 7 2023</Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.photoGalleryImg}>
                    <a href="https://photos.google.com/share/AF1QipOg-86JFHVyDScyt7aUqa_5mLSmWeV89h3YLfQTZvVSDmzNXo1K7LysHcNfMtzU0w?key=X0tFTXBiUFpRaFNGSU1HdjQ0ZU5HOWF5OGNjdFVR" target="_blank">
                    <img src="https://statueofequality.org/wp-content/uploads/2023/03/HH-Chinna-Jeeyar-Swamiji-with-Children.jpeg" alt="" width={'100%'}/>
                    </a>
                    </Box>
                    <Box>Feb 8 2023</Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.photoGalleryImg}>
                    <a href="https://photos.google.com/share/AF1QipOizqtPjQsAcjAsZG1wmK6xWHUF3cFDsPPVfgO5FKsocw6jhVjL5F83o8TNIqsFow?key=ZmNRNlE1SS1YWlpqOW1fcjhyZ3hQTmN2Rkhqc3FB" target="_blank">
                    <img src="https://statueofequality.org/wp-content/uploads/2023/02/HH-Chinna-Jeeyar-Swamiji-Lord-Sri-Rama-Chandra-Swami.jpg" alt="" width={'100%'}/>
                    </a>
                    </Box>
                    <Box>Feb 9 2023</Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.photoGalleryImg}>
                    <a href="https://photos.google.com/share/AF1QipPKlET7EhHSn2BJIT7Tx2rXivHAEmnQG-Yw0wXZsFoDvtwDsOT7JbN42evp2Q0EWw?key=Tks2RnRuTmtrS3BFWWdaMW13OXI5cmdUVmw0QWt3" target="_blank">
                    <img src="https://statueofequality.org/wp-content/uploads/2023/03/18-garudas-seva-samatha-kumbh-2023.jpg" alt="" width={'100%'}/>
                    </a>
                    </Box>
                    <Box>Feb 10 2023</Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.photoGalleryImg}>
                    <a href="https://photos.google.com/share/AF1QipNboFmlj3pVGLIK86nrP89jCKEzyvXJWclsT6XTbC0XU-22NoM2g-pNePJRrqTOzA?key=Nl9RY215b1ZJM3gyUWlsMldlelRzYTdsN0c3MzZn" target="_blank">
                    <img src="https://statueofequality.org/wp-content/uploads/2023/02/HH-Chinna-Jeeyar-Swamiji-Samatha-Kumbh-2023-Ratthotsvam.jpg" alt="" width={'100%'}/>
                    </a>
                    </Box>
                    <Box>Feb 11 2023</Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={styles.photoGalleryImg}>
                    <a href="https://photos.google.com/share/AF1QipOKEYXOkfsey-izWvdiW81Kzb74ZeSB3-tFRQxe0rQVAQBEuV2UUoZTmwBwPwah3Q?key=QU5oNlBGcVhHd09KTWNvQ2NkWEcxLUt0Y2MyMEdB" target="_blank">
                    <img src="https://statueofequality.org/wp-content/uploads/2023/03/Samatha-Kumbh-Maha-Kumbha-prokshana.jpg" alt="" width={'100%'}/>
                    </a>
                    </Box>
                    <Box>Feb 12 2023</Box>
                  </Grid>
                </Grid>
            </Box>
          </Box>


          <Box>
            <h3 style={styles.headerUnderline}>Timings and Fee :</h3>
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


         

          <Box sx={isSmallScreen && mobileStyles.mobileScreenMargin}>
            {
              card.payments ? 
              <Box >
                <h3 style={styles.headerUnderline} id="payments">Payment Details :</h3>
                {
                  card.payments.accounts.map((account, index) => {
                    return <Box key={index} paddingInline={5}>
                      {
                        <>
                          <Box>
                            <Box style={styles.paymentLabel}>Account Name</Box>
                            <Box>Divyasaketakshetram</Box>
                          </Box>
                          <Box>
                            <Box style={styles.paymentLabel}>Bank Name</Box>
                            <Box>Union Bank Of India</Box>
                          </Box>
                          <Box>
                            <Box style={styles.paymentLabel}>Account Number</Box>
                            <Box> 209710100033430</Box>
                          </Box>
                          <Box>
                            <Box style={styles.paymentLabel}>IFSC Code</Box>
                            <Box>UBIN0820971</Box>
                          </Box>
                        </>
                      }
                    </Box>
                  })
                }
                
              </Box> : null
            }
          </Box>

          <Box>
            <h3 style={styles.headerUnderline} id="fun-time">FUN TIME - CHITRALEKHANAM :</h3>
            <ButtonTypeBox style={{ display : 'flex' , justifyContent : 'center'}}>
              <a href="https://photos.google.com/share/AF1QipPIVt-ErJmzOcXsQfnJhHH0gZj0Y8CvWRqifwuxOzcIawIFyijfPa55B0KcVLREfQ?pli=1&key=MW1jNWNPVERzaDdTekZGT0Rwa0o2VUFuUjVELWtn" target="_blank" style={{...styles.aTag , color : '#F4C5C9' }}>Google Photos Link</a>
            </ButtonTypeBox> 
          </Box>


          <Box marginBlock={5}>
            <Box sx={{display : 'flex' , flexDirection :'column' , alignItems : 'center' , gap : '5px'}}>
              <Box><img src="https://statueofequality.org/wp-content/uploads/2022/12/dress-code--300x265.jpeg" alt="" /></Box>
              <Stack textAlign={'center'}>
                <h3>ENTRY DRESS CODE</h3>
                <h3>TO MAINTAIN THE SOCIAL AND SPIRITUAL AMBIENCE WITHIN THE COMPLEX,PLEASE FOLLOW THE DRESS CODE</h3>
                <p>For those who are not appropriately dressed, please contact the office for traditional dresses, available at
                nominal prices.</p>
                <p><span style={{color : 'red'}}>Note:</span>Dress code is strictly applicable for all above 5 +years.</p>
              </Stack>
            </Box>
          </Box>


          <Box sx={isSmallScreen && mobileStyles.mobileScreenMargin}>
            <h3 style={styles.headerUnderline}>ADDRESS :</h3>
            <Box sx={{paddingBlock : '5px'}}>
              <h4>STATUE OF EQUALITY</h4>
              <p>Sri Ramanagaram, Muchintal Road,Palmakol P.O.Shamshabad,HYDERABAD 509325</p>
              <Box sx={{display : 'flex' , gap : '10px'}}><span style={{fontWeight : '700' , width : '20%'}}>Contact:</span><span style={{width : '80%'}}>7901422022, +91 7330754646</span></Box>
              <Box sx={{display : 'flex' , gap : '10px'}}><span style={{fontWeight : '700',  width : '20%'}}>Email:</span><span style={{width : '80%'}}>contact@statueofequality.org, srs.samaroham@chinnajeeyar.org</span></Box>
            </Box>
          </Box>
          
        </UserCard>
        {
          cartData.totalCount ? 
          <Fab color="primary" aria-label="add"
            sx={{position:'sticky', bottom:'20px', left:'100vw'}}
              onClick={() => showCartModal()}>
              <Badge badgeContent={cartData.totalCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
          </Fab> : null
        }
      </Box> 
      </Box>: 
      <>
        Card Not Found
      </>
    }
  </>)
}

export default CardBase(Theme7)