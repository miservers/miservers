import {User} from './User.js'
import {AntdDemo} from './AntdDemo.js'
import {Login, Logout} from './Login.js'

function App() {

  console.log ('We are running in ', process.env.NODE_ENV, ' environment!')
  
  return (
    <div className="App">
      <User /> 
      <AntdDemo />
      <Login />
      <br />
      <Logout />
    </div>
  );
}

export default App;
