import axios from 'axios';
import Cookies from 'js-cookie';

const Axios = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_API_HOST_ADDRESS
      : process.env.REACT_APP_API_HOST_ADDRESS,
  timeout: 50000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

Axios.interceptors.request.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Axios.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   async function (error) {
//     const request = error.config;

//     if (
//       error.response.status === 401 &&
//       request.baseURL === process.env.REACT_APP_API_HOST_ADDRESS
//     ) {
//       try {
//         let refreshToken = localStorage.getItem('refresh');

//         let success = await Axios.get('/api/users/refresh-token', {
//           withCredentials: true,
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             Authorization: 'Bearer ' + refreshToken,
//           },
//         });
//         if (success.status === 200) {
//           let newToken = localStorage.getItem('token');
//           request.headers.Authorization = `Bearer ${newToken}`;
//           let success = await Axios(request);
//           return success;
//         }
//       } catch (e) {
//         return Promise.reject(error);
//       }
//     }
//   }
// );

export default Axios;
