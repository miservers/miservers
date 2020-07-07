import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import MuiCard from '@material-ui/core/Card';
import {CardHeader,CardActions,CardMedia,CardContent} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import MedicalHistoryImg from '../static/images/Medical_History.png';
import MesuresImg from '../static/images/Mesures.png';
import AllergyImg from '../static/images/Allergy.png';
import TraitmentsImg from '../static/images/Traitments.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
    height: '30px'
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
}));

function Card (props) {
  const classes = useStyles();
  return (
    <>
    <MuiCard>
        <CardHeader
          title={props.title}
          titleTypographyProps={{align: 'center' }}
          className={classes.cardHeader}
          disableTypography
        />
        {props.children}
     </MuiCard>
    </>
  )
}

export default function PatientSynthesis() {
  const classes = useStyles();

  return (
      <Grid container 
            spacing={1} 
            direction="row"
            className={classes.root}
            >
        
        <Grid item xs={12} md={12} lg={6}>
           <Card title='Historique medical'>
              <CardContent>
                <div className={classes.cardContent}>  
                  <img src={MedicalHistoryImg} alt="historique medicale"/>                  
                </div>
              </CardContent>
           </Card>
        </Grid>
      
        <Grid item xs={12} md={12} lg={6}>
          <Grid container 
                spacing={1}
                direction="row"
                justify="flex-end"
                >
      
             <Grid item xs={12} md={12} lg={12}>
               <Card title='Traitement en cours'>
                  <CardContent>
                    <div className={classes.cardContent}>  
                      <img src={TraitmentsImg}/>                  
                    </div>
                  </CardContent>
               </Card>
            </Grid>
      
            <Grid item xs={6} md={6} lg={6}>
               <Card title='Mesures'>
                  <CardContent>
                    <div className={classes.cardContent}>  
                      <img src={MesuresImg}/>                  
                    </div>
                  </CardContent>
               </Card>
            </Grid>   
      
            <Grid item xs={6} md={6} lg={6}>
               <Card title='Allergies'>
                  <CardContent>
                    <div className={classes.cardContent}>  
                      <img src={AllergyImg}/>                  
                    </div>
                  </CardContent>
               </Card>
            </Grid>   
      
          </Grid>
        </Grid>

      </Grid>
  );
}
