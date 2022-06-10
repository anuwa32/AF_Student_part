import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8082/api/auth";
      const { data: res } = await axios.post(url, data);
      console.log(res.data);
      localStorage.setItem("token", res.data);
      localStorage.setItem("email", data.email);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.log_container}>
      <div className={styles.log_form_container}>
        <div className={styles.col1}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login</h1>

            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />

            <input
              type="password"
              placeholder="Enter Your Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error}>{error}</div>}
            <button type="submit" className={styles.btn2}>
              Sign In
            </button>
          </form>
        </div>
        <div className={styles.col2}>
          <h1>Create Account</h1>

          <Link to="/signup">
            <button type="button" className={styles.btn1}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
