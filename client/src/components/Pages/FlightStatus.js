import React from 'react'
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import Sidebar from './Sidebar';
import './styles/Tables.css'
const FlightStatus = () => {
  const [data,setData]=useState([]);
  
  const loadData =async()=>{
    const response= await Axios.get('http://localhost:5000/flightStatus/api/get');
    setData(response.data);
  }

  useEffect(()=>{
    loadData();
  },[]);


  return (
    <>
      <Sidebar/>
      <div>
        <button style={{width:"120px", marginLeft:"810px",visibility:"hidden"}} className='btn btn-client'></button>
        <table className='styled-table'>
          <thead>
            <tr>
              <th style={{textAlign:'center'}}>S. No</th>
              <th style={{textAlign:'center'}}>Flight Status ID</th>
              <th style={{textAlign:'center'}}>Status</th>
              <th style={{textAlign:'center'}}>Action</th>
            </tr>
            </thead>
            <tbody>
              {data.map((item,index)=>{
                return(
                  <tr key={index}>
                    <th scope='row'>{index+1}</th>
                    <td>{item.flightStatus_id}</td>
                    <td>{item.status}</td>
                    <td>
                      <Link to={`/ViewFlightStatus/${item.flightStatus_id}`}>
                        <button className='btn btn-view'>View</button>
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
        </table>

      </div>
    </>
  )
}

export default FlightStatus