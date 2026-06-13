import React, { useState } from 'react';
import './styles/Signin.css';
import { useHistory, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../../contexts/AuthContext';

const CustomerSignin = () => {
  const { loginCustomer } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginCustomer(email, password);
      Swal.fire('Login Success!', '', 'success');
      setTimeout(() => history.push(`/CustomerPanel/${user.client_id}`), 500);
    } catch {
      Swal.fire('Invalid Login!', '', 'error');
    }
  };

  return (
    <div className="Auth-form-container bg-image">
      <form className="Auth-form" onSubmit={handleLogin}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Customer Sign In</h3>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control mt-1"
              placeholder="e.g john@example.com"
              required
              style={{ width: '320px' }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control mt-1"
              placeholder="Password"
              required
              style={{ width: '320px' }}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Not registered? <Link to="/sign-up">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default CustomerSignin;
