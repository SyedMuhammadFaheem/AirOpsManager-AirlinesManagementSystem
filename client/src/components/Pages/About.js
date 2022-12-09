import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Footer from "./Footer";
import {useState,useEffect} from 'react';
import Axios from 'axios';
import "./styles/About.css";

const About = () => {
  const [data, setData] = useState({});
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});
  useEffect(() => {
    Axios.get('http://localhost:5000/getreview').then((resp) =>
      setData({ ...resp.data[0] }),
    );
    Axios.get('http://localhost:5000/getreview').then((resp) =>
      setData1({ ...resp.data[1] }),
    );
    Axios.get('http://localhost:5000/getreview').then((resp) =>
      setData2({ ...resp.data[2] }),
    );
  }, []);
  
  return (
    <div>
      <section className="">
        <div
          className="row py-4"
          style={{ backgroundColor: "rgb(246, 246, 246)" }}
        >
          <div className="col-lg-12 align-items-center d-flex justify-content-center">
            <h2>About Us</h2>
          </div>
        </div>
      </section>

      <section className="">
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-lg-12 align-items-center d-flex justify-content-center"
              style={{ marginTop: "20px" }}
            >
              <h2>About Our Airways</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 align-items-center d-flex justify-content-center">
              <h5>Our goals and values</h5>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 align-items-center d-flex justify-content-center">
            <img
              src={require("../../images/airhostess.jpg")}
              width="950" style={{borderRadius:'20px'}}
              height="650"
            />
          </div>

          <div className="col-lg-6" style={{ paddingTop: "150px" }}>
            <p style={{ fontSize: "25px", marginLeft: "10px" }}>
              Our focus is on your overall well being and helping you avail
              <br />
              luxurious flights at minimal costs. We provide state-of-the-art{" "}
              <br />
              facilities in all our airways.
            </p>
            <br />
            <br />
            <div className="row">
              <div className="col-lg-1">
                <img
                  src={require("../../images/nc1.png")}
                  height="80px"
                  width="70px"
                />
              </div>
              <div className="col-lg-6">
                {" "}
                <b style={{ fontSize: "25px" }}>Our Missions</b>
                <br />
                <p style={{ fontSize: "20px" }}>
                  To make our flights easy, comfortable and reliable for you
                </p>
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <div className="row">
              <div className="col-lg-1">
                <img
                  src={require("../../images/nc4.png")}
                  height="65px"
                  width="70px" 
                />
              </div>
              <div className="col-lg-6">
                {" "}
                <b style={{ fontSize: "25px" }}>Professionals in our Airways</b>
                <br />
                <p style={{ fontSize: "20px" }}>
                  Has provided a high class facility for every journey
                </p>
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </section>

      <br />
      <br />

      <section className="">
        <div className="row" style={{ paddingBottom: "20px" }}>
          <div className="col-lg-6 align-items-center d-flex justify-content-center ">
            <h1 style={{textAlign:'center'}}>Come fly with us and<br/> you could win the<br/> TRIP OF A LIFETIME</h1>
          </div>

          <div className="col-lg-6 align-items-center d-flex justify-content-center ">
            <img
              src={require("../../images/about1.jpg")}
              width="1200px"
              style={{ borderRadius: "20px" }}
            />
          </div>
        </div>
      </section>
      <br></br>
      <section className="py-5 ">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 align-items-center d-flex justify-content-center">
              <h2>
                <strong style={{ fontSize: "35px" }}>Our Happy Clients</strong>
              </h2>
            </div>
            
          </div>
          <div className="row">
            <div className="col-lg-12 align-items-center d-flex justify-content-center">
              <p style={{ color: "grey",fontSize:'30px' }}>What people say about us</p>
            </div>
          </div>
        </div>

        <Carousel style={{height:'200px'}}>
          <Carousel.Item interval={1000}>
            <p className="align-items-center d-flex justify-content-center" style={{fontSize:'25px'}}>
            {data.fname}{" "}{data.lname}{": "}{data.review}
            </p>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <p className="align-items-center d-flex justify-content-center" style={{fontSize:'25px'}}>
            {data1.fname}{" "}{data1.lname}{": "}{data1.review}
            </p>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <p className="align-items-center d-flex justify-content-center" style={{fontSize:'25px'}}>
            {data2.fname}{" "}{data2.lname}{": "}{data2.review}
            </p>
          </Carousel.Item>
          
          
        </Carousel>
      </section>

      <section className="">
        <div className="row">
          <div
            className="col-lg-6 align-items-center d-flex justify-content-center"
            style={{
              width: "1000px",
              height: "700px",
              marginRight: "0",
              marginLeft: "70px",
            }}
          >
            <video className="w-100" autoPlay loop muted>
              <source
                src={require("../../images/InsideTheWorldsBiggestPassengerPlane.mp4")}
                type="video/mp4"
              />
            </video>
          </div>
          <div className="col-lg-6 align-items-center d-flex justify-content-center">
            <div className="white border-0" style={{ width: "35rem" }}>
              <h2>
                <strong style={{ fontSize: "35px", marginLeft: "0px" }}>
                  Your comfort is our priority
                </strong>
              </h2>

              <div className="card-body white border-0">
                <p style={{ fontSize: "22px" }}>
                  We are providing you the most comfortable flights ever.You
                  will feel home when you board in the flight. Staff will treat
                  you as their home members
                </p>
                <button
                  type="button"
                  className="btn btn-success"
                  style={{ fontSize: "22px", padding: "10px" }}
                >
                  More Information
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      
    </div>
  );
};

export default About;
