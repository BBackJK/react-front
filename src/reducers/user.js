/* eslint-disable no-param-reassign */
/* eslint-disable indent */
import produce from 'immer';

const initialState = {
  isLoggingOut: false, // 로그아웃 시도중
  isLoggedOut: false, // 로그아웃 성공

  isLoggingIn: false, // 로그인 시도중
  loggingInEmail: null, // 로그인 시도 이메일
  loginErrorReason: '', // 로그인 실패 이유

  isSignedUp: false, // 회원가입 성공
  isSigningUp: false, // 회원가입 시도중
  signUpErrorReason: '', // 회원가입 실패 이유

  isUpdating: false, // 정보 변경 시도중
  isUpdated: false, // 정보 변경 성공
  updateErrorReason: '', // 정보 변경 실패 사유

  infoGetting: false, // 정보 얻어오는 중
  infoGetErrorReason: '', // 정보 얻기 실패 사유

  isDeleting: false, // 회원 탈퇴 중
  isDeleted: false, // 회원 탈퇴 성공
  deleteErrorReason: '', // 회원 탈퇴 실패 사유

  isSearching: false, // 회원 검색 중
  isSearched: false, // 회원 검색 성공
  searchErrorReason: '', // 회원 검색 실패 사유

  token: null, // 내 토큰
  info: null, // 내 정보
  searchUserData: null, // 유저 검색 정보
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

export const GET_INFO = 'GET_INFO';
export const GET_INFO_SUCCESS = 'GET_INFO_SUCCESS';
export const GET_INFO_FAILURE = 'GET_INFO_FAILURE';

export const INFO_UPDATE = 'INFO_UPDATE';
export const INFO_UPDATE_SUCCESS = 'INFO_UPDATE_SUCCESS';
export const INFO_UPDATE_FAILURE = 'INFO_UPDATE_FAILURE';

export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export const SEARCH_USER = 'SEARCH_USER';
export const SEARCH_USER_SUCCESS = 'SEARCH_USER_SUCCESS';
export const SEARCH_USER_FAILURE = 'SEARCH_USER_FAILURE';

export default (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
      // log in
      case LOG_IN: {
        draft.isLoggingIn = true;
        draft.isLoggedOut = false;
        draft.isLoggingOut = false;
        draft.loginErrorReason = '';
        draft.loggingInEmail = null;
        break;
      }

      case LOG_IN_SUCCESS: {
        draft.isLoggingIn = false;
        draft.loginErrorReason = '';
        draft.token = action.data;
        draft.loggingInEmail = null;
        break;
      }

      case LOG_IN_FAILURE: {
        draft.isLoggingIn = false;
        draft.loginErrorReason = action.error;
        draft.token = null;
        draft.loggingInEmail = action.data;
        break;
      }

      // log out
      case LOG_OUT: {
        draft.isLoggingOut = true;
        draft.isLoggedOut = false;
        break;
      }

      case LOG_OUT_SUCCESS: {
        draft.isLoggingOut = false;
        draft.isLoggedOut = true;
        draft.token = null;
        draft.info = null;
        break;
      }

      case LOG_OUT_FAILURE: {
        draft.isLoggingOut = false;
        draft.isLoggedOut = false;
        break;
      }

      // sign up
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

      // get info
      case GET_INFO: {
        draft.infoGetting = true;
        draft.infoGetErrorReason = '';
        draft.info = null;
        break;
      }

      case GET_INFO_SUCCESS: {
        draft.infoGetting = false;
        draft.infoGetErrorReason = '';
        draft.info = action.data;
        break;
      }

      case GET_INFO_FAILURE: {
        draft.infoGetting = false;
        draft.infoGetErrorReason = action.error;
        draft.info = null;
        break;
      }

      // update info
      case INFO_UPDATE: {
        draft.isUpdating = true;
        draft.isUpdated = false;
        draft.updateErrorReason = '';
        break;
      }

      case INFO_UPDATE_SUCCESS: {
        draft.isUpdating = false;
        draft.isUpdated = true;
        draft.updateErrorReason = '';
        draft.info = action.data;
        break;
      }

      case INFO_UPDATE_FAILURE: {
        draft.isUpdating = false;
        draft.isUpdated = false;
        draft.updateErrorReason = action.error;
        break;
      }

      // delete user
      case DELETE_USER: {
        draft.isDeleting = true;
        draft.isDeleted = false;
        draft.deleteErrorReason = '';
        break;
      }

      case DELETE_USER_SUCCESS: {
        draft.isDeleting = false;
        draft.isDeleted = true;
        draft.deleteErrorReason = '';
        draft.info = null;
        draft.token = null;
        break;
      }

      case DELETE_USER_FAILURE: {
        draft.isDeleting = false;
        draft.isDeleted = false;
        draft.deleteErrorReason = action.error;
        break;
      }

      // search user
      case SEARCH_USER: {
        draft.isSearching = true;
        draft.isSearched = false;
        draft.searchErrorReason = '';
        draft.searchUserData = null;
        break;
      }

      case SEARCH_USER_SUCCESS: {
        draft.isSearching = false;
        draft.isSearched = true;
        draft.searchErrorReason = '';
        draft.searchUserData = action.data;
        break;
      }

      case SEARCH_USER_FAILURE: {
        draft.isSearching = false;
        draft.isSearched = false;
        draft.searchErrorReason = action.error;
        draft.searchUserData = null;
        break;
      }
      default: {
        break;
      }
    }
  });
