import React,{useState,useEffect} from 'react'
import {useParams,Link} from 'react-router-dom';
import Axios from 'axios';
import './styles/View.css'

const ViewFlightStatus = () => {
  const [user,setUser]=useState({});
  const {id}=useParams();
  useEffect(() => {
    Axios
      .get(`http://localhost:5000/flightStatus/api/get/${id}`)
      .then((resp) => setUser({ ...resp.data[0] }));
  }, [id]);
  return (
  
    <div style={{marginTop:'150px'}}>
      <div className='card'>
        <div className='card-header'>
          <p>Flight Status Detail</p>
        </div>
        <div className='container'>
          <strong>Flight Status ID: </strong>
          <span>{id}</span>
          <br/>
          <br/>
          <strong>Status: </strong>
          <span>{user.status}</span>
          <br/>
          <br/>
          <Link to='/FlightStatus'>
            <div className='btn btn-edit'>Back</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ViewFlightStatus