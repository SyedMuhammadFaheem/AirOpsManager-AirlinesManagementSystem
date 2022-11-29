import React from 'react'
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import {toast} from 'react-toastify';
import Sidebar from './Sidebar';
import './styles/Tables.css'
const Client = () => {
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
        <table className='styled-table'>
          <thead>
            <tr>
              <th style={{textAlign:'center'}}>S. No</th>
              <th style={{textAlign:'center'}}>Client ID</th>
              <th style={{textAlign:'center'}}>Airport Code</th>
              <th style={{textAlign:'center'}}>Ticket ID</th>
              <th style={{textAlign:'center'}}>Flight No</th>
              <th style={{textAlign:'center'}}>Admin ID</th>
              <th style={{textAlign:'center'}}>Fares</th>
              <th style={{textAlign:'center'}}>Action</th>
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
                    <td>{item.admin_id}</td>
                    <td>{item.fares}</td>
                    <td>
                      <Link to={`/UpdateBooking/${item.client_id}`}>
                        <button className='btn btn-edit'>Edit</button>
                      </Link>
                      <Link to={`/ViewBooking/${item.client_id}`}>
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

export default Client