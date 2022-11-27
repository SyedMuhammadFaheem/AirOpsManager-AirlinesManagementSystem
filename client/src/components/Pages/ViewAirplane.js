import React,{useState,useEffect} from 'react'
import {useParams,Link} from 'react-router-dom';
import Axios from 'axios';
import './styles/View.css'

const ViewAirplane = () => {
  const [user,setUser]=useState({});
  const {id}=useParams();
  useEffect(() => {
    Axios
      .get(`http://localhost:5000/airplane/api/get/${id}`)
      .then((resp) => setUser({ ...resp.data[0] }));
  }, [id]);
  return (
  
    <div style={{marginTop:'150px'}}>
      <div className='card'>
        <div className='card-header'>
          <p>Airplane Detail</p>
        </div>
        <div className='container'>
          <strong>Airplane ID: </strong>
          <span>{id}</span>
          <br/>
          <br/>
          <strong>Max Seats: </strong>
          <span>{user.max_seats}</span>
          <br/>
          <br/>
          
          <Link to='/Airplane'>
            <div className='btn btn-edit'>Back</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ViewAirplane