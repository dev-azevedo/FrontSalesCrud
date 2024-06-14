import axios from "axios";

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});


// export const setupInterceptors = (router) => {
//   api.interceptors.response.use(
//     response => {
//       return response;
//     },
//     error => {
//       if (error.response && error.response.status === 401) {
//         router.push("/inicio");
//       }
//       return Promise.reject(error);
//     }
//   );
// }


export default api;
