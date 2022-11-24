import React,{useState,useEffect} from 'react'
import {useParams,Link} from 'react-router-dom';
import Axios from 'axios';
import './styles/View.css'

const ViewClient = () => {
  const [user,setUser]=useState({});
  const {id}=useParams();
  useEffect(() => {
    Axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => setUser({ ...resp.data[0] }));
  }, [id]);
  return (
  
    <div style={{marginTop:'150px'}}>
      <div className='card'>
        <div className='card-header'>
          <p>Client Detail</p>
        </div>
        <div className='container'>
          <strong>Client ID: </strong>
          <span>{id}</span>
          <br/>
          <br/>
          <strong>First Name: </strong>
          <span>{user.fname}</span>
          <br/>
          <br/>
          <strong>Middle Name: </strong>
          <span>{user.mname}</span>
          <br/>
          <br/>
          <strong>Last Name: </strong>
          <span>{user.lname}</span>
          <br/>
          <br/>
          <strong>Phone: </strong>
          <span>{user.phone}</span>
          <br/>
          <br/>
          <strong>Email: </strong>
          <span>{user.email}</span>
          <br/>
          <br/>
          <strong>Passport: </strong>
          <span>{user.passport}</span>
          <br/>
          <br/>
          <Link to='/Client'>
            <div className='btn btn-edit'>Back</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ViewClient