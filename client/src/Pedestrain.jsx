import React, { useState, useEffect } from "react";
import MyMap from "./map1";
import Table from "./Table1";
import firebase from "firebase/compat/app"; // Firebase App (the core Firebase SDK)
import "firebase/compat/database"; // Firebase Realtime Database
// import TomTom from "./TomTom";
import TomTom2 from "./TomTom2";
const firebaseConfig = {
  apiKey: "AIzaSyAhS4VvJNsxgDW3N3gdRGcaKSDjLiPi3h8",
  authDomain: "facerecognition-a185f.firebaseapp.com",
  databaseURL: "https://facerecognition-a185f-default-rtdb.firebaseio.com",
  projectId: "facerecognition-a185f",
  storageBucket: "facerecognition-a185f.appspot.com",
  messagingSenderId: "270279767911",
  appId: "1:270279767911:web:71ac6c23181779b2a4a1c2",
  measurementId: "G-SNXQPRES1Y",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Pedestrain = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const dataRef = firebase.database().ref("/Pedestrain");
      dataRef.on("value", (snapshot) => {
        setData(snapshot.val());
      });

      return () => {
        dataRef.off("value");
      };
    };

    fetchData();
   
  },[] );
  console.log(data);
  return (
    <>
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{ fontSize: "5.4rem", marginTop: "0px", marginBottom: "32px" }}
        >
          Pedestrains at Threat
        </h1>
        <TomTom2/>
        {/* <MyMap data={data} /> */}
      </div>
      <div
        style={{
          border: "4px solid black",
          borderRadius: "4px",
          marginTop: "32px",
          marginBottom: "32px",
          width: "800px",
          marginLeft: "70px",
          display: "flex",
        }}
      >
        <table className="table">
      <tbody>
  {data && Object.entries(data).map(([key, value], index) => (
    <tr key={index}>
      <td>{key}</td>
      <td>latitude:{value.location[0]}      </td>
      <td>longitude:{value.location[1]}     </td>
    </tr>
  ))}
</tbody>
    
    </table>
      </div>
    </>
  );
};

export default Pedestrain;