import React,{useState,useEffect} from 'react'
import {useParams,Link} from 'react-router-dom';
import Axios from 'axios';
import './styles/View.css'

const ViewSchedule = () => {
  const [user,setUser]=useState({});
  const {id}=useParams();
  useEffect(() => {
    Axios
      .get(`http://localhost:5000/schedule/api/get/${id}`)
      .then((resp) => setUser({ ...resp.data[0] }));
  }, [id]);
  return (
  
    <div style={{marginTop:'150px'}}>
      <div className='card'>
        <div className='card-header'>
          <p>Schedule Detail</p>
        </div>
        <div className='container'>
          <strong>Schedule ID: </strong>
          <span>{id}</span>
          <br/>
          <br/>
          <strong>Departure Time: </strong>
          <span>{user.departure_time}</span>
          <br/>
          <br/>
          <strong>Arrival Time: </strong>
          <span>{user.arrival_time}</span>
          <br/>
          <br/>
          <strong>Duration Time: </strong>
          <span>{user.duration_time}</span>
          <br/>
          <br/>
          
          <Link to='/Schedule'>
            <div className='btn btn-edit'>Back</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ViewSchedule