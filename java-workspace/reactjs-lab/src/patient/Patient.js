import React , {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable, { MTableToolbar } from "material-table";
import {Button, IconButton,TextField,Dialog,DialogActions,
		DialogContent,DialogContentText,DialogTitle,Input,Divider} from '@material-ui/core';

import {Radio,RadioGroup,FormControlLabel,FormControl,FormLabel} from '@material-ui/core';
import AddBox from '@material-ui/icons/AddBox';
import EditIcon from '@material-ui/icons/Edit';
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";
import Collapse from '@material-ui/core/Collapse';
import blueGrey from '@material-ui/core/colors/blueGrey';

import {tableIcons} from '../common/TableIcons';
import ServerError from '../common/Errors'
import {API_PATIENT} from '../common/Config';
import {useStyles, styles} from '../styles/PatientStyles';


import NewPatient from './NewPatient';
import { Link } from 'react-router-dom';

export default function Patient (props) {
	const [patients, setPatients] 				= useState([]); //patients=[] empty table
	const [selectedRow, setSelectedRow] 		= useState(-1); 
	const [newPatientOpen, setNewPatientOpen] 	= useState(false);
	const [serverResponse, setServerResponse] 	= useState({status:0, message:null});
	const [alertOpen, setAlertOpen] 			= useState(false);
	
	useEffect(()=> {
		async function fetchData () {
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
		};
		fetchData()}, []);

	const handleNewPatientOpen = (e) => setNewPatientOpen(true);
										  

	const handleNewPatientClose = (newPatient, srvResponse) => {
					setNewPatientOpen(false);
					if (!srvResponse) { //annuler
						setAlertOpen(false);
						return ; 
					}
					setAlertOpen(true);
					setServerResponse(srvResponse);
					setPatients([newPatient,...patients]);
	}; 

	const editPatient = (e, selectedRow) => {
		console.log(selectedRow.tableData.id);
		
	};

	const columns = [
		{ title: "Id",      field: "id",  headerStyle: {width: 10, backgroundColor: '#ddd', height: 10, textAlign:'center'}},
		{ title: "Prenom",  field: "firstName" },
		{ title: "Nom",   	field: "lastName" },
		{ title: "Addresse",field: "address.address"    },
		{ title: "Telephone", field: "cellPhone", searchable: false }
	];

	const options = {
		search: true,
		pageSize: 10,
		padding: 'dense',
		columnsButton: true,
		loadingType: 'linear',
		pageSizeOptions:[5, 10, 20, 100],
		emptyRowsWhenPaging: false,
		tableLayout:'fixed',
		headerStyle: {
			backgroundColor: blueGrey[600],
			color: '#FFF'
		},
		actionsColumnIndex: -1,
		tableLayout: 'auto'
	};

	const actions = [
		{ icon: () => <AddBox color="secondary" fontSize="large"/>,
		  tooltip: 'Nouveau Patient',
		  isFreeAction: true,
		  onClick: (event, rowData) => handleNewPatientOpen(event)
		},
		{ icon: () => <EditIcon color="primary" fontSize="small"/>,
		  tooltip: 'Save User',
		  onClick: (event, rowData) =>{window.location.href="/patient/edit"}
		},
	];


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

			<MaterialTable 
				title	= "Patients"
				columns = {columns}      	
				data	= {patients}
				options	= {options}
				actions	= {actions}
				icons	= {tableIcons}
				onRowClick = {((evt, selectedRow) => editPatient(evt, selectedRow))} 
			/>

			<Dialog open={newPatientOpen} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Nouveau Patient</DialogTitle>
				
				<DialogContent>
					<NewPatient handleClose={handleNewPatientClose}/>
				</DialogContent>
				
			</Dialog>

		</div>
	);
} 





