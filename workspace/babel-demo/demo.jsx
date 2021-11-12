class Employee extends React.Component{
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <h2>Empolyee name : {this.props.name}</h2>
                <h2>Employee salary : {this.props.salary}$</h2>
            </div>
            );
    }
}

class Company extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <ul> 
                <li>
                    <Employee name="Amadou" salary="34000"/>
                </li>
                <li>
                    <Employee name="Hamid" salary="23000"/>
                </li>
            </ul>
        );
    }
}