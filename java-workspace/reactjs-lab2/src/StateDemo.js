import React from 'react';

 const styles = {margin: "10px"};

 class StateDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {product: '', price: 0, quantity: 0}
    }

    handleChange = (event) => {
        if (event.target.name == 'product')
            this.setState ({product: event.target.value})
        else if (event.target.name == 'price')
            this.setState ({price: event.target.value})
        
    } 

    render () {
        return (
            <div>
                <h2>State Demo</h2><hr/>
                Product:
                <input type="text" name="product" onChange={this.handleChange} style={styles}/>
                Price:
                <input type="text" name="price" onChange={this.handleChange} style={styles}/>
                <br/>
                <b>Added product: {this.state.product}, price: {this.state.price} DH</b>

            </div>
        );
    }
}


export default StateDemo;