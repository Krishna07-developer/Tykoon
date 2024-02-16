import React from 'react'
import { Button, Box, Card, Paper, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import ApptIcon from '../assets/appointment.png'
import EnquiryIcon from '../assets/enquiry.png'
import ThemeIcon from '../assets/theme.png'
import CartIcon from '../assets/cart.png'
import InvoiceIcon from '../assets/invoice.png'
import QuotationIcon from '../assets/quotation.png'
import PosterIcon from '../assets/poster.png'
import TaskIcon from '../assets/tasks.png'

const styles = {
  contentCard : {
    height:120,
    width:125,
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    padding:0,
    borderRadius:'20px',
    boxShadow: '5px 5px 15px 5px #eaeaea',
    cursor:'pointer'
  },
  cardIcon : {
    fontSize:25,
    textAlign:'center'
  },
  center : {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    marginTop:'0px'
  },
  actIcon : {
    width:'50px'
  }
}

function AppsPage() {
  const navigate = useNavigate()

  return (
    <Box>
        <h2 style={styles.center}>Apps</h2>
        <Grid container spacing={3} justifyContent="space-around">

          <Grid item lg>
            <Paper style={styles.contentCard} onClick={() => navigate('/appointments')}>
              <span style={styles.cardIcon}>
                <img src={ApptIcon} style={styles.actIcon}/>
              </span>
                
              <Button>
                Appointments
              </Button>
            </Paper>
          </Grid>

          <Grid item lg>
            <Paper style={styles.contentCard} onClick={() => navigate('/enquiries')}>
              <span style={styles.cardIcon}>
                <img src={EnquiryIcon} style={styles.actIcon}/>
              </span>
                
              <Button>
                Enquiries
              </Button>
            </Paper>
          </Grid>

          <Grid item lg>
            <Paper style={styles.contentCard} onClick={() => navigate('/themes')}>
              <span style={styles.cardIcon}>
                <img src={ThemeIcon} style={styles.actIcon}/>
              </span>
                
              <Button>
                Themes
              </Button>
            </Paper>
          </Grid>


          <Grid item lg>
            <Paper style={styles.contentCard} onClick={() => navigate('/viewTasks')}>
              <span style={styles.cardIcon}>
                <img src={TaskIcon} style={styles.actIcon}/>
              </span>
                
              <Button>
                Tasks
              </Button>
            </Paper>
          </Grid>

          <Grid item lg>
            <Paper style={styles.contentCard} onClick={() => navigate('/createInvoice')}>
              <span style={styles.cardIcon}>
                <img src={InvoiceIcon} style={styles.actIcon}/>
              </span>
              <Button>
                Invoice
              </Button>
            </Paper>
          </Grid>

          <Grid item lg>
            <Paper style={styles.contentCard} onClick={() => navigate('/createQuotation')}>
              <span style={styles.cardIcon}>
              <img src={QuotationIcon} style={styles.actIcon}/>
              </span>
                
              <Button>
                Quotation
              </Button>
            </Paper>
          </Grid>

          <Grid item lg>
            <Paper style={styles.contentCard} onClick={() => navigate('/ecommerce')}>
              <span style={styles.cardIcon}>
                <img src={CartIcon} style={styles.actIcon}/>
              </span>
                
              <Button>
                E-commerce
              </Button>
            </Paper>
          </Grid>

          <Grid item lg>
            <Paper style={styles.contentCard} onClick={() => navigate('/posterMaker')}>
              <span style={styles.cardIcon}>
                <img src={PosterIcon} style={styles.actIcon}/>
              </span>
                
              <Button>
                Poster Maker
              </Button>
            </Paper>
          </Grid>

        </Grid>
    </Box>
  )
}

export default AppsPage
