import React from "react";
import { FaPlaneArrival, FaPlaneDeparture, FaChild } from "react-icons/fa";
import { GiPerson } from "react-icons/gi";
import { useForm } from "react-hook-form";
import "./styles/BookTicket.css";
import { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import Axios from "axios";


const BookTicket = () => {
  
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

  useEffect(() => {
    loadData();
  }, []);
  const { id } = useParams();
  // handle submit
  const onSubmit = (data) => {
    console.log(data.departure);
    Axios.post("http://localhost:5000/BookTicket", {
      departure: data.departure,
      arrival: data.arrival,
      departureDate: data.departureDate,
      returnDate: data.returnDate,
      class: data.class,
      price: data.price,
    }).then((response) => {
      if (response.data.err) console.log(response.data.err);
    });
    // .catch((err) => toast.error(err.response.data));
    setTimeout(() => history.push(`/AvailableFlights/${id}`), 100);
  };
  return (
    <div className="bg-img">

      <form onSubmit={handleSubmit(onSubmit)} >
          {/* header section */}

          {/* body section */}
          <div>
            <div className="grid justify-center space-y-5 pb-10" >
              {/* departure section */}
              <div>
                <div>
                  <div className="relative" style={{ marginTop: "50px" }}>
                    <p className="font-bold text-xl uppercase">flying from</p>
                    <select style={{ marginTop: "-15px"}}
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
                    <select style={{ marginTop: "-15px" }}
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
                      <input style={{ marginTop: "-13px"}}
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
                      <input style={{ marginTop: "-13px"}}
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
                      <select style={{ marginTop: "-15px"}}
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
                      <select style={{ marginTop: "-15px"}}
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
      </form>
    </div>
  );
};

export default BookTicket;
