import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  userId,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const checkAuthTimeout = expirationTime => dispatch => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationTime');
  localStorage.removeItem('userId');
  return { type: actionTypes.AUTH_LOGOUT };
};

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
      localStorage.setItem('token', response.data.idToken);
      const expirationTime = new Date(
        new Date().getTime() + response.data.expiresIn * 1000,
      );
      localStorage.setItem('expirationTime', expirationTime);
      localStorage.setItem('userId', response.data.localId);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch(err => {
      dispatch(authFail(err.response.data.error));
    });
};

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

export const authCheckState = () => dispatch => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout());
  } else {
    const expirationTime = new Date(localStorage.getItem('expirationTime'));
    if (expirationTime >= new Date()) {
      const userId = localStorage.getItem('userId');
      dispatch(authSuccess(token, userId));
      dispatch(
        checkAuthTimeout(
          (expirationTime.getTime() - new Date().getTime()) / 1000,
        ),
      );
    } else {
      dispatch(logout());
    }
  }
};
