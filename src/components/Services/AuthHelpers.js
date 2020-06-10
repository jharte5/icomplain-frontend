import Axios from './Axios';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

export const createUser = async userInfo => {
  try {
    let success = await Axios.post('/api/users/create-user', userInfo);

    return success.data;
  } catch (e) {
    console.log(e)
    throw Error(e.response.data.message);
  }
};

export const login = async userStuff => {
  try {
    let success = await Axios.post('/api/users/login', userStuff, {
      withCredentials: true,
    });
      console.log(success)
    return success.data;
  } catch (e) {
    console.log(e);
    throw Error(e.response.data.message);
  }
};

export const isAuthenticated = () => {
  if (typeof window == 'undefined') return false;

  let foundCookie = Cookies.get('jwt-cookie-blog');

  if (foundCookie) {
    return foundCookie;
  } else {
    return false;
  }
};

export const setUserAuth = (jwtToken, dispatch) => {
  let decodedToken = jwt_decode(jwtToken);

  dispatch({
    type: 'SUCCESS_SIGNED_IN',
    payload: decodedToken,
  });
};

export const logout = async () => {
  try {
    await Axios.get('/api/users/logout');
    Cookies.remove('jwt-cookie-blog');
    Cookies.remove('jwt-cookie-refresh-blog');
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

// export const updateProfile = async (profileInfo) => {
//   try {
//     let success = await Axios.
//   }
// }