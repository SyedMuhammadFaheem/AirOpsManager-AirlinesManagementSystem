import React,{useState,useEffect} from 'react'
import {useParams,Link} from 'react-router-dom';
import Axios from 'axios';
import './styles/View.css'

const ViewReviews = () => {
  const [user,setUser]=useState({});
  const {id}=useParams();
  useEffect(() => {
    Axios
      .get(`http://localhost:5000/reviews/api/get/${id}`)
      .then((resp) => setUser({ ...resp.data[0] }));
  }, [id]);
  return (
  
    <div style={{marginTop:'150px'}}>
      <div className='card'>
        <div className='card-header'>
          <p>Review Detail</p>
        </div>
        <div className='container'>
          <strong>Client ID: </strong>
          <span>{id}</span>
          <br/>
          <br/>
          <strong>Review: </strong>
          <span>{user.review}</span>
          <br/>
          <br/>
          <Link to='/Reviews'>
            <div className='btn btn-edit'>Back</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ViewReviews