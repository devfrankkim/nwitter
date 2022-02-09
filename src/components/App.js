import { useState, useEffect } from "react";
import AppRouter from "./AppRouter";
import { authService } from "../firebaseService";

function App() {
  const [inIt, setInIt] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // ======== listening for sign in status ========
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      setInIt(true);
    });
  }, []);

  return (
    <>
      <div>
        {inIt ? <AppRouter isLoggedIn={isLoggedIn} /> : "initializing.. "}
      </div>
    </>
  );
}

export default App;
