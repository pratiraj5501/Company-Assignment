import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
const Content = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
    console.log("ok");
    console.log("Hello user..", userData);
  });

  const logout = () => {
    axios
      .post("http://localhost:8084/logout")
      .then((res) => {
        console.log("logout res", res);
        sessionStorage.removeItem("user");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="main--content">
      <div className="header-wrapper">
        <div className="header-title">
          <span>Primary</span>
          <h2>Dashboard</h2>
        </div>
        <div className="user-info">
          <FaUserCircle
            id="userIcon"
            onClick={logout}
            style={{ fontSize: "35px", cursor: "pointer" }}
          />
        </div>
      </div>
      {/* <!-- card container --> */}
      <div className="card-container">
        <h3 className="main-title">Today's data</h3>

        <div className="card-wrapper">
          <div className="payment-card light-red">
            <div className="card-header">
              <div className="amount">
                <span className="title"> payment amount </span>
                <span className="amount-value">Rs.500.00</span>
              </div>
              <i className="fas fa-dollar-sign icon"></i>
            </div>
            <span className="card-detail">**** **** **** 3458</span>
          </div>
          {/* <!-- second card --> */}
          <div className="payment-card light-purple">
            <div className="card-header">
              <div className="amount">
                <span className="title"> payment amount </span>
                <span className="amount-value">Rs.500.00</span>
              </div>
              <i className="fas fa-list icon dark-purple"></i>
            </div>
            <span className="card-detail">**** **** **** 5521</span>
          </div>
          {/* <!-- third card --> */}
          <div className="payment-card light-green">
            <div className="card-header">
              <div className="amount">
                <span className="title"> payment amount </span>
                <span className="amount-value">Rs.500.00</span>
              </div>
              <i className="fas fa-users icon dark-green"></i>
            </div>
            <span className="card-detail">**** **** **** 3458</span>
          </div>
          {/* <!-- forth card --> */}
          <div className="payment-card light-blue">
            <div className="card-header">
              <div className="amount">
                <span className="title"> payment amount </span>
                <span className="amount-value">Rs.500.00</span>
              </div>
              <i className="fa-solid fa-check dark-blue icon"></i>
            </div>
            <span className="card-detail">**** **** **** 3458</span>
          </div>
        </div>
      </div>
      {/* <!-- tabular content --> */}
      <div className="tabular-wrapper" style={{ display: "flex" }}>
        <h3 className="main-title">Finance Data</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Transaction Type</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2023/05/2024</td>
                <td>dinner</td>
                <td>dinner with friends</td>
                <td>980Rs</td>
                <td>dinner</td>
                <td>paid</td>
                <td>ok</td>
              </tr>
              <tr>
                <td>2023/05/2024</td>
                <td>dinner</td>
                <td>dinner with friends</td>
                <td>980Rs</td>
                <td>dinner</td>
                <td>paid</td>
                <td>ok</td>
              </tr>
              <tr>
                <td>2023/05/2024</td>
                <td>dinner</td>
                <td>dinner with friends</td>
                <td>980Rs</td>
                <td>dinner</td>
                <td>paid</td>
                <td>ok</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="7 ">Total:Rs.10000</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Content;
