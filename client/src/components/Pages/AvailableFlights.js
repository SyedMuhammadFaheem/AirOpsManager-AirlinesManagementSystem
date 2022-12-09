import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import "./styles/Tables.css";
const initialState={
  fb_id:"",
  departure:"",
  arrival:"",
  departureDate:"",
  returnDate:"",
  class:"",
  price:"",
}
const AvailableFlights = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await Axios.get("http://localhost:5000/SearchFlights");
    initialState.fb_id=response.data[0].fb_id;
    initialState.departure=response.data[0].departure;
    initialState.arrival=response.data[0].arrival;
    initialState.departureDate=response.data[0].departureDate;
    initialState.returnDate=response.data[0].returnDate;
    initialState.class=response.data[0].class;
    initialState.price=response.data[0].price;
    console.log('fb_id: ' + initialState.fb_id)

    console.log('return: ' + initialState.returnDate)
    const Returnresponse=await Axios.post("http://localhost:5000/AvailableFlights",{
      departureDate:initialState.departureDate,
      returnDate:initialState.returnDate,
      fares:initialState.price,
    });
    console.log(Returnresponse.data)
    setData(Returnresponse.data)
    
  };



  useEffect(() => {
    loadData();
  }, []);
  const { id } = useParams();


  const voidFunc=()=>{

  }
  return (
    <div className="bg-pic">
      <button
        style={{ width: "120px", marginLeft: "810px", visibility: "hidden" }}
        className="btn btn-client"
      ></button>
      <table className="styled-table">
        <thead>
          <tr >
            <th style={{ textAlign: "center" }}>Airplane ID</th>
            <th style={{ textAlign: "center" }}>Max Seats</th>
            <th style={{ textAlign: "center" }}>Departure Time</th>
            <th style={{ textAlign: "center" }}>Arrival Time</th>
            <th style={{ textAlign: "center" }}>Flight Status</th>
            <th style={{ textAlign: "center" }}>Fare</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr style={{backgroundColor:'white'}} key={index}>
                <td>{item.airplane_id}</td>
                <td>{item.max_seats}</td>
                <td>{item.departure_time}</td>
                <td>{item.arrival_time}</td>
                <td>{item.status}</td>
                <td>$ {item.fares}</td>
                <td>
                  <Link to={id>0 ? `/Invoice/${item.schedule_id+id}` :  '/CustomerSignin'}>
                    <button className={id>0 ? "btn btn-book" : "btn btn-login"}  style={{fontSize:'18px'}}>
                      {id>0 ? "Book" : "Login"}
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableFlights;
