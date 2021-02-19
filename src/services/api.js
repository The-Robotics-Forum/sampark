import axios from "axios";

export const serverBaseURL = `https://sampark-backend.herokuapp.com`
axios.defaults.baseURL      = serverBaseURL;

// prettier-ignore
var instance = axios.create({
  url     : "/",
  baseURL : serverBaseURL,
  timeout : 4000,
});


export function setTokenHeader(token) {
  console.log("Request headers set")
  console.log(token)
  if (token) {
    instance.interceptors.request.use(function(config) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export function apiCall(method = "GET", path, data = null) {
  return new Promise((resolve, reject) => {
    path = path.replace(/\/\//g, "/");
    method = method.toLowerCase()
    // GET REQUEST
    if (method === "get")
      return instance
        .get(path)
        .then((res) => {
          return resolve(res.data);
        })
        .catch((err) => {
          return reject(err);
        });
    // POST REQUEST
    else if (method === "post")
      instance
        .post(path, data)
        .then((res) => {
          return resolve(res.data);
        })
        .catch((err) => {
          return reject(err);
        });
    else if (method === "patch")
      instance
        .patch(path, data)
        .then((res) => {
          return resolve(res.data);
        })
        .catch((err) => {
          return reject(err);
        });
    else if (method === "delete")
      instance
        .delete(path, data)
        .then((res) => {
          return resolve(res.data);
        })
        .catch((err) => {
          return reject(err);
        });
  });
}
