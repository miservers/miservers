import React , {useState, useEffect} from 'react';

import { orange } from '@material-ui/core/colors';
import MaterialTable from "material-table";


/* JSON Format:users=[{"id":1, 
 * 				        "username":"Aliko",
 * 				  		"email":"aliko2@gm.com",
 * 				  		"password":"pass123"}, ]
 * 
 * Backend : spring-boot-lab ttp://127.0.0.1:8080/api/user
 */

const API_URL = 'http://127.0.0.1:8080/api/user';
	
export default function Users (props) {


	const [users, setUsers] 			= useState([]); //users=[] empty table
	const [selectedRow, setSelectedRow] = useState(-1); 

	
	useEffect(()=> {
				loadData();
				}, []);
	
	const loadData = async () => {
							   await fetch (API_URL)
							    	.then (response => response.json())
							    	.then (data => setUsers(data));	
								}
	
	return (
      <MaterialTable
      	columns={[
      		{ title: "Id",       field: "id"       },
      		{ title: "Username", field: "username" },
      		{ title: "Email",    field: "email"    },
      		{ title: "Password", field: "password", searchable: false }
      	]}      	
      	title="Users"
  		data={users}
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
      />
	);
} 






