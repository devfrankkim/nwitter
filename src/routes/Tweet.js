import { useState } from "react";
import { dbService } from "../firebaseService";
import { doc, deleteDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { storageService } from "../firebaseService";
import { deleteObject, ref } from "firebase/storage";

function Tweet({ tweetObject, userOwner }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tweetValue, setTweetValue] = useState(tweetObject.text);

  // ======= Delete data  =======
  const deleteTweet = async () => {
    const ok = window.confirm("Are you sure you want to delete?");
    if (ok) {
      // *** delete tweet ***
      await deleteDoc(doc(dbService, "CRUD", tweetObject.id));
      // *** delete profile URL ***
      await deleteObject(ref(storageService, tweetObject.attachmentUrl));
    }
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // ======= Update data  =======
    await setDoc(doc(dbService, "CRUD", tweetObject.id), {
      createID: userOwner.uid,
      createdAt: serverTimestamp(),
      text: tweetValue,
    });

    setIsEditing(false);
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;

    setTweetValue(value);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              value={tweetValue}
              onChange={onChange}
              placeholder="Edit..."
            />
            <input type="submit" value="Update" />
          </form>
          <button onClick={toggleEdit}> Cancel </button>
        </>
      ) : (
        <>
          <h4>{tweetObject.text}</h4>
          {tweetObject.attachmentUrl && (
            <img
              src={tweetObject.attachmentUrl}
              width="50px"
              height="50px"
              alt=""
            />
          )}
          {userOwner.uid === tweetObject.createID && (
            <div>
              <button onClick={deleteTweet}>Delete</button>
              <button onClick={toggleEdit}>Edit</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Tweet;
