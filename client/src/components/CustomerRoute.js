import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const CustomerRoute = ({ component: Component, ...rest }) => {
  const { auth } = useAuth();

  if (auth.loading) return null;

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.role === 'customer' ? <Component {...props} /> : <Redirect to="/CustomerSignin" />
      }
    />
  );
};

export default CustomerRoute;
