import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import "./styles/AddEdit.css";
import apiClient from '../../api/client';
import { toast } from "react-toastify";
const initialState = {
  airplane_id: "",
  max_seats: "",
};
const AddEditAirplane = () => {
  const [state, setState] = useState(initialState);
  const { airplane_id, max_seats } = state;

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    apiClient
      .get(`/airplane/api/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !airplane_id ||
      !max_seats
    )
      toast.error("Required Fields are empty");
    else {
      if(!id)
      {

        apiClient
          .post("/airplane/api/post", {
            airplane_id,
            max_seats,
          })
          .then(() => {
            setState({ airplane_id: "", max_seats: "" });
            toast.success('Airplane Added Successfully');
          })
          .catch((err) => toast.error(err.response.data));
      }
      else{
        apiClient
          .put(`/airplane/api/update/${id}`, {
            airplane_id,
            max_seats,
          })
          .then(() => {
            setState({ airplane_id: "", max_seats: "" });
            toast.success('Airplane Updated Successfully');
          })
          .catch((err) => toast.error(err.response.data));
      }
      setTimeout(() => history.push("/Airplane"), 500);
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
        <label htmlFor="airplane-id">Airplane ID</label>
        <input
          type="text" name="airplane_id" value={airplane_id || ""}
          placeholder="ID"
          required
          onChange={handleInputChange}
        />

        <label htmlFor="max-seats">Max Seats</label>
        <input
          type="text" name="max_seats" value={max_seats || ""}
          placeholder="Max Seats"
          onChange={handleInputChange}
        />

        
        <input type="submit" value={id ? "Update" : "Add"} />
        <Link to="/Airplane">
          <input type="button" value="Back"></input>
        </Link>
      </form>
    </div>
  );
};

export default AddEditAirplane;
