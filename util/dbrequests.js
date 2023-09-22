
const url =
  "https://historyhunt-affe2-default-rtdb.europe-west1.firebasedatabase.app/";

export const addNewData = (location, value) => {
  fetch(url + `${location}.json`, {
    method: "POST",
    body: JSON.stringify(value),
  }).then((resp) => {
    console.log("resp", resp);
  });
};

export const addData = (location, key, value) => {
  fetch(url + `${location}/${key}.json` , {
    method: "PUT",
    body: JSON.stringify(value),
  }).then((resp) => {
    console.log("resp", resp);
  });
};

export const getData = async (location) => {
  const resp = await fetch(url + `${location}.json`);
  const data = await resp.json();
  return data;
};