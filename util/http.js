import axios from "axios";
import { REACT_APP_API_KEY, REACT_APP_GOOGLE_API_KEY } from "@env";

const API_KEY = process.env.REACT_APP_API_KEY;
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export const createLocationUrl = ({ lat, lng }) => {
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng},&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return url;
};

export const getReadableAddress = async ({ lat, lng }) => {
  const resp = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
  );
  if (!resp.ok) {
    throw new Error("Could not fetch readableADRESS");
  }
  const data = await resp.json();
  return data.results[0].formatted_address;
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
