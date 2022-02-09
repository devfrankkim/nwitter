import React from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../firebaseService";

function Profile() {
  const history = useHistory();

  const logOut = () => {
    authService.signOut();
    history.push("/");
  };

  return <button onClick={logOut}>Log Out</button>;
}

export default Profile;
