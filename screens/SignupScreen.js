import { useContext, useState } from "react";

import AuthContent from "../components/auth/AuthContent.js";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import * as http from "../util/http";
import { AuthContext } from "../store/AuthContext";

const SignupScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  const authenticationHandler = async ({ email, password, displayName }) => {
    setIsAuthenticating(true);
    try {
      const data = await http.signupUser(email, password, displayName);
      const token = data.idToken;
      authCtx.authenticate(token);
      authCtx.setUsername(data.displayName);
    } catch (error) {
      console.log(error);
      alert("Wrong credentials");
    }
    setIsAuthenticating(false);
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={authenticationHandler} />;
};

export default SignupScreen;
