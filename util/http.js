import axios from "axios";
import { REACT_APP_API_KEY } from "@env";

const API_KEY = process.env.REACT_APP_API_KEY;

const authenticate = async (mode, email, password) => {
  const resp = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=` + API_KEY,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );
  return resp.data.idToken;
};

export const signupUser = (email, password) => {
  return authenticate("signUp", email, password);
};

export const signinUser = (email, password) => {
  return authenticate("signInWithPassword", email, password);
};
