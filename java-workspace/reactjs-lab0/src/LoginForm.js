import React from 'react';

class LoginForm extends React.Component {

    constructor (props) {
        super(props);

        this.state = {username: 'Jilali', 
                      password: ''
                     };
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let username = this.state.username;
        let password = this.state.password;

        alert ('Hello ' + username);
        
    }

    handleChange = (event) => {
        let name  = event.target.name;
        let value = event.target.value;
        
        this.setState ({[name]:value});
    }

    render () {
        return (
            <div>
            <form onSubmit={this.handleSubmit}>    
            Username:
                <input type="text" name="username"  value={this.state.username} onChange={this.handleChange}></input>

            Password:
                <input type="password" name="password" value="" onChange={this.handleChange}></input>
            <br />    
            <button type="submit" value="Submit" name="Submit" >Submit</button>
    
            </form>
            </div>

        );
    }
}

export default LoginForm;