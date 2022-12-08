import React from 'react'
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import {toast} from 'react-toastify';
import Sidebar from './Sidebar';
import './styles/Tables.css'
const Booking = () => {
  const [data,setData]=useState([]);
  
  const loadData =async()=>{
    const response= await Axios.get('http://localhost:5000/booking/api/get');
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
              <th style={{textAlign:'center'}}>Client ID</th>
              <th style={{textAlign:'center'}}>Airport Code</th>
              <th style={{textAlign:'center'}}>Ticket ID</th>
              <th style={{textAlign:'center'}}>Flight No</th>
              <th style={{textAlign:'center'}}>Fares</th>
            </tr>
            </thead>
            <tbody>
              {data.map((item,index)=>{
                return(
                  <tr key={index}>
                    <th scope='row'>{index+1}</th>
                    <td>{item.client_id}</td>
                    <td>{item.airport_code}</td>
                    <td>{item.ticket_id}</td>
                    <td>{item.flight_no}</td>
                    <td>{item.fares}</td>
                  </tr>
                )
              })}
            </tbody>
        </table>

      </div>
    </>
  )
}

export default Booking