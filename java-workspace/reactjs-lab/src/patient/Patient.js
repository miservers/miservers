import React , {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable, { MTableToolbar } from "material-table";
import {Button, IconButton,TextField,Dialog,DialogActions,
		DialogContent,DialogContentText,DialogTitle,Input,Divider} from '@material-ui/core';

import {Radio,RadioGroup,FormControlLabel,FormControl,FormLabel} from '@material-ui/core';
import AddBox from '@material-ui/icons/AddBox';
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";

import {tableIcons} from '../common/TableIcons';
import ServerError from '../common/Errors'
import {useStyles} from '../common/Styles';
import {API_PATIENT} from '../common/Config';


import NewPatient from './NewPatient';

export default function Patient (props) {
	const [patients, setPatients] 		= useState([]); //patients=[] empty table
	const [selectedRow, setSelectedRow] = useState(-1); 
	const [newPatient, setNewPatient] 	= useState({open:false, patient:null});
	const [serverResponse, setServerResponse] = useState({status:null, message:null});
	
	
	const classes = useStyles();

	useEffect(()=> {
				loadData();
				}, []);
	
	const loadData = async () => {
					let response;
					try	{
						response = await fetch(API_PATIENT);
					} catch(err) {
						return setServerResponse(
									{status:504, 
									message:err.name+': '+err.message+'. Backend server may be down!'
									});
					}
					if (!response.ok)
						return setServerResponse({status:response.status, message:response.message});
					
					response.json()
							.then(data => setPatients(data));	
				}

	const handleNewPatientOpen = (e) => setNewPatient({open:true})
										  

	const handleNewPatientClose = (new_patient, server_response) => {
											setNewPatient({open:false, patient:new_patient});
											setServerResponse(server_response);
											setPatients([new_patient,...patients]);
											console.log("ADDDDD : "+ JSON.stringify(server_response));
										}; 
	
	
	return (
		<div className={classes.root}>

			<ServerError message={serverResponse} />

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
					<NewPatient handleClose={handleNewPatientClose}/>
				</DialogContent>
				
			</Dialog>

		</div>
	);
} 





