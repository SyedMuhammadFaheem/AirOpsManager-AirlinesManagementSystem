import React, { useState } from "react";
import Axios from "axios";
import "./styles/Signin.css";
import { useHistory,useParams } from "react-router-dom";
import Swale from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const initialState = {
  review: "",
};
const AddReviews = () => {
  const Swal = withReactContent(Swale);
  const [state, setState] = useState(initialState);
  const { review } = state;
  const {id}=useParams();
  const history = useHistory();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const Add = (event) => {
    event.preventDefault();
    Axios.post(`http://localhost:5000/addreview/${id}`, {
      id:id,
      review:review,
    }).then((response) => {
      if (response.data.msg) {
        Swal.fire("Invalid Login!", "", "error");
      } else {
        Swal.fire("Review Added!", "", "success");
        setTimeout(() => history.push(`/CustomerPanel/${id}`), 500);
      }
    });
  };
  return (
    <div className="Auth-form-container bg-image">
      <form className="Auth-form" onSubmit={Add}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Add Review</h3>
          <div className="form-group mt-3">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control mt-1"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Review</label>
            <input
              type="text"
              name="review"
              value={review}
              onChange={handleInputChange}
              className="form-control mt-1"
              placeholder="e.g Keep up the good work!"
              required
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit Review
            </button>
          </div>
          
        </div>
      </form>
    </div>
  );
};

export default AddReviews;
