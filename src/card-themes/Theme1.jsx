import CardBase from "./CardBase"
import ImageLoader from '../components/ImageLoader'
import { Button, Box, Paper, TextField, Grid, Fab, Badge} from '@mui/material'
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

let styles = {
  profilePic : {
    width:'30vw',
    height:'30vw',
    border: '1px solid #b8b8b8',
    marginTop:'15px',
    borderRadius:'50%'
  },
  defIcon: {
    fontSize:'25vw'
  },
  profilePicCont : {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    fontSize:'25vw'
  },
  userCard : {
    display:'flex',
    flexDirection:'column',
    padding:'3vw',
    background:'linear-gradient(175deg, #c5fffd, transparent)'
  },
 
  userNameCont: {
    textAlign:'center',
    marginTop:'10px',
    fontSize:'30px'
  },
  aboutMeCont: {
    marginTop:'10px',
    textAlign:'justify',
    fontSize:'16px'
  },
  addressCont: {
    marginTop:'10px'
  },
  professionCont: {
    marginTop:'10px'
  },
  contactCont: {
    display:'flex',
    marginTop:'20px',
    justifyContent:'space-around'
  },
  socialMediaCont: {
    display:'flex',
    marginTop:'30px',
    justifyContent:'space-around'
  },
  enquiryCont: {
    display:'flex',
    marginTop:'30px',
    justifyContent:'space-around'
  },
  circleIcon : {
    border:'1px solid black',
    borderRadius:'50%',
    padding:'10px'
  },
  squareIcon: {
    border:'1px solid black',
    padding:'10px',
    borderRadius:'5px',
    boxShadow:'rgb(229 229 229) 0px 0px 11px 2px'
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
    flexDirection:'column'
  },
  companyCont: {
    border:'1px solid #dbdbdb',
    padding:'10px',
    borderRadius:'10px'
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
    border:'1px solid #dbdbdb',
    padding:'10px',
    borderRadius:'10px',
    margin:'10px',
    textAlign:'center',
    display:'grid'
  },
  ecommProdImg: {
    width:'29vw',
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
    fontSize:'15px',
    marginTop:'10px',
    fontWeight:'280'
  },

  center : {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    marginTop:'0px'
  },
  logoImg : {
    width:'80vw',
    marginBottom:'20px'
  }
}

