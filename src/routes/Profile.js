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
    <>
      <form action="" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          onChange={onChange}
          value={newDisplayName}
        />
        <input type="submit" value="Update profile" />
        <button onClick={logOut}>Log Out</button>
      </form>
    </>
  );
}

export default Profile;
