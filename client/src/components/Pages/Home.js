import React from "react";
import "./styles/Home.css";
import Slider from "./Slider";
import Footer from "./Footer";
const Home = () => {
  return (
    <>
      <Slider />
      <div className="row" style={{ marginTop: "35px" }}>
        <div className="col-lg-4 align-items-center d-flex justify-content-center">
          <div className="white border-0" style={{ width: "40rem" }}>
            <div className="text-center">
              {" "}
              <img
                src={require("../../images/Destinations_Dekstop.png")}
                style={{ borderRadius: "20px" }}
                width="650"
                height="550"
              />
              <div className="card-body white border-0">
                <h5 className="card-title">
                  <strong style={{ fontSize: "25px" }}>
                    <br/>Discover the destinations you can
                    <br /> travel with FAST Airways
                  </strong>
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 align-items-center d-flex justify-content-center">
          <div className="white border-0" style={{ width: "60rem" }}>
            <div className="text-center">
              {" "}
              <img
                src={require("../../images/Fasttrack_Desktop.jpg")}
                style={{ borderRadius: "20px" }}
                width="650"
                height="550"
              />
              <div className="card-body white border-0">
                <h5 className="card-title">
                  <strong style={{ fontSize: "25px" }}>
                  <br/>Enjoy our Fast track service
                  </strong>
                </h5>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 align-items-center d-flex justify-content-center">
          <div className=" white border-0" style={{ width: "60rem" }}>
            <div className="text-center" >
              {" "}
              <img
                src={require("../../images/Alfursan_Destop.jpg")}
                style={{ borderRadius: "20px" }}
                width="650"
                height="550"
              />
              <div className="card-body white border-0">
                <h5 className="card-title">
                  <strong style={{ fontSize: "25px"}}>
                  <br/>Learn more about our loyalty <br />
                    program
                  </strong>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br></br>
      <br></br>

      <div className="row">
        <div className="col-lg-6 align-items-center d-flex justify-content-center">
          <div
            className=" text-center"
            style={{ width: "35rem" }}
          >
            <h1>Exceptional experiences with FAST Airways</h1>
            <h5>
              Explore the world, earn rewards and live the best adventures with
              FAST Airways.{" "}
            </h5>
            <br></br>
            {/* <a href="contact.php"><button type="button" className="btn btn-primary">Contact us</button></a> */}
          </div>
        </div>

        <div className="col-lg-6 align-items-center d-flex justify-content-center">
          <div className="row">
            <div className="col-lg-12 align-items-center d-flex justify-content-center">
              <div className="card border-0" style={{ width: "50rem" }}>
                <div className="row">
                  <div className="col-lg-6">
                    <img
                      src={require("../../images/Large-Sustainability.jpg")}
                      className="card-img-top"
                      alt="..."
                    />
                  </div>
                  <div className="col-lg-6">
                    <div className="card-body">
                      <h5 className="card-title">
                        <strong>Ensure a sustainable future</strong>
                      </h5>
                      <p className="card-text">
                        Help us reduce our carbon footprint and get rewarded!
                        Join us and earn Greens Points for every action you take
                        to help us reduce waste of food, fuel and materials.
                      </p>
                      <a href="#" className="btn btn-primary">
                        Learn more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12 align-items-center d-flex justify-content-center py-5">
              <div className="card border-0" style={{ width: "50rem" }}>
                <div className="row">
                  <div className="col-lg-6">
                    <img
                      src={require("../../images/Large-experiences.jpg")}
                      className="card-img-top"
                      alt="..."
                    />
                  </div>
                  <div className="col-lg-6">
                    <div className="card-body">
                      <h5 className="card-title">
                        <strong>Time flies on board FAST Airways</strong>
                      </h5>
                      <p className="card-text">
                        Sit back, relax and enjoy your flight with our onboard
                        services. Learn more about our dining options, inflight
                        entertainment,
                      </p>
                      <a href="#" className="btn btn-primary">
                        Learn more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12 align-items-center d-flex justify-content-center py-5">
              <div className="card border-0" style={{ width: "50rem" }}>
                <div className="row">
                  <div className="col-lg-6">
                    <img
                      src={require("../../images/Large-Upgrade.jpg")}
                      className="card-img-top"
                      alt="..."
                    />
                  </div>
                  <div className="col-lg-6">
                    <div className="card-body">
                      <h5 className="card-title">
                        <strong>Lets get you upgraded</strong>
                      </h5>
                      <p className="card-text">
                        Here's your chance to upgrade to a higher class. Place a
                        bid and experience the best in comfort, services, and
                        entertainment.
                      </p>
                      <a href="#" className="btn btn-primary">
                        Learn more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <header style={{ paddingLeft: 0,marginLeft:'25%',marginTop:'5%' }}>
        <div
          className="p-5 text-center bg-image"
          style={{
            backgroundImage:
              "url('https://mdbootstrap.com/img/new/slides/041.webp')",
            height: 600,
            width: 1300,
          }}
        >
          <div
            className="mask"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          >
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="text-white">
                <h1 className="mb-3" style={{fontWeight:'800',marginTop:'20px'}}>Start your journey with FAST Airways</h1>
                <h4 className="mb-3" style={{fontSize:'20px'}}>Exclusive offers, special offers and amazing rewards await for premium membership holders</h4>
                <a
                  className="btn btn-outline-light btn-lg"
                  href="#!"
                  role="button" style={{backgroundColor:'grey', fontSize:'20px',marginBottom:'20px'}}
                >
                  Join Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Footer />
    </>
  );
};

export default Home;
