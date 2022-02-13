import { useState } from "react";
import { dbService } from "../firebaseService";
import { doc, deleteDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { storageService } from "../firebaseService";
import { deleteObject, ref } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className="nweet">
      {isEditing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              value={tweetValue}
              onChange={onChange}
              placeholder="Edit..."
              required
              autoFocus
              className="formInput"
            />
            <input type="submit" value="Update" className="formBtn" />
          </form>
          <button onClick={toggleEdit} className="formBtn cancelBtn">
            Cancel
          </button>
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
            <div className="nweet__actions">
              <button onClick={deleteTweet}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button onClick={toggleEdit}>
                {" "}
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Tweet;
