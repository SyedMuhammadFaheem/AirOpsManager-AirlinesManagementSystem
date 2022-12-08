import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./styles/Signin.css";
import { useHistory, Link } from "react-router-dom";
import Swale from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const initialState = {
  emailLogin: "",
  passwordLogin: "",
};
const initial={
  id:"",
}
const Signin = () => {
  const Swal = withReactContent(Swale);
  const [state, setState] = useState(initialState);
  const { emailLogin, passwordLogin } = state;

  const history = useHistory();
  const loadData = async () => {
    const response = await Axios.post("http://localhost:5000/getcustomerlogin",{
      email: emailLogin,
      password: passwordLogin,
    });
    initial.id=response.data[0].client_id
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const Login = (event) => {
    event.preventDefault();
    loadData();
    Axios.post("http://localhost:5000/customerlogin", {
      email: emailLogin,
      password: passwordLogin,
    }).then((response) => {
      if (response.data.msg) {
        Swal.fire("Invalid Login!", "", "error");
      } else {
        Swal.fire("Login Success!", "", "success");
        setTimeout(()=>history.push(`/CustomerPanel/${initial.id}`),500)
      }
    });
  };
  return (
    <div className="Auth-form-container bg-image">
      <form className="Auth-form" onSubmit={Login}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email" name="emailLogin" value={emailLogin}
              onChange={handleInputChange}
              className="form-control mt-1"
              placeholder="e.g John@example.com" style={{width:'320px'}}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password" name="passwordLogin" value={passwordLogin}
              onChange={handleInputChange}
              className="form-control mt-1"
              placeholder="e.g rXhAz29$%1" style={{width:'320px'}}
              required
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Not Registered?{" "}
            <Link to="/sign-up">
              <a href="">Signup</a>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signin;
