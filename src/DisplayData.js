import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const DisplayData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Reference to the Firestore collection
        const querySnapshot = await getDocs(collection(db, "series"));
        const dataList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(dataList);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Firebase Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.author} - {item.ISBN}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayData;