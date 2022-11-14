import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://movieapplicationapi.herokuapp.com/auths/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    if (json.authSuccess) {
      localStorage.setItem("token", json.authToken);
      navigate("/Dashboard");
    } else {
      toast.error("Wrong Credentials", {
        position: "bottom-right",
        theme: "dark",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container bgimage">
      <div className="row align-items-center my-5">
        
        <div className="col cred-box">
          <h1>login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                email address
              </label>
              <input
                type="email"
                value={credentials.email}
                onChange={onChange}
                name="email"
                className="form-control"
                id="email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password1" className="form-label">
                password
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={onChange}
                name="password"
                className="form-control"
                id="password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              sign In
            </button>
          </form>
        </div>
        <div className="row align-items-center my-5">
          <h3 className="newUser">
            New User? <Link to="/Register">Create Account</Link>
          </h3>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Login;
