import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
//import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const RegtopUpdate = () => {

    const [data, setData] = useState({
        groupId: "",
        groupName: "",
        topic: "",
        year: "",
        supervisor: "",
        coSupervisor: "",
        //status: "N/A",
      });

    const navigate = useNavigate();     
    const [error, setError] = useState("");

    const[groupId,setId] = useState()
    const[groupName,setGROUPNAME] = useState()
    const[topic,setTOPIC] = useState()
    const[year,setYEAR] = useState()
    const[supervisor,setSUPERVISOR] = useState()
    const[coSupervisor,setCOSUPERVISOR] = useState()
    //const[status,setSTATUS] = useState()

    useEffect(() => {

        axios.get("http://localhost:8082/api/topic/getGroupId/" +localStorage.getItem("groupId"))

        .then((response) =>{                   //set the details
            setId(response.data[0].groupId)
            setGROUPNAME(response.data[0].groupName)
            setTOPIC(response.data[0].topic)
            setYEAR(response.data[0].year)
            setSUPERVISOR(response.data[0].supervisor)
            setCOSUPERVISOR(response.data[0].coSupervisor)
            //setFEEDBACK(response.data[0].feedback)

            console.log(response.data)
        })

        .catch(function(error){

            console.log(error)
        });
    }, []);

    const handleSubmit = async (e) => {

        //console.log(data)
        //console.log("Hallo")
      
          e.preventDefault();
          try {
            let temp = data;
            temp.groupId = localStorage.getItem("groupId");
            const url = "http://localhost:8082/api/topic/update"; 
            let t = {data:{topic:topic}, id:localStorage.getItem("groupId") };
            console.log(t);
            const { data: res } = await axios.post(url,t).then((r)=>{navigate("/regtopicretrieve")});
            //navigate("/regtopicretrieve/${data.groupName}");
            
      
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

    

    return(

    <div className={styles.topic_container}>
    <div className={styles.topic_form_container}>
        <div className={styles.colt}>
            {/* <h1>Group Registration</h1>
            <Link to="/reggroup">
                <button type="button" className={styles.btnw}>
                    Group Register
                </button>
            </Link> */}
        </div>
        <div className={styles.colt2}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
                <h1>Update You Details</h1>
                <input
                    type="text"
                    placeholder="Group Id"
                    name="groupId"                
                    value={groupId}
                    readOnly
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="Group Name"
                    name="groupName"
                    value={groupName}
                    readOnly
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="Topic"
                    name="topic"                    
                    value={topic}
                    onChange={(e)=>{setTOPIC(e.target.value)}}
                    className={styles.input}
                />
                <input
                   type = "text"
                   placeholder="Year"
                   name="year"                  
                   value = {year}
                   readOnly
                   className= {styles.input}
                />
                <input
                    type="text"
                    placeholder="Supervisor Name"
                    name="supervisor"                    
                    value={supervisor}
                    readOnly
                    className={styles.input}
                />
                 <input
                    type="text"
                    placeholder="Co Supervisor Name"
                    name="coSupervisor"                    
                    value={coSupervisor}
                    readOnly
                    className={styles.input}
                />
                {/* <input
                    type="text"
                    placeholder="Panal member's feedback"
                    name="feedback"                    
                    value={feedback}
                    //readOnly
                    className={styles.input}
                /> */}
                 {error && <div className={styles.error}>{error}</div>}
                <button type="submit" className={styles.btnb}>
                    Update
                </button>
            </form>
        </div>
    </div>

    <Link to="/regtopicretrieve">
        <button type="button" className={styles.lg_btn}>
          Back
        </button>
      </Link>

    </div>

    );

};

export default RegtopUpdate;