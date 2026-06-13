import React, { useState } from 'react';
import './styles/Signin.css';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../../contexts/AuthContext';

const Signin = () => {
  const { loginAdmin } = useAuth();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await loginAdmin(username, password);
      Swal.fire('Login Success!', '', 'success');
      setTimeout(() => history.push('/AdminPanel'), 500);
    } catch {
      Swal.fire('Invalid Login!', '', 'error');
    }
  };

  return (
    <div className="Auth-form-container bg-image">
      <form className="Auth-form" onSubmit={handleLogin}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Admin Sign In</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control mt-1"
              placeholder="Username"
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
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
