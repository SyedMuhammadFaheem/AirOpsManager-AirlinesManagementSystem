import React,{useState,useEffect} from 'react'
import {useParams,Link} from 'react-router-dom';
import Axios from 'axios';
import './styles/View.css'

const ViewTicket = () => {
  const [user,setUser]=useState({});
  const {id}=useParams();
  useEffect(() => {
    Axios
      .get(`http://localhost:5000/ticket/api/get/${id}`)
      .then((resp) => setUser({ ...resp.data[0] }));
  }, [id]);
  return (
  
    <div style={{marginTop:'150px'}}>
      <div className='card'>
        <div className='card-header'>
          <p>Ticket Detail</p>
        </div>
        <div className='container'>
          <strong>Ticket ID: </strong>
          <span>{id}</span>
          <br/>
          <br/>
          <strong>Seat No: </strong>
          <span>{user.seat_no}</span>
          <br/>
          <br/>
          <strong>Departure Time: </strong>
          <span>{user.departure_time}</span>
          <br/>
          <br/>
          <strong>Gate No: </strong>
          <span>{user.gate_no}</span>
          <br/>
          <br/>
          <strong>Airport Code: </strong>
          <span>{user.airport_code}</span>
          <br/>
          <br/>
          
          <Link to='/Ticket'>
            <div className='btn btn-edit'>Back</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ViewTicket