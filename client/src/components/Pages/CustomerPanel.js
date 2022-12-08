import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';
import Axios from 'axios';
import CustomerNavbar from "../CustomerNavbar";
import MovingText from "react-moving-text";
import './styles/CustomerPanel.css';
const CustomerPanel = () => {
  const [user,setUser]=useState({});
  const {id}=useParams();
  useEffect(() => {
    Axios
      .get(`http://localhost:5000/CustomerPanel/${id}`)
      .then((resp) => setUser({ ...resp.data[0] }));
  }, [id]);
  return (
    <div className='bg-pic'>
      <CustomerNavbar />
      <MovingText
        type="popIn"
        duration="1600ms"
        delay="0s"
        direction="normal"
        timing="ease-in"
        iteration="5"
        fillMode="none"
      >
        <h1 style={{textAlign:"center", fontSize:"80px", marginTop:"15%", fontWeight:'800', color:'white'}}>Welcome, {user.fname}!</h1>
      </MovingText>
    </div>
  );
};

export default CustomerPanel;
