import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { auth } = useAuth();

  if (auth.loading) return null;

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.role === 'admin' ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default ProtectedRoute;
