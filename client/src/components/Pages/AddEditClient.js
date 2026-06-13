import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import "./styles/AddEdit.css";
import apiClient from '../../api/client';
import { toast } from "react-toastify";
const initialState = {
  client_id: "",
  fname: "",
  mname: "",
  lname: "",
  phone: "",
  email: "",
  passport: "",
};
const AddEditClient = () => {
  const [state, setState] = useState(initialState);
  const { client_id, fname, mname, lname, phone, email, passport } = state;

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    apiClient
      .get(`/api/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !client_id ||
      !fname ||
      !mname ||
      !lname ||
      !phone ||
      !email ||
      !passport
    )
      toast.error("Required Fields are empty");
    else {
      if(!id)
      {

        apiClient
          .post("/api/post", {
            client_id,
            fname,
            mname,
            lname,
            phone,
            email,
            passport,
          })
          .then(() => {
            setState({ client_id: "", fname: "", mname: "", lname: "", phone: "", email: "", passport: "" });
            toast.success('Client Added Successfully');
          })
          .catch((err) => toast.error(err.response.data));
      }
      else{
        apiClient
          .put(`/api/update/${id}`, {
            client_id,
            fname,
            mname,
            lname,
            phone,
            email,
            passport,
          })
          .then(() => {
            setState({ client_id: "", fname: "", mname: "", lname: "", phone: "", email: "", passport: "" });
            toast.success('Client Updated Successfully');
          })
          .catch((err) => toast.error(err.response.data));
      }
      setTimeout(() => history.push("/Client"), 500);
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
        <label htmlFor="client-id">Client ID</label>
        <input
          type="text" name="client_id" value={client_id || ""}
          placeholder="ID"
          required
          onChange={handleInputChange}
        />

        <label htmlFor="fname">First Name</label>
        <input
          type="text" name="fname" value={fname || ""}
          placeholder="First Name"
          onChange={handleInputChange}
        />

        <label htmlFor="mname">Middle Name</label>
        <input
          type="text" name="mname" value={mname || ""}
          placeholder="Middle Name"
          onChange={handleInputChange}
        />

        <label htmlFor="lname">Last Name</label>
        <input
          type="text" name="lname" value={lname || ""}
          placeholder="Last Name"
          onChange={handleInputChange}
        />

        <label htmlFor="phone">Phone</label>
        <input
          type="number" name="phone" value={phone || ""}
          placeholder="Phone"
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email" name="email" value={email || ""}
          placeholder="Email"
          onChange={handleInputChange}
        />

        <label htmlFor="passport">Passport</label>
        <input
          type="text" name="passport" value={passport || ""}
          placeholder="Passport"
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Add"} />
        <Link to="/Client">
          <input type="button" value="Back"></input>
        </Link>
      </form>
    </div>
  );
};

export default AddEditClient;
