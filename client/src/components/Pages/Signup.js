import React from 'react'
import {Link} from 'react-router-dom';
const Signup = () => {
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <label>First Name</label>
            <input
              type="username"
              className="form-control mt-1"
              placeholder="e.g Jane"
            />
          </div>
          <div className="form-group mt-3">
            <label>Middle Name</label>
            <input
              type="username"
              className="form-control mt-1"
              placeholder="e.g Doe"
            />
          </div>
          <div className="form-group mt-3">
            <label>Last Name</label>
            <input
              type="username"
              className="form-control mt-1"
              placeholder="e.g Smith"
            />
          </div>
          <div className="form-group mt-3">
            <label>Phone</label>
            <input
              type="tel"
              className="form-control mt-1"
              placeholder="e.g 923312613326"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="e.g John@example.com"
            />
          </div>
          <div className="form-group mt-3">
            <label>Passport</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Passport"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="e.g rXhAz29$%1"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Already have an account? <Link to='/CustomerSignin'><a href=''> Login</a></Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Signup