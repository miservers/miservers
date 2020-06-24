import React , {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable, { MTableToolbar } from "material-table";
import {Button, IconButton,TextField,Dialog,DialogActions,
		DialogContent,DialogContentText,DialogTitle,Input,Divider} from '@material-ui/core';

import {Radio,RadioGroup,FormControlLabel,FormControl,FormLabel} from '@material-ui/core';
import AddBox from '@material-ui/icons/AddBox';
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";
import Collapse from '@material-ui/core/Collapse';

import ServerError from '../common/Errors'
import {API_PATIENT} from '../common/Config';
import {useStyles} from '../styles/PatientStyles';


export default function NewPatient({handleClose}) {
	const [serverResponse, setServerResponse]   = useState({status:0, message:null});
	const [alertOpen, setAlertOpen] 			= useState(false);

	const classes = useStyles();

	const handleSubmit = (e) => {
		e.preventDefault();

        const data = new FormData(e.target);
		try	{
			fetch(API_PATIENT, 
					{method:'POST',
					body:data})
			.then(response => {
							if (response.ok) 
								response.json().
								then(data => handleClose(
													data, 
													{status:200, message:"Patient cree avec ID "+data.id}
													));
									
							else // server error
								response.json().
									then(data =>{ 
											setServerResponse(
															{status : response.status, 
															 message: data.message}
															 );
											setAlertOpen(true);
											});
									
				});
					
		} catch(err) { // local JS error
			console.log ("NewPatient handleSubmit Exception");
			console.log(err);
			setServerResponse({status:0, message:err.name+': '+err.message});
			setAlertOpen(true);
		}
	};
  
  
  return (
	<div>

	<Collapse in={alertOpen}>
		{ serverResponse &&
			<ServerError 
				{...serverResponse} 
				onClose={()=>setAlertOpen(false)}
			/>
		}
	</Collapse>

    <form className={classes.form} onSubmit={handleSubmit}>
	  
		<TextField 	id="firstName" name="firstName" label="Prenom"
				   	required autoFocus 
				   	margin="dense" variant="outlined"/>
		<TextField  id="lastName" name="lastName" label="Nom" 
					required margin="dense" variant="outlined"/>
		<TextField id="cin" label="CIN"  margin="dense" variant="outlined"/>
		<TextField id="birthDate" label="Ne(e) le" type="date" InputLabelProps={{shrink: true,}} margin="dense" variant="outlined"/>
		
		<br/>
		
		<FormControl component="fieldset">
			<FormLabel component="legend">Sex</FormLabel>
			<RadioGroup row aria-label="gender" name="gender" defaultValue='FEMME' >
				<FormControlLabel value="FEMME" control={<Radio />} label="Femme" />
				<FormControlLabel value="HOMME" control={<Radio />} label="Homme" />
			</RadioGroup>
		</FormControl>
		
		
		<Divider/>
        

		<TextField id="address.address" label="Addresse"  margin="dense" variant="outlined"/>
        <TextField id="address.zipCode" label="Code Postal"  margin="dense" variant="outlined"/>
        <TextField id="address.city" label="Ville"  margin="dense" variant="outlined"/>
		
		<Divider/>

		<TextField id="cellPhone" label="Telephone"  margin="dense" variant="outlined"/>
		<TextField id="homePhone" label="Telephone bureau"  margin="dense" variant="outlined"/>
		<TextField id="email" label="Email"  margin="dense" variant="outlined"/>

		<Divider/>

		<div style={{textAlign: "center"}}>
			<Button onClick={handleClose} variant="contained" color="default" className={classes.button}>
				Annuter
			</Button>
			<Button type="submit"  variant="contained" color="primary" style={{backgroundColor: 'green'}}>
				Valider
			</Button>
		</div>
    </form>

	</div>
  );
}
