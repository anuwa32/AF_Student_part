import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Regtop = () => {
  const [data, setData] = useState({
    groupId: "",
    groupName: "",
    topic: "",
    year: "",
    supervisor: "",
    coSupervisor: "",
    feedback: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });

  };


  const handleSubmit = async (e) => {

  //console.log(data)

    e.preventDefault();
    try {
      let temp = data;
      temp.groupId = localStorage.getItem("groupId");
      const url = "http://localhost:8082/api/topic";
      const { data: res } = await axios.post(url, temp);
      //navigate("/regtopicretrieve/${data.groupName}");
      navigate("/regtopicretrieve");

      console.log(res.data);
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
    <div className={styles.topic_container}>
      <div className={styles.topic_form_container}>
        <div className={styles.colt}></div>
        <div className={styles.colt2}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Register Your Topic</h1>
      
            <input
              type="text"
              placeholder="Group Name"
              name="groupName"
              onChange={handleChange}
              value={data.groupName}
              //value={JSON.parse(localStorage.getItem("loggedInUser"))[0].groupName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Topic"
              name="topic"
              onChange={handleChange}
              value={data.topic}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Year"
              name="year"
              onChange={handleChange}
              value={data.year}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Supervisor Name"
              name="supervisor"
              onChange={handleChange}
              value={data.supervisor}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Co-Supervisor Name"
              name="coSupervisor"
              onChange={handleChange}
              value={data.coSupervisor}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Feedback From panal member"
              name="feedback"
              onChange={handleChange}
             
              value={data.feedback}
              className={styles.input}
            />
            {error && <div className={styles.error}>{error}</div>}

            <button type="submit" className={styles.btnb}>
              Register
            </button>
          </form>
        </div>
      </div>

    

      <Link to="/">
        <button type="button" className={styles.lg_btn}>
          Back to Main
        </button>
      </Link>

      <Link to="/reggroup">
        <button type="button" className={styles.grp_reg_btn}>
          Group Registration
        </button>
      </Link>

      <Link to="/fileupload">
        <button type="button" className={styles.upload_btn}>
          Upload You file
        </button>
      </Link>

      
    </div>

      
  );
};
export default Regtop;
