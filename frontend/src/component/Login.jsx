import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();
  const adminEmail = useRef();
  const adminPassword = useRef();

  const validateAdmin = async (event) => {
    event.preventDefault();

    const email = adminEmail.current.value;
    const password = adminPassword.current.value;
    console.log(email);
    console.log(password);
    axios
      .post("http://localhost:8084/login", { email, password })
      .then((res) => {
        console.log(res.data.user);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        if (res.data.success) {
          navigate("/category");
        }
      })
      .catch((err) => console.log(err), setErrorMessage(true));
  };

  return (
    <>
      {" "}
      {errorMessage && (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
          style={{ display: "block" }}
        >
          <strong>Holy guacamole!</strong> You should check in on some of those
          fields below.
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <div
        className="login-container d-flex align-items-center justify-content-center"
        style={{ marginLeft: "23rem", marginTop: "7rem" }}
      >
        <div className="left-section">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp" // Image URL (replace with your own image)
            alt="Login visual"
          />
        </div>

        <div className="right-section ">
          <div className="login-form">
            {/* <div className="logo">
            <img src={logo} alt="Logo" />
          </div> */}
            <p id="title" style={{ fontStyle: "italic", margin: "1.5rem" }}>
              Welcome to TableSprint admin
            </p>

            <form>
              {" "}
              {/* Handle form submission */}
              <label>Email address</label>
              <input
                type="email"
                placeholder="Email address"
                required
                ref={adminEmail}
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                required
                ref={adminPassword}
              />
              <button type="submit" onClick={validateAdmin}>
                LOGIN
              </button>
              <div className="footer-links">
                <a href="#">Forgot password?</a>
                <br />
                {/* Conditionally render the ForgotPassword modal */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
