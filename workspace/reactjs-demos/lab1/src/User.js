import {useState, useEffect} from 'react';
import axios from 'axios';

const User = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect (() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then (response => setUsers(response.data))
        
    }, []);

    console.log(users)
    return (
        <div>
            <h1>Users List!</h1>
            <ul>
                {users.map(user => <li>{user.name}: {user.email}</li>)}
            </ul>
        </div>
    )
}

export {User}