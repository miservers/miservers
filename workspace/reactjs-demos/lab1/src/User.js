import {useState, useEffect} from 'react';
import axios from 'axios';
import {Spinner} from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

const User = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect (() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then (response => setUsers(response.data))
        .catch(err => setError(err))
        .then(setLoading(false)) // Always executed
    }, []);

    if (error) return <Alert  variant='danger' dismissible>Error : {error.message}</Alert>

    return (
        <div>
            <h1>Users List!</h1>
            {loading?<Spinner animation="border" />
            :
            <ul>
                {users.map(user => <li key={user.id}>{user.name}: {user.email}</li>)}
            </ul>
            }
        </div>
    )
}

export {User}