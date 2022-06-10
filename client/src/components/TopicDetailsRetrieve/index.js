import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import axios from "axios";
import React, { useState, useEffect } from 'react'


const TopicDetailsRetrieve = () =>{

    const[groupId,setId] = useState()
    const[groupName,setGROUPNAME] = useState()
    const[topic,setTOPIC] = useState()
    const[year,setYEAR] = useState()
    const[supervisor,setSUPERVISOR] = useState()
    const[coSupervisor,setCOSUPERVISOR] = useState()
    const[feedback,setFEEDBACK] = useState()

    useEffect(() => {

        axios.get("http://localhost:8082/api/topic/getGroupId/" +localStorage.getItem("groupId"))

        .then((response) =>{                   //set the details
            setId(response.data[0].groupId)
            setGROUPNAME(response.data[0].groupName)
            setTOPIC(response.data[0].topic)
            setYEAR(response.data[0].year)
            setSUPERVISOR(response.data[0].supervisor)
            setCOSUPERVISOR(response.data[0].coSupervisor)
            setFEEDBACK(response.data[0].feedback)

            console.log(response.data)
        })

        .catch(function(error){

            console.log(error)
        });
    }, []);

    return(

        // topic details retrieve to form

        <div className={styles.topic_container}> 
            <div className= {styles.topic_form_container}>
            <div className={styles.colt2}>
                <form className= {styles.form_container}>
                    <h1>Registered topic Details</h1>

                    <input
                            type="text"                       
                            name="groupId"                            
                            value={groupId}                           
                            className={styles.input}
                    />
                    <input
                            type="text"                       
                            name="groupName"                            
                            value={groupName}
                            className={styles.input}
                    />
                    <input
                            type="text"                       
                            name="topic"                            
                            value={topic}
                            className={styles.input}
                    />
                    <input
                            type="text"                       
                            name="year"                            
                            value={year}
                            className={styles.input}
                    />
                    <input
                            type="text"                       
                            name="supervisor"                            
                            value={supervisor}
                            className={styles.input}
                    />
                    <input
                            type="text"                       
                            name="coSupervisor"                            
                            value={coSupervisor}
                            className={styles.input}
                    />
                    <input
                            type="text"                       
                            name="feedback"                            
                            value={feedback}
                            className={styles.input}
                    />
                </form>

            </div>

            </div>
                <Link to ="/regtopicupdate">
			    <button type ="button" className={styles.upd_btn}>
				        Update Details
				</button>
				</Link>

                <Link to ="/">
			    <button type ="button" className={styles.lg_btn}>
				        Back to Main
				</button>
				</Link>

        </div>
    );


};

export default TopicDetailsRetrieve;
