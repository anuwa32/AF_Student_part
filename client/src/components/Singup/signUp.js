import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {  //registration form
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		faculty: "",
		regNum: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8082/api/users";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
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
		<div className={styles.reg_container}>
			<div className={styles.reg_form_container}>

				<div className={styles.col}>
					<h1>Please Sign In</h1>
					<Link to="/login">
						<button type="button" className={styles.btnw}>
							Sign In
						</button>
					</Link>
				</div>
				
				<div className={styles.col2}>
					<form className={styles.form_container} onSubmit={handleSubmit}>

						<h1>Create Your Account</h1>

						<input
							type="text"
							placeholder="Enter your first name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Enter your last name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Faculty"
							name="faculty"
							onChange={handleChange}
							value={data.faculty}
							required
							className={styles.input}
						/>
						<input
						   type = "text"
						   placeholder="Enter your registration number"
						   name="regNum"
						   onChange={handleChange}
						   value = {data.regNum}
						   required
						   className= {styles.input}
						/>
						<input
							type="email"
							placeholder="Enter your email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Please enter valid Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>

						{error && <div className={styles.error}>{error}</div>}
						<button type="submit" className={styles.btnb}>
							Sign Up
						</button>

					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
