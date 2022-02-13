import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

function AppRouter({ isLoggedIn, userOwner, refreshUserOwner }) {
  return (
    <Router>
      {isLoggedIn && <Navigation userOwner={userOwner} />}
      <Switch>
        {isLoggedIn ? (
          <div
            style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 80,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Route exact path="/">
              <Home userOwner={userOwner} />
            </Route>
            <Route exact path="/profile">
              <Profile
                userOwner={userOwner}
                refreshUserOwner={refreshUserOwner}
              />
            </Route>
            <Redirect from="*" to="/" />
          </div>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

export default AppRouter;
