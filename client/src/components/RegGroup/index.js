import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const RegGroup = () => {
  const [data, setData] = useState({
    Sid: "",
    groupName: "",
    leaderName: "",
    memTwo: "",
    memThree: "",
    memFour: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let temp = data;
      temp.Sid = JSON.parse(localStorage.getItem("loggedInUser"))[0]._id;
      console.log(temp);
      const url = "http://localhost:8082/api/group";
      const { data: res } = await axios.post(url, temp);
      localStorage.setItem("groupId", res.data);
      navigate("/regtopic");
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
        <div className={styles.colt}>
          {/* <h1>Topic Registration</h1>
					<Link to="/regtopic">
						<button type="button" className={styles.btnw}>
							Topic Register
						</button>
					</Link> */}
        </div>
        <div className={styles.colt2}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Register Your Group</h1>
            <input
              type="text"
              placeholder="Student Id"
              name="Sid"
              onChange={handleChange}
              value={JSON.parse(localStorage.getItem("loggedInUser"))[0]._id}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Group Name"
              name="groupName"
              onChange={handleChange}
              value={data.groupName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Leader Name"
              name="leaderName"
              onChange={handleChange}
              value={data.leaderName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Member Two Name"
              name="memTwo"
              onChange={handleChange}
              value={data.memTwo}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Member Three Name"
              name="memThree"
              onChange={handleChange}
              value={data.memThree}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Member Four Name"
              name="memFour"
              onChange={handleChange}
              value={data.memFour}
              required
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

      <Link to="/regtopic">
        <button type="button" className={styles.topic_btn}>
          Topic Registration
        </button>
      </Link>
    </div>
  );
};

export default RegGroup;
