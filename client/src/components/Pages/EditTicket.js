import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import "./styles/AddEdit.css";
import Axios from "axios";
import { toast } from "react-toastify";
const initialState = {
  ticket_id: "",
  seat_no: "",
  departure_time: "",
  gate_no: "",
  airport_code: "",
};
const EditTicket = () => {
  const [state, setState] = useState(initialState);
  const { ticket_id, seat_no, departure_time, gate_no, airport_code } = state;

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    Axios.get(`http://localhost:5000/ticket/api/get/${id}`).then((resp) =>
      setState({ ...resp.data[0] })
    );
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!ticket_id || !seat_no || !departure_time || !gate_no || !airport_code)
      toast.error("Required Fields are empty");
    else {
      Axios.put(`http://localhost:5000/ticket/api/update/${id}`, {
        ticket_id,
        seat_no,
        departure_time,
        gate_no,
        airport_code,
      })
        .then((response) => {
          setState({
            ticket_id: "",
            seat_no: "",
            departure_time: "",
            gate_no: "",
            airport_code: "",
          });
          if (response.data.err) console.log(response.data.err);
        })
        .catch((err) => toast.error(err.response.data));
      toast.success("Ticket Updated Successfully");
      setTimeout(() => history.push("/Ticket"), 500);
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
        <label htmlFor="ticket-id">Ticket ID</label>
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

export default EditTicket;
