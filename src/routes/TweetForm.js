import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService } from "../firebaseService";
import { collection, serverTimestamp, addDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

function TweetForm({ userOwner }) {
  const [tweetValue, setTweetValue] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const fileInput = useRef();

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
  );
}

export default TweetForm;
