import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import "./styles/AddEdit.css";
import Axios from "axios";
import { toast } from "react-toastify";
const initialState = {
  schedule_id: "",
  departure_time: "",
  arrival_time: "",
  duration_time: "",
};
const AddEditSchedule = () => {
  const [state, setState] = useState(initialState);
  const { schedule_id, departure_time, arrival_time, duration_time } = state;

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    Axios.get(`http://localhost:5000/schedule/api/get/${id}`).then((resp) =>
      setState({ ...resp.data[0] })
    );
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!schedule_id || !departure_time || !arrival_time || !duration_time)
      toast.error("Required Fields are empty");
    else {
      if (!id) {
        Axios.post("http://localhost:5000/api/post", {
          schedule_id,
          departure_time,
          arrival_time,
          duration_time,
        })
          .then((response) => {
            setState({
                schedule_id: "",
                departure_time: "",
                arrival_time: "",
                duration_time: "",
            });
            if (response.data.err) console.log(response.data.err);
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Schedule Added Successfully");
      } else {
        Axios.put(`http://localhost:5000/schedule/api/update/${id}`, {
            schedule_id,
            departure_time,
            arrival_time,
            duration_time,
        })
          .then((response) => {
            setState({
                schedule_id: "",
                departure_time: "",
                arrival_time: "",
                duration_time: "",
            });
            if (response.data.err) console.log(response.data.err);
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Schedule Updated Successfully");
      }
      setTimeout(() => history.push("/Schedule"), 500);
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
        <label htmlFor="schedule-id">Schedule ID</label>
        <input
          type="text"
          name="schedule_id"
          value={schedule_id || ""}
          placeholder="ID"
          required
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

        <label htmlFor="arrival-time">Arrival Time</label>
        <input
          type="text"
          name="arrival_time"
          value={arrival_time || ""}
          placeholder="Arrival Time"
          onChange={handleInputChange}
        />

        <label htmlFor="duration-time">Duration Time</label>
        <input
          type="text"
          name="duration_time"
          value={duration_time || ""}
          placeholder="Duration Time"
          onChange={handleInputChange}
        />

        <input type="submit" value={id ? "Update" : "Add"} />
        <Link to="/Schedule">
          <input type="button" value="Back"></input>
        </Link>
      </form>
    </div>
  );
};

export default AddEditSchedule;
