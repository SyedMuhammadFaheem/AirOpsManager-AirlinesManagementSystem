import React, { Suspense } from 'react';
import { Switch, Route, BrowserRouter, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import CustomerRoute from './components/CustomerRoute';
import Navbar from './components/Navbar';

// Lazy-loaded pages
const Home               = React.lazy(() => import('./components/Pages/Home'));
const About              = React.lazy(() => import('./components/Pages/About'));
const Contact            = React.lazy(() => import('./components/Pages/Contact'));
const Signin             = React.lazy(() => import('./components/Pages/Signin'));
const Signup             = React.lazy(() => import('./components/Pages/Signup'));
const CustomerSignin     = React.lazy(() => import('./components/Pages/CustomerSignin'));

// Admin pages (protected)
const AdminPanel         = React.lazy(() => import('./components/Pages/AdminPanel'));
const Client             = React.lazy(() => import('./components/Pages/Client'));
const AddEditClient      = React.lazy(() => import('./components/Pages/AddEditClient'));
const ViewClient         = React.lazy(() => import('./components/Pages/ViewClient'));
const Airplane           = React.lazy(() => import('./components/Pages/Airplane'));
const AddEditAirplane    = React.lazy(() => import('./components/Pages/AddEditAirplane'));
const ViewAirplane       = React.lazy(() => import('./components/Pages/ViewAirplane'));
const FlightStatus       = React.lazy(() => import('./components/Pages/FlightStatus'));
const ViewFlightStatus   = React.lazy(() => import('./components/Pages/ViewFlightStatus'));
const Gates              = React.lazy(() => import('./components/Pages/Gates'));
const ViewGates          = React.lazy(() => import('./components/Pages/ViewGates'));
const Airport            = React.lazy(() => import('./components/Pages/Airport'));
const ViewAirport        = React.lazy(() => import('./components/Pages/ViewAirport'));
const Reviews            = React.lazy(() => import('./components/Pages/Reviews'));
const ViewReviews        = React.lazy(() => import('./components/Pages/ViewReviews'));
const Schedule           = React.lazy(() => import('./components/Pages/Schedule'));
const AddEditSchedule    = React.lazy(() => import('./components/Pages/AddEditSchedule'));
const ViewSchedule       = React.lazy(() => import('./components/Pages/ViewSchedule'));
const Flight             = React.lazy(() => import('./components/Pages/Flight'));
const AddFlight          = React.lazy(() => import('./components/Pages/AddFlight'));
const ViewFlight         = React.lazy(() => import('./components/Pages/ViewFlight'));
const Ticket             = React.lazy(() => import('./components/Pages/Ticket'));
const EditTicket         = React.lazy(() => import('./components/Pages/EditTicket'));
const ViewTicket         = React.lazy(() => import('./components/Pages/ViewTicket'));
const Booking            = React.lazy(() => import('./components/Pages/Booking'));

// Customer pages (protected)
const CustomerPanel      = React.lazy(() => import('./components/Pages/CustomerPanel'));
const ViewProfile        = React.lazy(() => import('./components/Pages/ViewProfile'));
const BookTicket         = React.lazy(() => import('./components/Pages/BookTicket'));
const AvailableFlights   = React.lazy(() => import('./components/Pages/AvailableFlights'));
const BoardingPass       = React.lazy(() => import('./components/Pages/BoardingPass'));
const Invoice            = React.lazy(() => import('./components/Pages/Invoice'));
const AddReviews         = React.lazy(() => import('./components/Pages/AddReviews'));
const ViewCustomerTickets = React.lazy(() => import('./components/Pages/ViewCustomerTickets'));

// Routes where the public Navbar should not appear
const NO_NAVBAR_PATHS = [
  '/AdminPanel', '/Client', '/Airplane', '/FlightStatus', '/Gates', '/Airport',
  '/Reviews', '/Schedule', '/Flight', '/Ticket', '/Booking',
  '/AddEditClient', '/AddEditAirplane', '/AddEditSchedule', '/AddFlight', '/EditTicket',
  '/Update/', '/UpdateAirplane/', '/UpdateSchedule/', '/View/', '/ViewAirplane/',
  '/ViewFlightStatus/', '/ViewGates/', '/ViewAirport/', '/ViewReviews/', '/ViewSchedule/',
  '/ViewFlight/', '/ViewTicket/', '/CustomerPanel/', '/ViewProfile/', '/BoardingPass/',
  '/Invoice/', '/AddReviews/', '/ViewCustomerTickets/', '/AvailableFlights/',
];

function AppRoutes() {
  const location = useLocation();
  const showNavbar = !NO_NAVBAR_PATHS.some((p) => location.pathname.startsWith(p));

  return (
    <>
      <ToastContainer position="top-center" />
      {showNavbar && <Navbar />}
      <Suspense fallback={<div className="d-flex justify-content-center mt-5"><div className="spinner-border" /></div>}>
        <Switch>
          {/* Public routes */}
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact-us" component={Contact} />
          <Route path="/signin" component={Signin} />
          <Route path="/sign-up" component={Signup} />
          <Route path="/CustomerSignin" component={CustomerSignin} />
          <Route path="/BookTicket" component={BookTicket} />

          {/* Admin-protected routes */}
          <ProtectedRoute path="/AdminPanel" component={AdminPanel} />
          <ProtectedRoute path="/Client" component={Client} />
          <ProtectedRoute path="/AddEditClient" component={AddEditClient} />
          <ProtectedRoute path="/Update/:id" component={AddEditClient} />
          <ProtectedRoute path="/View/:id" component={ViewClient} />
          <ProtectedRoute path="/Airplane" component={Airplane} />
          <ProtectedRoute path="/AddEditAirplane" component={AddEditAirplane} />
          <ProtectedRoute path="/UpdateAirplane/:id" component={AddEditAirplane} />
          <ProtectedRoute path="/ViewAirplane/:id" component={ViewAirplane} />
          <ProtectedRoute path="/FlightStatus" component={FlightStatus} />
          <ProtectedRoute path="/ViewFlightStatus/:id" component={ViewFlightStatus} />
          <ProtectedRoute path="/Gates" component={Gates} />
          <ProtectedRoute path="/ViewGates/:id" component={ViewGates} />
          <ProtectedRoute path="/Airport" component={Airport} />
          <ProtectedRoute path="/ViewAirport/:id" component={ViewAirport} />
          <ProtectedRoute path="/Reviews" component={Reviews} />
          <ProtectedRoute path="/ViewReviews/:id" component={ViewReviews} />
          <ProtectedRoute path="/Schedule" component={Schedule} />
          <ProtectedRoute path="/AddEditSchedule" component={AddEditSchedule} />
          <ProtectedRoute path="/UpdateSchedule/:id" component={AddEditSchedule} />
          <ProtectedRoute path="/ViewSchedule/:id" component={ViewSchedule} />
          <ProtectedRoute path="/Flight" component={Flight} />
          <ProtectedRoute path="/AddFlight" component={AddFlight} />
          <ProtectedRoute path="/ViewFlight/:id" component={ViewFlight} />
          <ProtectedRoute path="/Ticket" component={Ticket} />
          <ProtectedRoute path="/EditTicket" component={EditTicket} />
          <ProtectedRoute path="/ViewTicket/:id" component={ViewTicket} />
          <ProtectedRoute path="/Booking" component={Booking} />

          {/* Customer-protected routes */}
          <CustomerRoute path="/CustomerPanel/:id" component={CustomerPanel} />
          <CustomerRoute path="/ViewProfile/:id" component={ViewProfile} />
          <CustomerRoute path="/BookTicket/:id" component={BookTicket} />
          <CustomerRoute path="/AvailableFlights/:id" component={AvailableFlights} />
          <CustomerRoute path="/BoardingPass/:id" component={BoardingPass} />
          <CustomerRoute path="/Invoice/:id" component={Invoice} />
          <CustomerRoute path="/AddReviews/:id" component={AddReviews} />
          <CustomerRoute path="/ViewCustomerTickets/:id" component={ViewCustomerTickets} />
        </Switch>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
