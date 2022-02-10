import React, { useState, useEffect } from "react";
import { dbService } from "../firebaseService";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

function Home({ userObj }) {
  const [value, setValue] = useState("");
  const [getValue, setGetValue] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, "CRUD"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setGetValue(newData);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(dbService, "CRUD"), {
      inputValue: value,
      createID: userObj.uid,
      createdAt: serverTimestamp(),
    });
    setValue("");
  };

  const onChange = ({ target: { value } }) => {
    setValue(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Click" />
      </form>
      <div>
        {getValue.map((value) => (
          <div key={value.id}>
            <h4>{value.inputValue}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;
