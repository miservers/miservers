import React , {useState} from 'react';
import MaterialTable from "material-table";
import PatientDetailsIcon from '../static/images/Patient_Details.svg';
import blueGrey from '@material-ui/core/colors/blueGrey';
import Grid from '@material-ui/core/Grid';

import {tableIcons} from '../common/TableIcons';
import {API_PATIENT, API_PATIENT_SEARCH} from '../common/Config';


import AddPatientDialog from './AddPatientDialog';

export default function Patient () {
	const [patients, setPatients] 				= useState([]); //patients=[] empty table
		
	const handleAddPatient = (newPatient, srvResponse) => {
			setPatients([newPatient,...patients]);
	}; 
	
	const fetchPatients = query => 
			new Promise((resolve) => {
				let url = API_PATIENT;
				if(query.search) 
					url = API_PATIENT_SEARCH;
				
				url	+= '?pageNo=' + query.page +
					     '&pageSize=' + query.pageSize;
					
				if (query.orderBy)
					url += '&sortBy=' + query.orderBy.field +
					       '&sortDirection=' + query.orderBy.orderDirection;
			
				if(query.search) 
					url += '&criteria=' + query.search;
						
				console.log(query);
				fetch(url).
					then(response => response.json()).
					then(result => {
							resolve({
							data: result.patients,
							page: result.currentPage,
							totalCount: result.totalPatients,
							})
					})
			});

	const columns = [
		{ title: "Prenom",  field: "firstName" },
		{ title: "Nom",   	field: "lastName" },
		{ title: "Ne(e) le",   	field: "birthDate" },
		{ title: "Addresse",field: "address.address"    },
		{ title: "Ville",   	field: "address.city" },
	];

	const options = {
		search: true,
		pageSize: 10,
		padding: 'dense',
		columnsButton: true,
		loadingType: 'linear',  //linear, overlay
		pageSizeOptions:[5, 10, 20, 100],
		emptyRowsWhenPaging: false,
		tableLayout:'fixed',
		headerStyle: {
			backgroundColor: blueGrey[600],
			color: '#FFF'
		},
		actionsColumnIndex: 0,
		debounceInterval: 500,  //debounce interval for search and filter
		searchFieldAlignment: 'right',
		searchFieldStyle: {width: '200px'},
		searchFieldVariant: 'standard',  //standard, filled, outlined


	};

	const actions = [
		{ icon: () => <AddPatientDialog handleAddPatient={handleAddPatient} />,
		  tooltip: 'Nouveau Patient',
		  isFreeAction: true,
		},
		{ icon: () => <img src={PatientDetailsIcon} alt="Fiche patient"/>,
		  tooltip: 'Fiche patient',
		  onClick: (event, rowData) =>{window.location.href='/patient/record/' + rowData.id}
		},
	];

	const localization = {
		header : {actions: 'fiche', },
		toolbar:  {searchPlaceholder: 'par nom ou prenom',}
	};

	return (
		<Grid  xs={12} sm={12} md={10} lg={10}>
    	
			<MaterialTable 
				title	= "Patients"
				columns = {columns}      	
				data	= {fetchPatients}
				options	= {options}
				actions	= {actions}
				icons	= {tableIcons}
				localization = {localization}
				onSearchChange = {(e) => console.log("search changed: " + e)}

		  />

   </Grid>
	);
} 





