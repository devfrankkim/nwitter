import { useState, useEffect } from "react";
import AppRouter from "./AppRouter";
import { authService } from "../firebaseService";

function App() {
  const [inIt, setInIt] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    // ======== listening for sign in status ========
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }

      setInIt(true);
    });
  }, []);

  return (
    <>
      <div>
        {inIt ? (
          <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
        ) : (
          "initializing.. "
        )}
      </div>
    </>
  );
}

export default App;
