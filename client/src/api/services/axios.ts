import axios from "axios";
import { store } from "../../../store/store";
import { logout } from "../../auth/slice/authSlice";
import { Navigate } from "react-router-dom";

const BASE_END_POINT = "http://localhost:4000/api/v1/";

const baseURL = BASE_END_POINT;
const Axios = axios.create({ baseURL });
Axios.defaults.baseURL = baseURL;
Axios.defaults.headers["x-app-token"] = "Robosealers-Team";

Axios.interceptors.request.use(async (req: any) => {
  const token = store.getState().auth?.token;

  //don't check the token in login or register
  if (req.url === "login" || req.url === "register") {
    return req;
  }
  req.headers.Authorization = `Bearer ${token}`;
  ///to handle form data
  if (req.data instanceof FormData) {
    req.headers["Content-Type"] = "multipart/form-data";
  }
  return req;
});

Axios.interceptors.response.use(
  (res) => {
    // console.log({ res });
    return res;
  },
  (err) => {
    // console.log({ err });

    if (err?.response?.status === 401 || err?.response?.status === 403) {
      store.dispatch(logout());
      Navigate({ to: "/" });
    } else {
    }
    return Promise.reject(err);
  }
);

export default Axios;
