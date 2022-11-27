import React from 'react'
import {useParams,Link} from 'react-router-dom';
import './styles/View.css'

const ViewGates = () => {
  const {id}=useParams();
  return (
    <div style={{marginTop:'150px'}}>
      <div className='card'>
        <div className='card-header'>
          <p>Gates Detail</p>
        </div>
        <div className='container'>
          <strong>Gate No: </strong>
          <span>{id}</span>
          <br/>
          <br/>
          <Link to='/Gates'>
            <div className='btn btn-edit'>Back</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ViewGates