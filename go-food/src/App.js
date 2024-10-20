import './App.css';
import Home from './Screens/Home';
import Login from './Screens/Login'
import SignUp from './Screens/Signup'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element = {<Home/>}/>
          <Route exact path='/login' element = {<Login/>}/>
          <Route exact path='/createuser' element = {<SignUp/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
