import axios from "axios";

const BASEURL = import.meta.env.VITE_BASE_URL;
const timeout = "waiting for too long...Aborted!";

const config = {
  baseURL: BASEURL,
  timeoutErrorMessage: timeout,
  // withCredentials: true,
};

const axiosInstance = axios.create(config);

export default axiosInstance;

// AXIONS: it'll help us inject our api into our local url

// VITE_BASE_URL=http://dummyjson.com: This is how people can ahve access to your work, the key, import.meta.env.VITE_BASE_URL (that is the password)

// this is used to make api call
// this is morelike creating a short cut key for our dummyjson to avoid repeatition.


