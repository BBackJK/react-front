/* eslint-disable no-param-reassign */
/* eslint-disable indent */

import produce from 'immer';

const initialState = {
  isLoggingOut: false, // 로그아웃 시도중
  isLoggingIn: false, // 로그인 시도중
  loginErrorReason: '', // 로그인 실패 이유
  isSignedUp: false, // 회원가입 성공
  isSigningUp: false, // 회원가입 시도중
  signUpErrorReason: '', // 회원가입 실패 이유
  info: null, // 내 정보
};

export const LOG_IN = 'LOG_IN';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT = 'LOG_OUT';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCESS = 'SUGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SUGN_UP_FAILURE';

export default (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN: {
        draft.isLoggingIn = true;
        draft.loginErrorReason = '';
        break;
      }

      case LOG_IN_SUCCESS: {
        draft.isLoggingIn = false;
        draft.loginErrorReason = '';
        draft.info = action.data;
        break;
      }

      case LOG_IN_FAILURE: {
        draft.isLoggingIn = false;
        draft.loginErrorReason = action.error;
        draft.info = null;
        break;
      }

      case LOG_OUT: {
        draft.isLoggingOut = true;
        break;
      }

      case LOG_OUT_SUCCESS: {
        draft.isLoggingOut = false;
        draft.info = null;
        break;
      }

      case LOG_OUT_FAILURE: {
        draft.isLoggingOut = false;
        break;
      }

      case SIGN_UP: {
        draft.isSigningUp = true;
        draft.isSignedUp = false;
        draft.signUpErrorReason = '';
        break;
      }

      case SIGN_UP_SUCCESS: {
        draft.isSigningUp = false;
        draft.isSignedUp = true;
        draft.signUpErrorReason = '';
        break;
      }

      case SIGN_UP_FAILURE: {
        draft.isSigningUp = false;
        draft.isSignedUp = false;
        draft.signUpErrorReason = action.error;
        break;
      }

      default: {
        break;
      }
    }
  });
