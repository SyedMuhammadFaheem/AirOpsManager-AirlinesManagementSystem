import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import "./styles/Tables.css";
const AvailableFlights = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await Axios.get("http://localhost:5000/api/get");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);
  const { id } = useParams();
  return (
    <>
      <button
        style={{ width: "120px", marginLeft: "810px", visibility: "hidden" }}
        className="btn btn-client"
      ></button>
      <table className="styled-table">
        <thead>
          <tr>
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
              <tr key={index}>
                <td>{item.airplane_id}</td>
                <td>{item.max_seats}</td>
                <td>{item.departure_time}</td>
                <td>{item.arrival_time}</td>
                <td>{item.status}</td>
                <td>{item.fares}</td>
                <td>
                  <Link to={id ? "" : "/CustomerSignin"}>
                    <button className={id ? "btn btn-book" : "btn btn-login"}>
                      {id ? "Book" : "Login"}
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default AvailableFlights;
