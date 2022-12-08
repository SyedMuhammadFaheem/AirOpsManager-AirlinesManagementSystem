import React from "react";
import "./styles/Contact.css";
import Footer from "./Footer";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
const Contact = () => {
  return (
    <>
      <section className="poppins" >
        <div
          className="row py-4"
          style={{ backgroundColor: "rgb(246, 246, 246)" }}
        >
          <div className="col-lg-3 align-items-center d-flex justify-content-center" >
            <h2 style={{marginRight:'-310%'}}>Contact Us</h2>
          </div>
        </div>
      </section>

      <section className="poppins">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 align-items-center d-flex justify-content-center">
              <h2 style={{marginTop:'20px'}}>How to find us</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 align-items-center d-flex justify-content-center grey-text">
              <h5>Address and Direction</h5>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6" style={{margin:'0'}}>
            <img src={require('../../images/contact.jpg')} style={{marginTop:'50px',marginLeft:'20px',marginRight:'0',borderRadius:'20px'}} width="850" height="550" />
          </div>

          <div className="col-lg-6" style={{ paddingTop: "150px" }}>
            <div className="row">
              <div className="col-lg-1">
                <img src="marker.png" height="20px" width="20px" />
              </div>
              <div className="col-lg-6" style={{marginLeft:'0'}}>
                {" "}
                <b style={{fontSize:'25px'}}>Our Address</b>
                <br />
                <p className="grey-text" style={{fontSize:'20px'}}>St-4, Sector 17-D, NH 5, Karachi, Sindh</p>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-lg-1">
                <img src="mobile-notch.png" height="20px" width="20px" />
              </div>
              <div className="col-lg-6">
                {" "}
                <b style={{fontSize:'25px'}}>Phone</b>
                <br />
                <p className="grey-text" style={{fontSize:'20px'}}>+923312613326</p>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-lg-1">
                <img src="time-check.png" height="20px" width="20px" />
              </div>
              <div className="col-lg-6">
                {" "}
                <b style={{fontSize:'25px'}}>Open Hours</b>
                <br />
                <p className="grey-text" style={{fontSize:'20px'}}>Mon-Sat 8:00am-4:30pm</p>
              </div>
            </div>
            <br />
            <br />
            <br />
            <div className="d-grid gap-2">
              <button
                type="button"
                className="btn btn-primary "
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                style={{ fontSize: "25px" ,width:'1200px'}}
              >
                Contact Us
              </button>
            </div>
            <div
              className="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-body">
                    <form>
                      <div className="mb-3 mt-4">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="patName"
                        />
                      </div>
                      <div className="mb-3 mt-4">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                        />
                      </div>
                      <div className="mb-3 mt-4">
                        <label className="form-label">Message</label>
                        <input
                          type="text"
                          className="form-control"
                          name="message"
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-primary">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <br />
      <section className="poppins">
        <div className="row">
          <div className="col-lg-6 align-items-center d-flex justify-content-center">
            <div
              className="white border-0 text-center"
              style={{ width: "35rem" }}
            >
              <h2>Our Address</h2>
              <h5>Providing a free visit of our Airways and Offices</h5>
            </div>
          </div>

          <div className="col-lg-6 align-items-center d-flex justify-content-center" style={{width:'1200px',margin:'0'}}>
            <MDBRow className="w-100" >
              <MDBCol lg="6" className="my-4">
                <iframe
                  src="https://maps.google.com/maps?width=600px&amp;height=575&amp;hl=en&amp;q=St-4, Sector 17-D, NH 5, Karachi, Karachi City, Sindh&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  className="w-250"
                  height="600"
                  width="800"
                  loading="lazy"
                ></iframe>
              </MDBCol>
            </MDBRow>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
