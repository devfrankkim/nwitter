import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService } from "../firebaseService";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

import Tweet from "./Tweet";

function Home({ userOwner }) {
  const [tweetValue, setTweetValue] = useState("");
  const [database, setDatabase] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");

  const fileInput = useRef();

  useEffect(() => {
    // ======== Loading Data ========
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

  const onSubmit = async (event) => {
    event.preventDefault();

    // ======== Adding profile picture to "Firebase Storage" only when available. ========
    let downloadedURL = "";
    if (profilePicture !== "") {
      const storage = getStorage();
      //  ***** Reference: collection-like (email/random id) *****
      const fileRef = ref(storage, `${userOwner.email}/${uuidv4()}`);
      // ***** Data URL string *****
      const uploadFile = await uploadString(
        fileRef,
        profilePicture,
        "data_url"
      );

      // ***** Downlaod URL from Storage *****
      downloadedURL = await getDownloadURL(uploadFile.ref);
      console.log(downloadedURL);
    }

    // ======== Adding data to DB collection ========
    const newTweet = {
      text: tweetValue,
      createID: userOwner.uid,
      createdAt: serverTimestamp(),
      attachmentUrl: downloadedURL,
    };

    await addDoc(collection(dbService, "CRUD"), newTweet);

    fileInput.current.value = null;

    setTweetValue("");
    setProfilePicture("");
  };

  const onChange = ({ target: { value } }) => {
    setTweetValue(value);
  };

  // ======== Profile picture (Create - Read) ========
  const onFileChange = (event) => {
    const theFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      setProfilePicture(e.target.result);
    };

    if (theFile) reader.readAsDataURL(theFile);
  };

  // ======== Profile picture (Create - Read) ========
  const onClearProfile = () => {
    setProfilePicture("");
    // ***** Clear input (leftover data) *****
    fileInput.current.value = null;
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tweetValue}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInput}
        />
        <input type="submit" value="Click" />
        {profilePicture && (
          <div>
            <img src={profilePicture} width="80px" height="80px" alt="" />
            <button onClick={onClearProfile}>Clear Picture</button>
          </div>
        )}
      </form>
      <div>
        {database.map((value) => (
          <Tweet tweetObject={value} userOwner={userOwner} key={value.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
