import axios from "axios";
import { REACT_APP_API_KEY, REACT_APP_GOOGLE_API_KEY } from "@env";

const API_KEY = process.env.REACT_APP_API_KEY;
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export const createLocationUrl = ({ lat, lng }) => {
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng},&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  console.log("Generated url", url);
  return url;
};

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
