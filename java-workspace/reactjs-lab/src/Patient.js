import React , {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable, { MTableToolbar } from "material-table";
import {Button, IconButton,TextField,Dialog,DialogActions,
		DialogContent,DialogContentText,DialogTitle,Input,Divider} from '@material-ui/core';

import {Radio,RadioGroup,FormControlLabel,FormControl,FormLabel} from '@material-ui/core';
import AddBox from '@material-ui/icons/AddBox';
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";

import {tableIcons} from './TableIcons';
import ServerError from './Errors'

const API_URL = 'http://127.0.0.1:8080/api/patient';


const useStyles = makeStyles((theme) => ({
    form: {
      '& > *': {
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1),
	  },  
	},
	button: {
		marginRight: theme.spacing(1),
	},
  }));


export default function Patient (props) {
	const [patients, setPatients] 		= useState([]); //patients=[] empty table
	const [selectedRow, setSelectedRow] = useState(-1); 
	const [newPatient, setNewPatient] 	= useState({open:false, patient:null});
	const [serverError, setServerError] = useState(null);
  
	
	const classes = useStyles();

	useEffect(()=> {
				loadData();
				}, []);
	
	const loadData = async () => {
					let response;
					try	{
						response = await fetch(API_URL);
					} catch(err) {
						return setServerError(err.name+': '+err.message);
					}
					if (!response.ok)
						return setServerError(response);
					
					response.json()
							.then(data => setPatients(data));	
				}

	const handleNewPatientOpen = (e) => setNewPatient({open:true}); 

	const handleNewPatientClose = (e, new_patient) => {
											setNewPatient({open:false, patient:new_patient})
											console.log("ADDDDD : "+ JSON.stringify(newPatient.patient))
										}; 
	
	
	return (
		<div className={classes.root}>
			<ServerError error={serverError} />

			<MaterialTable 
				title="Patients"
				columns={[
					{ title: "Id",      field: "id"       },
					{ title: "Prenom",  field: "firstName" },
					{ title: "Nom",   	field: "lastName" },
					{ title: "Addresse",field: "address.address"    },
					{ title: "Telephone", field: "cellPhone", searchable: false }
				]}      	
				data={patients}
				onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
				options={{
					search: true,
					headerStyle: {
						backgroundColor: '#01579b',
						color: '#FFF'
					},
					rowStyle: rowData => ({
						backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
					})
				}}
				actions={[
					{
						icon: () => <AddBox color="secondary" fontSize="large"/>,
						tooltip: 'Nouveau Patient',
						isFreeAction: true,
						onClick: (event, rowData) => handleNewPatientOpen(event)
					  }
				]}
				icons={tableIcons}
			/>

			<Dialog open={newPatient.open} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Nouveau Patient</DialogTitle>
				
				<DialogContent>
					<PatientAdd handleClose={handleNewPatientClose}/>
				</DialogContent>
				
			</Dialog>

		</div>
	);
} 

 function PatientAdd({handleClose}) {
	const [serverResponse, setServerResponse] = useState({status:null, message:null});
	
	const classes = useStyles();

	const handleSubmit = (e) => {
		console.log("new USER CR");

		e.preventDefault();

        const data = new FormData(e.target);
		// validating data
		//const username = data.get('username').toLocaleLowerCase();
        //data.set ('username', username);

		try	{
			fetch(API_URL, 
					{method:'POST',
					body:data})
			.then(response => {
							if (response.ok) {
								response.json().
									then(data => {console.log("FFF: "+JSON.stringify(data)); handleClose(e,data)})
											//setServerResponse(
											//		{status : response.status, 
											//		 message: 'Patient cree, ID  ' + data.id}
											//		 ));
									
							} else { // server error
								response.json().
									then(data => 
											setServerResponse(
															{status : response.status, 
															 message: data.message}
															 ));
									
							}	
				});
					
		} catch(err) { // local JS error
			return setServerResponse({status:0, message:err.name+': '+err.message});
		}
				
		//response.json()
		//		.then(data => setPatients(data));	
	}

  return (
	<div>

	<ServerError message={serverResponse} />

    <form className={classes.form} onSubmit={handleSubmit}>
	  
		<TextField 	id="firstName" name="firstName" label="Prenom" value="jamal"
				   	required autoFocus 
				   	margin="dense" variant="outlined"/>
		<TextField  id="lastName" name="lastName" label="Nom"  value="soalwi"
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
			<Button onClick={handleClose} variant="contained" color="secondary" className={classes.button}>
				Annuter
			</Button>
			<Button type="submit"   variant="contained" color="primary">
				Creer patient
			</Button>
		</div>
    </form>

	</div>
  );
}




