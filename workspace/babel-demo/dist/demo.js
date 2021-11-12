class Employee extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h2",
                null,
                "Empolyee name : ",
                this.props.name
            ),
            React.createElement(
                "h2",
                null,
                "Employee salary : ",
                this.props.salary,
                "$"
            )
        );
    }
}

class Company extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement(
            "ul",
            null,
            React.createElement(
                "li",
                null,
                React.createElement(Employee, { name: "Amadou", salary: "34000" })
            ),
            React.createElement(
                "li",
                null,
                React.createElement(Employee, { name: "Hamid", salary: "23000" })
            )
        );
    }
}