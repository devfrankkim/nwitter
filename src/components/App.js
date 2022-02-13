import { useState, useEffect } from "react";
import AppRouter from "./AppRouter";
import { authService } from "../firebaseService";

function App() {
  const [inIt, setInIt] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userOwner, setUserOwner] = useState(null);
  const [freshPage, setFreshPage] = useState(false);

  useEffect(() => {
    // ======== listening for sign in status ========
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserOwner(user);
      } else {
        setIsLoggedIn(false);
        setUserOwner(null);
      }
      setInIt(true);
    });
  }, []);

  const refreshUserOwner = () => {
    setFreshPage((prev) => !prev);
  };

  return (
    <>
      <div>
        {inIt ? (
          <AppRouter
            isLoggedIn={isLoggedIn}
            userOwner={userOwner}
            refreshUserOwner={refreshUserOwner}
          />
        ) : (
          "initializing.. "
        )}
      </div>
    </>
  );
}

export default App;
