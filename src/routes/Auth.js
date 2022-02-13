import AuthForm from "./AuthForm";
import AuthSocial from "./AuthSocial";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Auth = () => {
  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="2x"
        style={{ marginBottom: 35 }}
      />
      <AuthForm />

      <AuthSocial />
    </div>
  );
};
export default Auth;
