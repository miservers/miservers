#### Installation Babel
~~~~sh
cd workspace/
mkdir babel-demo
cd babel-demo/
npm install babel-cli install babel-preset-react babel-plugin-transform-react-jsx
~~~~

#### transpiling JSX into plain JS code
~~~~sh
mkdir dist
node_modules/.bin/babel --plugins transform-react-jsx demo.jsx -d dist/
~~~~

#### JSX code that we want to transpile is(demo.jsx):
~~~js
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
        return <Employee name="Amadou" salary="34000"/>;
    }
}
~~~

#### `demo.js` will be generated, and looks like:
~~~js
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
        return React.createElement(Employee, { name: "Amadou", salary: "34000" });
    }
}
~~~


#### Create `index.html`
~~~~html
 <head>
        <title>Babel Demo</title>
        <meta charset="utf-8"/>
        <script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
        <script src="./dist/demo.js"></script>
    </head>
    <body>
        <div id="container"></div>
        <script>
            let container = document.getElementById("container")
            let company = React.createElement(Company)

            ReactDOM.render(company, container)
        </script>
~~~~

Launch Live Server under VSCode, and access  http://127.0.0.1:5500/workspace/babel-demo/index.html. You see:

Empolyee name : Amadou

Employee salary : 34000$

