import {Switch,Route, BrowserRouter} from "react-router-dom"; 
import {ToastContainer} from 'react-toastify';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import 'react-toastify/dist/ReactToastify.css';
import Home from "./components/Pages/Home";
import Contact from "./components/Pages/Contact"
import About from './components/Pages/About'
import Signin from './components/Pages/Signin'
import Signup from "./components/Pages/Signup";
import Client from "./components/Pages/Client";
import Navbar from "./components/Navbar";
import AddEditClient from "./components/Pages/AddEditClient";


function App() {
  return (
    <BrowserRouter>
        <ToastContainer position='top-center'/>
        <Switch>
          <Route path='/signin' component={Signin}/>
          <Route path='/sign-up' component={Signup}/>
          <Route path='/Client' component={Client}/>
          <Route path='/AddClient' component={AddEditClient}/>
          <Route path='/Update/:id' component={AddEditClient}/>
          <>
          <Navbar/>
          <Route exact path='/' component={Home}/>
          <Route path='/about' component={About}/>
          <Route path='/contact-us' component={Contact}/>
          </>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
