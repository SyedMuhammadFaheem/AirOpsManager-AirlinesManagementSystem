import React,{Component} from 'react'
import Axios from 'axios'
import './styles/Signin.css';
import { Link, withRouter } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
class Signin extends Component {
  Swal=withReactContent(Swal)
  constructor(props)
  {
    super(props);
    this.state = {
      usernameLogin: '',
      passwordLogin: '',
    };
  }

  handleUsernameChange = (event) => {
    this.setState({
      usernameLogin: event.target.value,
    });
  };

  handlePasswordChange = (event) => {
    this.setState({
      passwordLogin: event.target.value,
    });
  };
  
  Login=(event)=>{
    event.preventDefault();
    Axios.post('http://localhost:5000/login', {
      username:this.state.usernameLogin,
      password:this.state.passwordLogin,
    }).then((response)=>{
    if(response.data.msg)
    {
      Swal.fire(
        'Invalid Login!',
        '',
        'error'
      )
    }
    else
    {
      
      Swal.fire(
        'Login Success!',
        '',
        'success'
      )
        setTimeout(()=>this.props.history.push("/AdminPanel"),500); 
    }
  })

  }
  render (){
    return(
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={this.Login}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email" onChange={this.handleUsernameChange}
              className="form-control mt-1"
              placeholder="e.g John@example.com" required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password" onChange={this.handlePasswordChange} 
              className="form-control mt-1"
              placeholder="e.g rXhAz29$%1" required
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Not Registered? <Link to="/sign-up"><a href="">Signup</a></Link>
          </p>
        </div>
      </form>
    </div>
    );
    }
};

export default withRouter(Signin)