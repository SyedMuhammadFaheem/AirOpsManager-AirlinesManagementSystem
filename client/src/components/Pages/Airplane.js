import React from 'react'
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import {toast} from 'react-toastify';
import Sidebar from './Sidebar';
import './styles/Tables.css'
const Airplane = () => {
  const [data,setData]=useState([]);
  
  const loadData =async()=>{
    const response= await Axios.get('http://localhost:5000/airplane/api/get');
    setData(response.data);
  }

  useEffect(()=>{
    loadData();
  },[]);


  const delAirplane=(id)=>{
    if(window.confirm('Do you really want to delete Airplane with Airplane ID '+ id +'?'))
    {
      Axios.delete(`http://localhost:5000/airplane/api/remove/${id}`);
      toast.success('Airplane deleted successfully!');
      setTimeout(()=> loadData(),500);
    }

  }
  
  return (
    <>
      <Sidebar/>
      <div>
        <Link to='/AddEditAirplane'>
          <button style={{width:"120px", marginLeft:"810px"}} className='btn btn-client'>Add Airplane</button>
        </Link>
        <table className='styled-table'>
          <thead>
            <tr>
              <th style={{textAlign:'center'}}>S. No</th>
              <th style={{textAlign:'center'}}>Airplane ID</th>
              <th style={{textAlign:'center'}}>Max Seats</th>
              <th style={{textAlign:'center'}}>Action</th>
            </tr>
            </thead>
            <tbody>
              {data.map((item,index)=>{
                return(
                  <tr key={index}>
                    <th scope='row'>{index+1}</th>
                    <td>{item.airplane_id}</td>
                    <td>{item.max_seats}</td>
                    <td>
                      <Link to={`/UpdateAirplane/${item.airplane_id}`}>
                        <button className='btn btn-edit'>Edit</button>
                      </Link>
                        <button className='btn btn-delete' onClick={()=> delAirplane(item.airplane_id)}>Delete</button>
                      <Link to={`/ViewAirplane/${item.airplane_id}`}>
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

export default Airplane