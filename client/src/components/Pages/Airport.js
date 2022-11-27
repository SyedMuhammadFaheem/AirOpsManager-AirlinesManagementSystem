import React from 'react'
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import Sidebar from './Sidebar';
import './styles/Tables.css'
const Airport = () => {
  const [data,setData]=useState([]);
  
  const loadData =async()=>{
    const response= await Axios.get('http://localhost:5000/airport/api/get');
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
              <th style={{textAlign:'center'}}>Airport Code</th>
              <th style={{textAlign:'center'}}>Airport Name</th>
              <th style={{textAlign:'center'}}>City</th>
              <th style={{textAlign:'center'}}>Gate No</th>
              <th style={{textAlign:'center'}}>Action</th>
            </tr>
            </thead>
            <tbody>
              {data.map((item,index)=>{
                return(
                  <tr key={index}>
                    <th scope='row'>{index+1}</th>
                    <td>{item.airport_code}</td>
                    <td>{item.airport_name}</td>
                    <td>{item.city}</td>
                    <td>{item.gate_no}</td>
                    <td>
                      <Link to={`/ViewAirport/${item.airport_code}`}>
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

export default Airport