const Theme1 = (props) => {
  
  const {card, callMe, whatsappMe, mailMe, initApptBooking, initEnquiryBooking,
         openUrl, cartData, updateCart, showCartModal} = props
         const isDesktop = true

  return (<>
    {
      card ? <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', background:'#f2fcff', 
                        padding: isDesktop ? '20px' : ''}}> 
      <Box p={2} sx={{background:'linear-gradient(180deg, black, transparent)', maxWidth:'500px'}}>
        
        <Paper style={styles.userCard}>

          <div style={styles.profilePicCont}> 
            {
              card?.profilePicUrl ?
              <ImageLoader props={{imgUrl:card.profilePicUrl, styles:styles.profilePic}}/>
               :
              <AccountCircleIcon style={styles.defIcon}/>
            }
          </div>

          <Box style={styles.userNameCont}>
            { card.fullName } 
          </Box>
          <Box style={styles.aboutMeCont}>
            { card.aboutMe } 
          </Box>
          <Box style={styles.professionCont}>
            { card.profession } 
          </Box>
          <Box style={styles.addressCont}>
            { card.address } 
          </Box>
          
          <Box style={styles.contactCont}>
            {
              card.mobileNo ? 
              <CallIcon style={styles.circleIcon} onClick={() => callMe(card.mobileNo)}/> : null
            }

            {
              card.whatsappNo ? 
              <WhatsAppIcon style={styles.circleIcon} onClick={() => whatsappMe(card.whatsappNo)}/> : null
            }

            {
              card.email ? 
              <EmailIcon style={styles.circleIcon} onClick={() => mailMe(card.email)}/> : null
            }

          </Box>

          <Box style={styles.enquiryCont}>
            <Button variant="contained" size="medium"  onClick={initApptBooking} sx={{mr:3}}>
              Book Appointment
            </Button>
            <Button variant="contained" size="medium" onClick={initEnquiryBooking}>
              Send Enquiry
            </Button>
          </Box>

          <Box style={styles.socialMediaCont}>
            {
              card?.mediaLinks?.facebookLink ? 
              <FacebookIcon style={styles.squareIcon} onClick={() => openUrl(card.mediaLinks.facebookLink)} /> : null
            }
            {
              card?.mediaLinks?.twitterLink ? 
              <TwitterIcon style={styles.squareIcon} onClick={() => openUrl(card.mediaLinks.twitterLink)} /> : null
            }
            {
              card?.mediaLinks?.linkedinLink ? 
              <LinkedInIcon style={styles.squareIcon} onClick={() => openUrl(card.mediaLinks.linkedinLink)} /> : null
            }
            {
              card?.mediaLinks?.instagramLink ? 
              <InstagramIcon style={styles.squareIcon} onClick={() => openUrl(card.mediaLinks.instagramLink)} /> : null
            }
            {
              card?.mediaLinks?.websiteLink ? 
              <LanguageIcon style={styles.squareIcon} onClick={() => openUrl(card.mediaLinks.websiteLink)} /> : null
            }
          </Box>

          <Box>
            {
              card.companies ? 
              <>
                <h3>Companies</h3>
                <Box style={styles.companiesCont}>
                {
                  card.companies.map((company, index) => {
                    return <Box key={index} style={styles.companyCont}>
                      {
                        company.logo ?
                        <ImageLoader props={{imgUrl: company.logo ? company.logo : null, styles : styles.companyImg}} />
                        : null
                      }
                      <div style={styles.companyNameCont}>{company.name}</div>
                      <div style={styles.companyDescCont}>{company.description}</div>
                    </Box>
                  })
                }
                </Box>
              </> : null
            }
          </Box>

          <Box>
            {
              card.products ? 
              <>
                <h3>Products & Services</h3>
                <Box style={styles.productsCont}>
                {
                  card.products.map((product, index) => {
                    return <Box key={index} style={styles.productCont}>
                      <div style={styles.productNameCont}> {product.name} </div>  
                      <div style={styles.productDescCont}> {product.description} </div> 
                      {
                        product.imgUrls ?
                        <ImageLoader props={{imgUrl: product?.imgUrls[0], styles : styles.prodImg}} /> : null
                      }
                    </Box>
                  })
                }
                </Box>
              </> : null
            }
          </Box>

          <Box>
            {
              card?.ecommProducts?.length ? 
              <>
                <h3>Ecommerce</h3>
                <Grid container spacing={3} justifyContent="center" p={2}>
                {
                  card.ecommProducts.map((product, index) => {
                    return <Grid item xs key={index} style={styles.ecommCont}>
                      <ImageLoader props={{imgUrl: product.imgUrls[0], styles : styles.ecommProdImg}} />
                      <Box sx={{fontSize:'17px', fontWeight:'bold'}}>{product.name}</Box>
                      <Box sx={{fontSize:'15px', mt:1, mb:1}}>{product.description}</Box>
                      <Box sx={{fontSize:'17px', mb:1}}>₹ {product.price}</Box>
                      
                      {
                        cartData[product.id] ? 
                        <>
                        <Box sx={{border:'1px solid #dddddd', 
                              display:'flex', 
                              borderRadius:'5px', 
                              justifyContent:'space-around', height:'30px',
                              background:'white', border:'1px solid #c3c3c3'}}>
                          <Box onClick={() => updateCart(product, false)}
                            sx={{padding:'5px 10px 5px 10px', fontSize:'15px', cursor:'pointer'}}>
                            -
                          </Box>
                          <Box sx={{padding:'5px 10px', 
                                    borderRight:'1px solid #bababa', 
                                    borderLeft:'1px solid #bababa', fontSize:'15px',
                                    background:'#058cdb !important', color:'white'}}>
                            {cartData[product.id].count}
                          </Box>
                          <Box  onClick={() => updateCart(product, true)}
                            sx={{padding:'5px 10px 5px 10px', fontSize:'15px', cursor:'pointer'}}>
                            +
                          </Box>
                        </Box>
                        </>  : 
                        <Button variant="contained" 
                          onClick={() => updateCart(product, true)}>Add To Cart</Button>
                      }

                    </Grid>
                  })
                }
                </Grid>
              </> : null
            }
          </Box>

          <Box>
            {
              card.gallery ? 
              <>
                <h3>Gallery</h3>
                <Grid container spacing={3} justifyContent="center">
                  {
                    card.gallery.imgUrls.map((imgUrl, index) => {
                      return<Grid item xs key={index}>
                        <ImageLoader props={{imgUrl: imgUrl, styles : styles.galleryImg}} />
                      </Grid>
                    })
                  }
                </Grid>
              </> : null
            }
          </Box>

          <Box>
            {
              card.payments ? 
              <>
                <h3>Payment Details</h3>
                {
                  card.payments.accounts.map((account, index) => {
                    return <Box key={index}>
                      {
                        <>
                          <Box>
                            <Box style={styles.paymentLabel}>Account Name</Box>
                            <Box> {account.accountName} </Box>
                          </Box>
                          <Box>
                            <Box style={styles.paymentLabel}>Account Number</Box>
                            <Box> {account.accountNumber} </Box>
                          </Box>
                          <Box>
                            <Box style={styles.paymentLabel}>IFSC Code</Box>
                            <Box> {account.ifscCode} </Box>
                          </Box>
                        </>
                      }
                    </Box>
                  })
                }

                <Box sx={{borderTop:'1px solid #eaeaea', marginTop:'10px'}}>
                  <Box style={styles.paymentLabel}>UPI ID</Box>
                  <Box> {card.payments.upi} </Box>
                </Box>

                {
                  card.payments && card.payments.qrImgUrls ?
                  <Box sx={{borderTop:'1px solid #eaeaea', marginTop:'10px'}}>
                    <Box style={styles.paymentLabel}>Payment QR</Box>
                    <ImageLoader props={{imgUrl: card.payments.qrImgUrls[0], styles : styles.prodImg}} />
                  </Box> : null
                }
                
              </> : null
            }
          </Box>
        
        </Paper>
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
      </Box> </Box>: 
      <>
        Card Not Found
      </>
    }
  </>)
}

export default CardBase(Theme1)