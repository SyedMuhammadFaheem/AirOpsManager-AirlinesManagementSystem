import React,{useState,useEffect} from 'react'
import {useParams,Link} from 'react-router-dom';
import Axios from 'axios';
import './styles/View.css'

const ViewFlight = () => {
  const [user,setUser]=useState({});
  const {id}=useParams();
  useEffect(() => {
    Axios
      .get(`http://localhost:5000/flight/api/get/${id}`)
      .then((resp) => setUser({ ...resp.data[0] }));
  }, [id]);
  return (
  
    <div style={{marginTop:'150px'}}>
      <div className='card'>
        <div className='card-header'>
          <p>Flight Detail</p>
        </div>
        <div className='container'>
          <strong>Flight No: </strong>
          <span>{id}</span>
          <br/>
          <br/>
          <strong>Schedule ID: </strong>
          <span>{user.schedule_id}</span>
          <br/>
          <br/>
          <strong>Flight Status ID: </strong>
          <span>{user.flightStatus_id}</span>
          <br/>
          <br/>
          <strong>Airplane ID: </strong>
          <span>{user.airplane_id}</span>
          <br/>
          <br/>
          
          <Link to='/Flight'>
            <div className='btn btn-edit'>Back</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ViewFlight