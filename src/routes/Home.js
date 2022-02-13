import { useState, useEffect } from "react";
import { dbService } from "../firebaseService";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import Tweet from "./Tweet";
import TweetForm from "./TweetForm";

function Home({ userOwner }) {
  const [database, setDatabase] = useState([]);

  useEffect(() => {
    // ======== Loading Data from DB ========
    const q = query(
      collection(dbService, "CRUD"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDatabase(newData);
    });
  }, []);

  return (
    <div className="container">
      <TweetForm userOwner={userOwner} />
      <div style={{ marginTop: 30 }}>
        {database.map((value) => (
          <Tweet tweetObject={value} userOwner={userOwner} key={value.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
