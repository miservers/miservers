import React from 'react';

class SignupForm extends React.Component {

    handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.target);
        const username = data.get('username').toLocaleLowerCase();
        
        data.set ('username', username);

        fetch ('/services/signup', {
            method: 'POST',
            body: data,                                  
        }).then(response => console.log(response));
    }

    render () {
        return (
            <div>
            <form onSubmit={this.handleSubmit}>    
            <label> Username:
                <input type="text" name="username" id="username"></input>
            </label>
            <label> Email:
                <input type="email" name="email" id="email"></input>
            </label>
            <label> Birthdate:
                <input type="date" name="birthdate" id="birthdate"></input>
            </label>
            <br />    
            <button type="submit" value="Submit" name="Submit" >Submit</button>
    
            </form>
            </div>

        );
    }
}

export default SignupForm;