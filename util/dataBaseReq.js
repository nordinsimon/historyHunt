import { useContext } from "react";

import { AuthContext } from "../store/AuthContext";
const authCtx = useContext(AuthContext);

const url =
  "https://authentication-app-614a8-default-rtdb.europe-west1.firebasedatabase.app/";

export const addNewData = (location, value) => {
  fetch(url + `${location}.json/?auth=` + authCtx.token, {
    method: "POST",
    body: JSON.stringify(value),
  }).then((resp) => {
    console.log("resp", resp);
  });
};

export const addData = (location, key, value) => {
  fetch(url + `${location}/${key}.json/?auth=` + authCtx.token, {
    method: "PUT",
    body: JSON.stringify(value),
  }).then((resp) => {
    console.log("resp", resp);
  });
};

export const getData = async (location) => {
  const resp = await fetch(url + `${location}.json/?auth=` + authCtx.token);
  const data = await resp.json();
  return data;
};
