import React from "react";
import { FaPlaneArrival, FaPlaneDeparture, FaChild } from "react-icons/fa";
import { GiPerson } from "react-icons/gi";
import { useForm } from "react-hook-form";
import "./styles/BookTicket.css";
import {useState,useEffect} from 'react';
import {Link, useParams,useHistory} from 'react-router-dom';
import Axios from 'axios';
const initialState = {
  from_airport: "",
  to_airport: "",
  departure_time: "",
  arrival_time: "",
  phone: "",
  email: "",
  passport: "",
};

const FlightApp = () => {
  // handle event
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await Axios.get("http://localhost:5000/airport/api/get");
    setData(response.data);
  };

  
  useEffect(()=>{
    loadData();
  },[]);

  // handle submit
  const onSubmit = (data) => {
    console.log(data);
    // alert(JSON.stringify(data))
    setTimeout(() => history.push("/AvailableFlights"), 100);
  };
  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white w-auto h-auto pb-10 mt-5 mx-5 px-5 rounded-lg sm:w-full md:w-4/5 md:mx-auto lg:w-2/5 lg:mx-auto">
          {/* header section */}

          {/* body section */}
          <div>
            <div className="grid justify-center space-y-5 bg-indigo-50 pb-10">
              {/* departure section */}
              <div>
                <div>
                  <div className="relative" style={{ marginTop: "20px" }}>
                    <p className="font-bold text-xl uppercase">flying from</p>
                    <select
                      className={`w-full h-16 text-2xl pl-20 rounded-lg ${errors.departure &&
                        " focus:border-red-500 focus:ring-red-500 border-red-500"}`}
                      {...register("departure", {
                        required: {
                          value: true,
                          message: "Departure is required",
                        },
                      })} 
                    >
                      <option value="" selected disabled hidden>
                        --Select Airport--
                      </option>
                      {data.map((item, index) => {
                        return (
                          <>
                            <option value={item.airport_name}>
                              {" "}
                              {item.airport_name}
                            </option>
                          </>
                        );
                      })}
                      
                    </select>
                    <FaPlaneDeparture className="text-4xl absolute left-5 top-10 " />
                  </div>
                  <div>
                    {errors.departure && (
                      <span className="text-sm text-red-500">
                        {errors.departure.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* arrival section */}
              <div>
                <div>
                  <div className="relative">
                    <p className="font-bold text-xl uppercase">flying to</p>
                    <select
                      className={`w-full h-16 text-2xl pl-20 rounded-lg ${errors.arrival &&
                        " focus:border-red-500 focus:ring-red-500 border-red-500"}`}
                      {...register("arrival", {
                        required: {
                          value: true,
                          message: "Arrival is required",
                        },
                      })}
                    >
                      <option value="" selected disabled hidden>
                        --Select Airport--
                      </option>
                      {data.map((item, index) => {
                        return (
                          <>
                            <option value={item.airport_name}>
                              {" "}
                              {item.airport_name}
                            </option>
                          </>
                        );
                      })}
                    </select>
                    <FaPlaneArrival className="text-4xl absolute left-5 top-10 " />
                  </div>
                  <div>
                    {errors.arrival && (
                      <span className="text-sm text-red-500">
                        {errors.arrival.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* date section */}
              <div className="flex space-x-2">
                {/* departure section */}
                <div>
                  <div>
                    <div className="relative">
                      <p className="font-bold text-xl uppercase">
                        departure date
                      </p>
                      <input
                        type="date"
                        className={`w-full h-16 text-2xl rounded-lg ${errors.departureDate &&
                          " focus:border-red-500 focus:ring-red-500 border-red-500"}`}
                        {...register("departureDate", {
                          required: {
                            value: true,
                            message: "Departure date is required",
                          },
                        })}
                      />
                    </div>
                    <div>
                      {errors.departureDate && (
                        <span className="text-sm text-red-500">
                          {errors.departureDate.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* return section */}
                <div>
                  <div>
                    <div className="relative">
                      <p className="font-bold text-xl uppercase">return date</p>
                      <input
                        type="date"
                        className={`w-full h-16 text-2xl rounded-lg ${errors.returnDate &&
                          " focus:border-red-500 focus:ring-red-500 border-red-500"}`}
                        {...register("returnDate", {
                          required: {
                            value: true,
                            message: "Return date is required",
                          },
                        })}
                      />
                    </div>
                    <div>
                      {errors.returnDate && (
                        <span className="text-sm text-red-500">
                          {errors.returnDate.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* class and price section */}
              <div className="flex space-x-2">
                {/* class section */}
                <div className="w-full">
                  <div>
                    <div>
                      <p className="font-bold text-xl uppercase"> class</p>
                      <select
                        className="w-full h-16 rounded-lg text-2xl pl-20"
                        {...register("class", {
                          required: {
                            value: true,
                            message: "Trip type is required",
                          },
                        })}
                      >
                        <option>Economy</option>
                        <option>Business</option>
                      </select>
                    </div>
                    {/* <div>Error</div> */}
                  </div>
                </div>

                {/* price section */}
                <div className="w-full">
                  <div>
                    <div>
                      <p className="font-bold text-xl uppercase"> price</p>
                      <select
                        className="w-full h-16 rounded-lg text-2xl pl-20"
                        {...register("price", {
                          required: {
                            value: true,
                            message: "Trip type is required",
                          },
                        })}
                      >
                        <option>All Prices</option>
                        <option>$ 1000</option>
                        <option>$ 2000</option>
                        <option>$ 3000</option>
                        <option>$ 4000</option>
                        <option>$ 5000</option>
                      </select>
                    </div>
                    {/* <div>Error</div> */}
                  </div>
                </div>
              </div>

              {/* btn section */}
              <div>
                <input
                  type="submit"
                  value="Find flight"
                  className="w-full h-16 font-bold text-3xl uppercase rounded-lg bg-green-100 hover:bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default FlightApp;
