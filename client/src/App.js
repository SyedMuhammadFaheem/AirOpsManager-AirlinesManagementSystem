import React, { Suspense } from 'react';
import { Switch, Route, BrowserRouter, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
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
const NotFound            = React.lazy(() => import('./components/Pages/NotFound'));

// Routes where the public Navbar should not appear
const NO_NAVBAR_PATHS = [
  '/admin-panel', '/clients', '/airplanes', '/flight-status', '/gates', '/airports',
  '/reviews', '/schedules', '/flights', '/tickets', '/bookings',
  '/customer-panel/', '/profile/', '/book-ticket/', '/available-flights/', '/boarding-pass/',
  '/invoice/', '/add-review/', '/my-tickets/',
  '/signin', '/customer-signin', '/sign-up',
];

function AppRoutes() {
  const location = useLocation();
  const showNavbar = !NO_NAVBAR_PATHS.some((p) => location.pathname.startsWith(p));

  return (
    <>
      <ToastContainer position="top-center" />
      {showNavbar && <Navbar />}
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-navy-900"><div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" /></div>}>
        <Switch>
          {/* Public routes */}
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact-us" component={Contact} />
          <Route path="/signin" component={Signin} />
          <Route path="/sign-up" component={Signup} />
          <Route path="/customer-signin" component={CustomerSignin} />
          {/* Admin-protected routes */}
          <ProtectedRoute path="/admin-panel" component={AdminPanel} />
          <ProtectedRoute path="/clients" component={Client} exact />
          <ProtectedRoute path="/clients/new" component={AddEditClient} />
          <ProtectedRoute path="/clients/:id/edit" component={AddEditClient} />
          <ProtectedRoute path="/clients/:id" component={ViewClient} />
          <ProtectedRoute path="/airplanes" component={Airplane} exact />
          <ProtectedRoute path="/airplanes/new" component={AddEditAirplane} />
          <ProtectedRoute path="/airplanes/:id/edit" component={AddEditAirplane} />
          <ProtectedRoute path="/airplanes/:id" component={ViewAirplane} />
          <ProtectedRoute path="/flight-status" component={FlightStatus} exact />
          <ProtectedRoute path="/flight-status/:id" component={ViewFlightStatus} />
          <ProtectedRoute path="/gates" component={Gates} exact />
          <ProtectedRoute path="/gates/:id" component={ViewGates} />
          <ProtectedRoute path="/airports" component={Airport} exact />
          <ProtectedRoute path="/airports/:id" component={ViewAirport} />
          <ProtectedRoute path="/reviews" component={Reviews} exact />
          <ProtectedRoute path="/reviews/:id" component={ViewReviews} />
          <ProtectedRoute path="/schedules" component={Schedule} exact />
          <ProtectedRoute path="/schedules/new" component={AddEditSchedule} />
          <ProtectedRoute path="/schedules/:id/edit" component={AddEditSchedule} />
          <ProtectedRoute path="/schedules/:id" component={ViewSchedule} />
          <ProtectedRoute path="/flights" component={Flight} exact />
          <ProtectedRoute path="/flights/new" component={AddFlight} />
          <ProtectedRoute path="/flights/:id" component={ViewFlight} />
          <ProtectedRoute path="/tickets" component={Ticket} exact />
          <ProtectedRoute path="/tickets/edit/:id" component={EditTicket} />
          <ProtectedRoute path="/tickets/:id" component={ViewTicket} />
          <ProtectedRoute path="/bookings" component={Booking} />

          {/* Customer-protected routes */}
          <CustomerRoute path="/customer-panel/:id" component={CustomerPanel} />
          <CustomerRoute path="/profile/:id" component={ViewProfile} />
          <CustomerRoute path="/book-ticket/:id" component={BookTicket} />
          <CustomerRoute path="/available-flights/:id" component={AvailableFlights} />
          <CustomerRoute path="/boarding-pass/:id" component={BoardingPass} />
          <CustomerRoute path="/invoice/:id" component={Invoice} />
          <CustomerRoute path="/add-review/:id" component={AddReviews} />
          <CustomerRoute path="/my-tickets/:id" component={ViewCustomerTickets} />

          {/* 404 catch-all */}
          <Route component={NotFound} />
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
