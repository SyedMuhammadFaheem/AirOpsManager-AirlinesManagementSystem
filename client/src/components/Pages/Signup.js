import React, { Component } from "react";
import Axios from "axios";
import "./styles/Signin.css";
import { withRouter, Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
class Signup extends Component {
  Swal = withReactContent(Swal);
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      mname: "",
      lname: "",
      phone: "",
      email: "",
      passport: "",
      password: "",
      confirmPass: "",
    };
  }

  handleFname = (event) => {
    this.setState({
      fname: event.target.value,
    });
  };
  handleMname = (event) => {
    this.setState({
      mname: event.target.value,
    });
  };
  handleLname = (event) => {
    this.setState({
      lname: event.target.value,
    });
  };
  handlePhone = (event) => {
    this.setState({
      phone: event.target.value,
    });
  };
  handleEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handlePassport = (event) => {
    this.setState({
      passport: event.target.value,
    });
  };

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleConfirmPass = (event) => {
    this.setState({
      confirmPass: event.target.value,
    });
  };
  encrypt()
    {
        let s=4;
        var text=this.state.password;
        console.log("text: " + text);
        let result=""
        for (let i = 0; i < text.length; i++)
        {
            let char = text[i];
            if (char.toUpperCase(text[i]))
            {
                let ch =  String.fromCharCode((char.charCodeAt(0) + s-65) % 26 + 65);
                result += ch;
                this.setState({
                  password:result
                })
            }
            else
            {
                let ch = String.fromCharCode((char.charCodeAt(0) + s-97) % 26 + 97);
                result += ch;
                this.setState({
                  password:result
                })
            }
        }
        console.log('result: ' + result);
        
        console.log(this.state.password)
    }
  register = (e) => {
    e.preventDefault();
    console.log(this.state.fname);
    console.log(this.state.mname);
    console.log(this.state.lname);
    console.log(this.state.phone);
    console.log(this.state.email);
    console.log(this.state.passport);
    console.log(this.state.password);
    console.log(this.state.confirmPass);
    console.log(this.state.password);
    this.encrypt();
    if(this.state.password!==this.state.confirmPass)
    Swal.fire("Password doesn't match confirm password!", "", "error");
    else
    {

      Axios.post("http://localhost:5000/signup", {
        fname: this.state.fname,
        mname: this.state.mname,
        lname: this.state.lname,
        phone: this.state.phone,
        email: this.state.email,
        passport: this.state.passport,
        password: this.state.password,
      }).then((response) => {
        console.log(response);
        if (response.data.err) console.log(response.data.err);
      }).catch((err)=> Swal.fire("Error in Signup!", "", "error"));
      Swal.fire("Registered Successfully!", "", "success");
      setTimeout(()=>this.props.history.push("/CustomerSignin"),500);
    }


  };
  render() {
    return (
      <div className="Auth-form-container bg-image">
        <form className="Auth-form" onSubmit={this.register}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="form-group mt-3">
              <label>First Name</label>
              <input
                type="username"
                required
                className="form-control mt-1"
                placeholder="e.g Jane"
                onChange={this.handleFname} style={{width:'320px'}}
              />
            </div>
            <div className="form-group mt-3">
              <label>Middle Name</label>
              <input
                type="username"
                required
                className="form-control mt-1"
                placeholder="e.g Doe"
                onChange={this.handleMname} style={{width:'320px'}}
              />
            </div>
            <div className="form-group mt-3">
              <label>Last Name</label>
              <input
                type="username"
                required
                className="form-control mt-1"
                placeholder="e.g Smith"
                onChange={this.handleLname} style={{width:'320px'}}
              />
            </div>
            <div className="form-group mt-3">
              <label>Phone</label>
              <input
                type="tel"
                required
                className="form-control mt-1"
                placeholder="e.g 923312613326"
                onChange={this.handlePhone} style={{width:'320px'}}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="email"
                required
                className="form-control mt-1"
                placeholder="e.g John@example.com"
                onChange={this.handleEmail} style={{width:'320px'}}
              />
            </div>
            <div className="form-group mt-3">
              <label>Passport</label>
              <input
                type="text"
                required
                className="form-control mt-1"
                placeholder="Passport"
                onChange={this.handlePassport} style={{width:'320px'}}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                required
                className="form-control mt-1"
                placeholder="e.g rXhAz29$%1"
                onChange={this.handlePasswordChange} style={{width:'320px'}}
              />
            </div>
            <div className="form-group mt-3">
              <label>Confirm Password</label>
              <input
                type="password"
                required
                className="form-control mt-1"
                placeholder=""
                onChange={this.handleConfirmPass} style={{width:'320px'}}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Already have an account?{" "}
              <Link to="/CustomerSignin">
                <a> Login</a>
              </Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Signup);
