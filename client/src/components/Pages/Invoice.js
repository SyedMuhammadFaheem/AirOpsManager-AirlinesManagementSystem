import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Axios from "axios";
import "./styles/Invoice.css";
import Swall from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const initialState = {
  sc_id: "",
  cl_id: "",
  price: "",
};
const Invoice = () => {
  const Swal=withReactContent(Swall)
  const { id } = useParams();
  const [data, setData] = useState({});
  const [user, setUser] = useState({});
  const history = useHistory();
  const loadData = async () => {
    const Returnresponse = await Axios.get(
      "http://localhost:5000/invoicefares"
    );
    setUser(Returnresponse.data[0]);
    
    initialState.departure = user.departure;
  };

  useEffect(() => {
    initialState.sc_id = id.slice(0, 2);
    initialState.cl_id = id.slice(2, 4);
    Axios.post("http://localhost:5000/UpdateFlightBooking",{
        id:initialState.sc_id,
    })
    Axios.get(`http://localhost:5000/invoice/${initialState.cl_id}`).then((resp) =>
      setData({ ...resp.data[0] })
    );
    loadData();
  }, []);
  const foo = async () => {
    await Axios.post("http://localhost:5000/invoiceconfirm", {
      id: initialState.sc_id,
      departure: user.departure,
    });
    await Axios.post("http://localhost:5000/invoiceconfirmAgain", {
      id: initialState.cl_id,
      flight_no: user.flight_no,
      fares: user.price.substr(2, 6),
    });
    Axios.delete('http://localhost:5000/removeSearch');
    Swal.fire("Ticket Booked Successfully!", "", "success");
    setTimeout(() => history.push(`/BoardingPass/${id.slice(2, 4)}`), 500);
  };
  return (
    <div className="bg-image">
      <div className="container d-flex justify-content-center mt-5">
        <div className="card" style={{ width: "600px", border: "none" }}>
          <div>
            <div className="d-flex pt-3 pl-3">
              <div>
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/visa.png"
                  width="80"
                  height="90"
                />
              </div>
              <div className="mt-3 pl-2">
                <span
                  className="name"
                  style={{
                    marginLeft: "100px",
                    marginTop: "10px",
                    fontSize: "20px",
                    marginBottom: "40px",
                  }}
                >
                  {data.fname} {data.lname}
                </span>
                <div>
                  <span
                    className="cross"
                    style={{
                      fontSize: "15px",
                      marginTop: "50px",
                      marginLeft: "6px",
                    }}
                  >
                    &#10005&#10005&#10005&#10005
                  </span>
                  <span className="pin ml-2">8880</span>
                </div>
              </div>
            </div>

            <div className="py-2  px-3">
              <div className="first pl-2 d-flex py-2">
                <div className="form-check">
                  <input
                    type="radio"
                    name="optradio"
                    className="form-check-input mt-3 dot"
                    checked
                  />
                </div>
                <div className="border-left pl-2">
                  <span className="head" style={{ fontSize: "20px" }}>
                    Total amount due
                  </span>
                  <div>
                    <span className="amount">{user.price}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-2  px-3">
              <div className="second pl-2 d-flex py-2">
                <div className="form-check">
                  <input
                    type="radio"
                    name="optradio"
                    className="form-check-input mt-3 dot"
                  />
                </div>
                <div className="border-left pl-2">
                  <span className="head" style={{ fontSize: "20px" }}>
                    Other amount
                  </span>
                  <div className="d-flex">
                    <span
                      className="dollar"
                      style={{
                        marginRight: "5px",
                        marginTop: "5px",
                        fontSize: "20px",
                      }}
                    >
                      ${" "}
                    </span>
                    <input
                      type="text"
                      name="text"
                      className="form-control ml-1"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between px-3 pt-4 pb-3">
              <button
                onClick={foo}
                type="button"
                className="btn btn-primary button"
                style={{ fontSize: "20px" }}
              >
                Pay amount
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
