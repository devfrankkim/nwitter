import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../firebaseService";
import { collection, query, where, getDocs } from "firebase/firestore";
// import { getAuth, updateProfile } from "firebase/auth";

function Profile({ userOwner, refreshUserOwner }) {
  const [newDisplayName, setNewDisplayName] = useState(userOwner.displayName);

  const history = useHistory();

  const getMyTweet = async () => {
    // Grab the correct ID.
    const q = query(
      collection(dbService, "CRUD"),
      where("createID", "==", userOwner.uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      doc.data();
    });
  };

  useEffect(() => {
    getMyTweet();
  }, []);

  const logOut = () => {
    authService.signOut();
    history.push("/");
  };

  const onChange = (event) => {
    setNewDisplayName(event.target.value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    // const auth = getAuth();

    // update only if there's any changes.
    if (userOwner.displayName !== newDisplayName) {
      await userOwner.updateProfile({
        displayName: newDisplayName,
      });
      refreshUserOwner();
    }
  };
  return (
    <div className="container">
      <form action="" onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          placeholder="Change your profile name."
          autoFocus
          onChange={onChange}
          // value={`${newDisplayName}`}
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
        <span onClick={logOut} className="formBtn cancelBtn logOut">
          Log Out
        </span>
      </form>
    </div>
  );
}

export default Profile;
