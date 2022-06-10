import { Route, Routes, Navigate } from "react-router-dom";
import StudentProfile from "./components/StudentProfile";
import Signup from "./components/Singup/signUp";
import Login from "./components/Login";
import RegTopic from "./components/RegTopic";
import RegGroup from "./components/RegGroup";
import RegTopicUpdate from"./components/RegTopicUpdate";
import TopicDetailsRetrieve from"./components/TopicDetailsRetrieve";
//import FileUpload from "./components/FileUpload";
function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<StudentProfile />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/regtopic" exact element={<RegTopic />} />
			<Route path="/reggroup" exact element={<RegGroup />} />
			<Route path="/regtopicupdate" exact element={<RegTopicUpdate />} />
			<Route path="/regtopicretrieve" exact element={< TopicDetailsRetrieve/>} />
			{/* <Route path="/fileupload" exact element={< FileUpload/>} /> */}

			

		</Routes>
	);
}

export default App;
