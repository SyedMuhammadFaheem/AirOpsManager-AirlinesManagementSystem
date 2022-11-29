import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import "./styles/AddEdit.css";
import Axios from "axios";
import { toast } from "react-toastify";
const initialState = {
  client_id: "",
  airport_code: "",
  ticket_id: "",
  flight_no: "",
  admin_id: "",
  fares: "",
};
const EditBooking = () => {
  const [state, setState] = useState(initialState);
  const {
    client_id,
    airport_code,
    ticket_id,
    flight_no,
    admin_id,
    fares,
  } = state;

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    Axios.get(`http://localhost:5000/booking/api/get/${id}`).then((resp) =>
      setState({ ...resp.data[0] })
    );
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !client_id ||
      !ticket_id ||
      !flight_no ||
      !admin_id ||
      !airport_code ||
      !fares
    )
      toast.error("Required Fields are empty");
    else {
      Axios.put(`http://localhost:5000/booking/api/update/${id}`, {
        client_id,
        airport_code,
        ticket_id,
        flight_no,
        admin_id,
        fares,
      })
        .then((response) => {
          setState({
            client_id: "",
            airport_code: "",
            ticket_id: "",
            flight_no: "",
            admin_id: "",
            fares: "",
          });
          if (response.data.err) console.log(response.data.err);
        })
        .catch((err) => toast.error(err.response.data));
      toast.success("Booking Updated Successfully");
      setTimeout(() => history.push("/Booking"), 500);
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
        <label htmlFor="ticket-id">Client ID</label> //yahan se start kro
        <input
          type="text"
          name="ticket_id"
          value={ticket_id || ""}
          placeholder="ID"
          required
          onChange={handleInputChange}
        />

        <label htmlFor="seat-no">Seat No</label>
        <input
          type="text"
          name="seat_no"
          value={seat_no || ""}
          placeholder="Seat No"
          onChange={handleInputChange}
        />

        <label htmlFor="departure-time">Departure Time</label>
        <input
          type="text"
          name="departure_time"
          value={departure_time || ""}
          placeholder="Departure Time"
          onChange={handleInputChange}
        />

        <label htmlFor="gate-no">Gate No</label>
        <input
          type="text"
          name="gate_no"
          value={gate_no || ""}
          placeholder="Gate No"
          onChange={handleInputChange}
        />

        <label htmlFor="airport-code">Airport Code</label>
        <input
          type="text"
          name="airport_code"
          value={airport_code || ""}
          placeholder="Airport Code"
          onChange={handleInputChange}
        />
        <input type="submit" value={"Update"} />
        <Link to="/Ticket">
          <input type="button" value="Back"></input>
        </Link>
      </form>
    </div>
  );
};

export default EditBooking;
