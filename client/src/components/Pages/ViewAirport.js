import React,{useState,useEffect} from 'react'
import {useParams,Link} from 'react-router-dom';
import Axios from 'axios';
import './styles/View.css'

const ViewAirport = () => {
  const [user,setUser]=useState({});
  const {id}=useParams();
  useEffect(() => {
    Axios
      .get(`http://localhost:5000/airport/api/get/${id}`)
      .then((resp) => setUser({ ...resp.data[0] }));
  }, [id]);
  return (
  
    <div style={{marginTop:'150px'}}>
      <div className='card'>
        <div className='card-header'>
          <p>Airport Detail</p>
        </div>
        <div className='container'>
          <strong>Airport Code: </strong>
          <span>{id}</span>
          <br/>
          <br/>
          <strong>Airport Name: </strong>
          <span>{user.airport_name}</span>
          <br/>
          <br/>
          <strong>City: </strong>
          <span>{user.city}</span>
          <br/>
          <br/>
          <strong>Gate No: </strong>
          <span>{user.gate_no}</span>
          <br/>
          <br/>
          <Link to='/Airport'>
            <div className='btn btn-edit'>Back</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ViewAirport