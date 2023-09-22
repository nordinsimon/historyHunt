import { useContext, useState } from "react";

import AuthContent from "../components/auth/AuthContent.js";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import * as http from "../util/http";
import { AuthContext } from "../store/AuthContext";

const LoginScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  const authenticationHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const data = await http.signinUser(email, password);
      const token = data.idToken;
      authCtx.authenticate(token);
      authCtx.setUsername(data.displayName);
    } catch (error) {
      alert("Wrong credentials");
    }
    setIsAuthenticating(false);
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging in user..." />;
  }

  return <AuthContent isLogin onAuthenticate={authenticationHandler} />;
};

export default LoginScreen;
