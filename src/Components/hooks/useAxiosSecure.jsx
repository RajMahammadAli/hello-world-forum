import axios from "axios";

export const axiosSecure = axios.create({
  baseURL: "https://hello-world-server-side.vercel.app",
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
