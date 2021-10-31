import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


function ListUsers() {
    const [users, setUsers] = useState([])
  
    useEffect(() => {
                    fetch('https://jsonplaceholder.typicode.com/users')
                    .then(response => response.json())
                    .then(data => {setUsers(data)})
                    }, []);
            
    const classes = useStyles();
    return (      
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="List Of users">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Login</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {users.map(user => (<TableRow>
                              <TableCell>{user.name}</TableCell>
                              <TableCell>{user.username}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              </TableRow>)
                    )
          } 
          </TableBody>
        </Table>
      </TableContainer>  
      );
  }

  export default ListUsers;