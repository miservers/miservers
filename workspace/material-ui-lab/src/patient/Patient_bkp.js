import React , {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable, { MTableToolbar } from "material-table";
import {Button, IconButton,TextField,Dialog,DialogActions,
		DialogContent,DialogContentText,DialogTitle,Input,Divider} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import {Radio,RadioGroup,FormControlLabel,FormControl,FormLabel} from '@material-ui/core';
import AddBox from '@material-ui/icons/AddBox';
import EditIcon from '@material-ui/icons/Edit';
import PatientDetailsIcon from '../static/images/Patient_Details.svg';
import SvgIcon from '@material-ui/core/SvgIcon';
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";
import Collapse from '@material-ui/core/Collapse';
import blueGrey from '@material-ui/core/colors/blueGrey';
import CssBaseline from '@material-ui/core/CssBaseline';


import {tableIcons} from '../common/TableIcons';
import ServerError from '../common/Errors'
import {API_PATIENT} from '../common/Config';
import {useStyles, styles} from '../styles/PatientStyles';

import Table from '../Components/Table';
import {Styles} from '../Components/TableStyles';

import AddPatientDialog from './AddPatientDialog';
import { Link } from 'react-router-dom';

export default function Patient (props) {
	const [patients, setPatients] 				= useState([]); //patients=[] empty table
	const [selectedRow, setSelectedRow] 		= useState(-1); 
	const [newPatientOpen, setNewPatientOpen] 	= useState(false);
	const [serverResponse, setServerResponse] 	= useState({status:0, message:null});
	const [alertOpen, setAlertOpen] 			= useState(false);
	const tableRef = React.createRef();

	
	useEffect(()=> {
		async function fetchData () {
			let url = API_PATIENT+'?';
			url += 'pageNo=' + 0;
			url += '&pageSize=' + 10;
			url += '&sortBy=id';
			url += '&sortDirection=asc';
					
			let response;
			try	{
				response = await fetch(url);
			} catch(err) {
				return setServerResponse(
							{status:504, 
							message:err.name+': '+err.message+'. Backend server may be down!'
							});
			}
			if (!response.ok)
				return setServerResponse({status:response.status, message:response.message});
			
			response.json()
					.then(data => setPatients(data.patients));	
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

	const fetchPatients = query => 
					new Promise((resolve, reject) => {
						let url = API_PATIENT+'?';
						url += 'pageNo=' + query.page;
						url += '&pageSize=' + query.pageSize;
						if (query.orderBy){
							url += '&sortBy=' + query.orderBy.field;
							url += '&sortDirection=' + query.orderBy.orderDirection;
						}
						console.log(query);
						fetch(url)
						.then(response => response.json())
						.then(result => {
							resolve({
							data: result.patients,
							page: result.currentPage,
							totalCount: result.totalPatients,
							})
						})
					});

	const columns = [
		{ Header: "Dossier",    accessor: "id", width: 50},
		{ Header: "Prenom",  	accessor: "firstName" },
		{ Header: "Nom",   		accessor: "lastName" },
		{ Header: "Ne(e) le",   accessor: "birthDate" },
		{ Header: "Age",   		accessor: "" },
		{ Header: "Addresse", 	accessor: "address.address"    },
		{ Header: "Ville",   	accessor: "address.city" },
		{ Header: "Telephone", 	accessor: "cellPhone"}
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
		actionsColumnIndex: 0,
		tableLayout: 'auto',
	};

	const actions = [
		{ icon: () => <AddBox color="secondary" fontSize="large"/>,
		  tooltip: 'Nouveau Patient',
		  isFreeAction: true,
		  onClick: (event, rowData) => handleNewPatientOpen(event)
		},
		{ icon: () => <img src={PatientDetailsIcon} />,
		  tooltip: 'Fiche patient',
		  onClick: (event, rowData) =>{window.location.href='/patient/record/' + rowData.id}
		},
	];

	const localization = {
		header : {actions: 'fiche', },
	};

	const [skipPageReset, setSkipPageReset] = React.useState(false);

	// We need to keep the table from resetting the pageIndex when we
	// Update data. So we can keep track of that flag with a ref.

	// When our cell renderer calls updateMyData, we'll use
	// the rowIndex, columnId and new value to update the
	// original data
	const updateMyData = (rowIndex, columnId, value) => {
		// We also turn on the flag to not reset the page
		setSkipPageReset(true)
		setPatients(old =>
		old.map((row, index) => {
			if (index === rowIndex) {
			return {
				...old[rowIndex],
				[columnId]: value,
			}
			}
			return row
		})
		)
	}

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

			<CssBaseline />

			<Table
				columns={columns}
				data={patients}
				setData={setPatients}
				updateMyData={updateMyData}
				skipPageReset={skipPageReset}
			/>


		</div>
	);
} 





