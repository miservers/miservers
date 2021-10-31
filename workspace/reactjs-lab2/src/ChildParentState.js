import React, {useState} from 'react';

// Demo modification of state by Child

export default function Parent() {
    const [address, setAddress ] = useState({street:'', city:''});

    const handler = (addr) => setAddress(addr);
      
  
      return (
        <div>
            <h2>Demo modification of state by Child</h2> 
                Address given by my child: {address.street + ' ' + address.city}
            <br/>
            <Child handler = {handler} />

            <hr/>
        </div>
      );
  }
  

  function Child(props) {
    
      return (
        <button onClick = {() => props.handler({street:'12 rue imrane', city: 'casablanca'})}>I'm a child</button>
      );
  }