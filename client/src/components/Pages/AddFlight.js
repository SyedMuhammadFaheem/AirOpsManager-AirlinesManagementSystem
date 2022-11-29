import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import "./styles/AddEdit.css";
import Axios from "axios";
import { toast } from "react-toastify";
const initialState = {
  flight_no: "",
  schedule_id: "",
  flightStatus_id: "",
  airplane_id: "",
};
const AddFlight = () => {
  const [state, setState] = useState(initialState);
  const { flight_no, schedule_id, flightStatus_id, airplane_id } = state;

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!flight_no || !schedule_id || !flightStatus_id || !airplane_id)
      toast.error("Required Fields are empty");
    else {
      Axios.post("http://localhost:5000/flight/api/post", {
        flight_no,
        schedule_id,
        flightStatus_id,
        airplane_id,
      })
        .then((response) => {
          setState({
            flight_no: "",
            schedule_id: "",
            flightStatus_id: "",
            airplane_id: "",
          });
          if (response.data.err) console.log(response.data.err);
        })
        .catch((err) => toast.error(err.response.data));
      toast.success("Flight Added Successfully");

      setTimeout(() => history.push("/Flight"), 500);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "600px",
          alignContent: "center",
          backgroundColor: "grey",
          borderRadius: "10px",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="flight-no">Flight No</label>
        <input
          type="text"
          name="flight_no"
          value={flight_no}
          placeholder="Flight No"
          required
          onChange={handleInputChange}
        />

        <label htmlFor="schedule-id">Schedule ID</label>
        <input
          type="text"
          name="schedule_id"
          value={schedule_id}
          placeholder="Schedule ID"
          onChange={handleInputChange}
        />

        <label htmlFor="flight-status-id">Flight Status ID</label>
        <input
          type="text"
          name="flightStatus_id"
          value={flightStatus_id || ""}
          placeholder="Flight Status ID"
          onChange={handleInputChange}
        />

        <label htmlFor="airplane-id">Airplane ID</label>
        <input
          type="text"
          name="airplane_id"
          value={airplane_id || ""}
          placeholder="Airplane ID"
          onChange={handleInputChange}
        />
        <input type="submit" value="Add" />
        <Link to="/Flight">
          <input type="button" value="Back"></input>
        </Link>
      </form>
    </div>
  );
};

export default AddFlight;
