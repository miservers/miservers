import React, { Component } from 'react';

export var users = [ {id: 0, name:"joseph",  email:"joseph@em.com"},
                {id: 1, name:"youness", email:"youness@em.com"},
                {id: 2, name:"ilyass",  email:"ilyass1@em.com"},
                ];

export default function User (props) {
    
    console.log("Match: ", props.match);
    const id = props.match.params.id;
    const user = users[id];

    return (
        <div>
            <h2>User Info</h2>
            <h4>ID {'  '}: {user.id}</h4>
            <h4>Name     : {user.name}</h4>
            <h4>Email    : {user.email}</h4>
        </div>
    );
}

