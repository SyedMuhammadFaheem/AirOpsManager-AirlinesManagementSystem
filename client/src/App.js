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
import ViewClient from './components/Pages/ViewClient'
import AdminPanel from "./components/Pages/AdminPanel";
import AddEditAirplane from "./components/Pages/AddEditAirplane";
import ViewAirplane from "./components/Pages/ViewAirplane";
import Airplane from "./components/Pages/Airplane";
import FlightStatus from "./components/Pages/FlightStatus";
import ViewFlightStatus from "./components/Pages/ViewFlightStatus";
import Gates from "./components/Pages/Gates";
import ViewGates from "./components/Pages/ViewGates";
import Airport from "./components/Pages/Airport";
import ViewAirport from "./components/Pages/ViewAirport";
import Reviews from "./components/Pages/Reviews";
import ViewReviews from "./components/Pages/ViewReviews";
function App() {
  return (
    <BrowserRouter>
        <ToastContainer position='top-center'/>
        <Switch>
          <Route path='/signin' component={Signin}/>
          <Route path='/sign-up' component={Signup}/>
          <Route path='/Client' component={Client}/>
          <Route path='/AdminPanel' component={AdminPanel}/>
          <Route path='/AddEditClient' component={AddEditClient}/>
          <Route path='/Update/:id' component={AddEditClient}/>
          <Route path='/View/:id' component={ViewClient}/>
          <Route path='/Airplane' component={Airplane}/>
          <Route path='/AddEditAirplane' component={AddEditAirplane}/>
          <Route path='/UpdateAirplane/:id' component={AddEditAirplane}/>
          <Route path='/ViewAirplane/:id' component={ViewAirplane}/>
          <Route path='/FlightStatus' component={FlightStatus}/>
          <Route path='/ViewFlightStatus/:id' component={ViewFlightStatus}/>
          <Route path='/Gates' component={Gates}/>
          <Route path='/ViewGates/:id' component={ViewGates}/>
          <Route path='/Airport' component={Airport}/>
          <Route path='/ViewAirport/:id' component={ViewAirport}/>
          <Route path='/Reviews' component={Reviews}/>
          <Route path='/ViewReviews/:id' component={ViewReviews}/>
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
