import { Link } from "react-router-dom";
import styles from "./styles.module.css";
//import { useEffect } from "react";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const [id, setId] = useState();
  const [firstName, setFIRSTNAME] = useState();
  const [lastName, setLASTNAME] = useState();
  const [faculty, setFACULTY] = useState();
  const [regNum, setREGNUM] = useState();
  const [email, setEMAIL] = useState();

  useEffect(() => {
    axios

      .get(
        "http://localhost:8082/api/users/getEmail/" +
          localStorage.getItem("email")
      )

      .then((response) => {
        setId(response.data[0]._id);
        setFIRSTNAME(response.data[0].firstName);
        setLASTNAME(response.data[0].lastName);
        setFACULTY(response.data[0].faculty);
        setREGNUM(response.data[0].regNum);
        setEMAIL(response.data[0].email);

        console.log(response.data);

        localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      })

      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Welcome</h1>

        <button className={styles.logout_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      
      <div className={styles.main_form_container}>
        {" "}
        {/* retrieve student details in to form */}
        <div className={styles.colt}>
          <div className={styles.clot2}>
            <form className={styles.form_container} onSubmit>
              <h1>Your Details</h1>
              <br></br>

              <input
                type="text"
                name="id"
                value={id}
                readOnly
                className={styles.input}
              />
              <input
                type="text"
                name="firstName"
                value={firstName}
                className={styles.input}
              />
              <input
                type="text"
                name="lastName"
                value={lastName}
                className={styles.input}
              />
               <input
                type="text"
                name="faculty"
                value={faculty}
                className={styles.input}
              />
              <input
                type="text"
                name="regNum"
                value={regNum}
                className={styles.input}
              />
              <input
                type="text"
                name="email"
                value={email}
                className={styles.input}
              />
            </form>
          </div>
        </div>
      
      </div>

     

      <Link to="/reggroup">
        <button type="button" className={styles.reg_btn}>
          Register Your Group
        </button>
      </Link>
    </div>
    
  );
};

export default Main;
