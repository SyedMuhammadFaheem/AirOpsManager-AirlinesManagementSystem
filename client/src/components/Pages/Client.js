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
    const response= await Axios.get('http://localhost:5000/api/get');
    setData(response.data);
  }

  useEffect(()=>{
    loadData();
  },[]);


  const delClient=(id)=>{
    console.log(id)
    if(window.confirm('Do you really want to delete Client with Client ID '+ id +'?'))
    {
      Axios.delete(`http://localhost:5000/api/remove/${id}`);
      toast.success('Client deleted successfully!');
      setTimeout(()=> loadData(),500);
    }

  }
  
  return (
    <>
      <Sidebar/>
      <div>
        <Link to='/AddEditClient'>
          <button className='btn btn-client'>Add Client</button>
        </Link>
        <table className='styled-table'>
          <thead>
            <tr>
              <th style={{textAlign:'center'}}>S. No</th>
              <th style={{textAlign:'center'}}>Client ID</th>
              <th style={{textAlign:'center'}}>First Name</th>
              <th style={{textAlign:'center'}}>Middle Name</th>
              <th style={{textAlign:'center'}}>Last Name</th>
              <th style={{textAlign:'center'}}>Phone</th>
              <th style={{textAlign:'center'}}>Email</th>
              <th style={{textAlign:'center'}}>Passport</th>
              <th style={{textAlign:'center'}}>Action</th>
            </tr>
            </thead>
            <tbody>
              {data.map((item,index)=>{
                return(
                  <tr key={index}>
                    <th scope='row'>{index+1}</th>
                    <td>{item.client_id}</td>
                    <td>{item.fname}</td>
                    <td>{item.mname}</td>
                    <td>{item.lname}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.passport}</td>
                    <td>
                      <Link to={`/Update/${item.client_id}`}>
                        <button className='btn btn-edit'>Edit</button>
                      </Link>
                        <button className='btn btn-delete' onClick={()=> delClient(item.client_id)}>Delete</button>
                      <Link to={`/View/${item.client_id}`}>
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