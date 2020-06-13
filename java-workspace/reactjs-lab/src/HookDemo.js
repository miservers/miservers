import React, {useState} from 'react';

const MyFunctionCompenent = (props) => {
    let [name, setName] = useState('');
         
    return (
        <div style={{margin: "auto", paddingTop: "10px", border: "blue 1px solid", textAlign: "center"}}>
            <input type="text" onChange={(event) => setName(event.target.value)}></input>
            <h2>Hello {name}</h2>
        </div>
    )
}

export default MyFunctionCompenent;
