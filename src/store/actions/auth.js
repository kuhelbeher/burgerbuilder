import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = authData => ({
  type: actionTypes.AUTH_SUCCESS,
  authData,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const auth = (email, password, isSignup) => dispatch => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  let url =
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAb2Rydf9fBk0rJiZ-SzaF7TYWYvxcjakY';
  if (!isSignup) {
    url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAb2Rydf9fBk0rJiZ-SzaF7TYWYvxcjakY';
  }
  axios
    .post(url, authData)
    .then(response => {
      console.log(response);
      dispatch(authSuccess(response.data));
    })
    .catch(err => {
      console.log(err);
      dispatch(authFail(err));
    });
};
