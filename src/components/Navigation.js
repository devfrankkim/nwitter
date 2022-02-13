import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

function Navigation({ userOwner }) {
  return (
    <nav>
      <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <li>
          <Link to="/" style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
          </Link>
        </li>
        <li>
          {userOwner &&
            (userOwner.displayName ? (
              <Link to="/profile">{userOwner.displayName}'s profile</Link>
            ) : (
              <Link to="/profile"> {userOwner.email} </Link>
            ))}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
