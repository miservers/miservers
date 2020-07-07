import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Tab} from '../components/Tab';
import TabPanel, {a11yProps} from '../components/TabPanel';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import PatientSynthesis from './PatientSynthesis';

import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Toolbar from '@material-ui/core/Toolbar';
import AllergyImg from '../static/images/Allergy.png';
import PatientConsultationAddImg from '../static/images/PatientConsultationAdd.png'
import PatientPrescriptionAddImg from '../static/images/PatientPrescriptionAdd.png'
import Grid from '@material-ui/core/Grid';
import ColSizes from '../components/ColSizes';


const drawerWidth = 0;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  focusVisible: {
    opacity: 0.15,
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      display: 'inline', //none, inline
    },
  },
}));

/*
 * DOSSIER MEDICAL
 */
export default function PatientRecord() {
  const classes = useStyles();
  const [index, setIndex] = React.useState(0);
  const [consultOpen, setConsultOpen] = React.useState(false);

  const handleChangeIndex = (event, idx) => {
    setIndex(idx);
  };
  
  const handleToggleMenu = ()=>{};

  return (
    <Grid container 
          spacing={1} 
          direction="row"
          className={classes.root}
            >
         
      <Grid item xs={3} sm={6} md={10} lg={12}>     
        <AppBar position="fixe" 
                color="default"
                className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleToggleMenu}
              className={classes.menuButton}
              >
              <MenuIcon />
            </IconButton>
        
        
          <Tabs value={index} 
                onChange={handleChangeIndex} 
                selectionFollowsFocus 
                variant="scrollable"
                scrollButtons="on"
                aria-label="scrollable auto tabs example"
                >
            <Tab label="Synthese" {...a11yProps(0)} />
            <Tab label="Historique" {...a11yProps(1)} />
            <Tab label="Antécédents" {...a11yProps(2)} />
            <Tab label="Biométrie" {...a11yProps(3)} />
            <Tab label="Traitements" {...a11yProps(4)} />
            <Tab label="Vaccins" {...a11yProps(5)} />
            <Tab label="Documents" {...a11yProps(6)} />
            <Tab label="Analyses" {...a11yProps(7)} />
            <Tab label="Finances" {...a11yProps(8)} />
            <Tab label="Infos" {...a11yProps(9)} />
          </Tabs>
         </Toolbar>
        </AppBar>
      </Grid>
      
      <Grid container 
            direction="row"
            spacing={1}>
        <Grid item xs={3} sm={6} md={11} lg={11}>     
          <TabPanel value={index} index={0}>
            <PatientSynthesis />
          </TabPanel>
          <TabPanel value={index} index={1}>
            Historique midical
          </TabPanel>
          <TabPanel value={index} index={2}>
            Antécédents
          </TabPanel>
          <TabPanel value={index} index={3}>
            Mesures
          </TabPanel>
          <TabPanel value={index} index={4}>
            Traitements en cours
          </TabPanel>
          <TabPanel value={index} index={5}>
            Vaccins
          </TabPanel>
          <TabPanel value={index} index={6}>
            Pièces jointes
          </TabPanel>
          <TabPanel value={index} index={7}>
            Dossiers d’analyses
          </TabPanel>
          <TabPanel value={index} index={8}>
            Historique financier
          </TabPanel>
          <TabPanel value={index} index={9}>
            Informations
          </TabPanel> 
        </Grid>
       
        <Grid item  lg={1}>
              <br/><br/><br/><br/>
              <Button color="secondary" 
                      variant="outlined"
                      aria-label="Nouvelle Consultation" 
                      onClick={()=>alert("nouv cons")}>
                <img src={PatientConsultationAddImg} />   
              </Button>
              <br/><br/>
              <Button color="secondary" 
                      variant="outlined"
                      aria-label="Nouvelle Ordonnance" 
                      onClick={()=>alert("nouv cons")}>
                <img src={PatientPrescriptionAddImg} />   
              </Button>
        </Grid>
      
    </Grid>
    
  </Grid>
  );
}
