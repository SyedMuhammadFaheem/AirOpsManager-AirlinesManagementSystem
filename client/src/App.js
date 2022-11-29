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
import Schedule from "./components/Pages/Schedule";
import AddEditSchedule from "./components/Pages/AddEditSchedule";
import ViewSchedule from "./components/Pages/ViewSchedule";
import AddFlight from "./components/Pages/AddFlight";
import Flight from "./components/Pages/Flight";
import ViewFlight from "./components/Pages/ViewFlight";
import Ticket from "./components/Pages/Ticket";
import EditTicket from "./components/Pages/EditTicket";
import ViewTicket from "./components/Pages/ViewTicket";
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
          <Route path='/Schedule' component={Schedule}/>
          <Route path='/AddEditSchedule' component={AddEditSchedule}/>
          <Route path='/UpdateSchedule/:id' component={AddEditSchedule}/>
          <Route path='/ViewSchedule/:id' component={ViewSchedule}/>
          <Route path='/Flight' component={Flight}/>
          <Route path='/AddFlight' component={AddFlight}/>
          <Route path='/ViewFlight/:id' component={ViewFlight}/>
          <Route path='/Ticket' component={Ticket}/>
          <Route path='/EditTicket' component={EditTicket}/>
          <Route path='/ViewTicket/:id' component={ViewTicket}/>
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
