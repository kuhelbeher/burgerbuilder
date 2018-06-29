import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return initial stat', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: null,
      authRedirectPath: '/',
    });
  });

  it('should store token upon login', () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: null,
          authRedirectPath: '/',
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          token: 'some-token',
          userId: 'some-ID',
        },
      ),
    ).toEqual({
      token: 'some-token',
      userId: 'some-ID',
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });
});
