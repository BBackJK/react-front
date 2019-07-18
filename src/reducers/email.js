/* eslint-disable no-param-reassign */
/* eslint-disable indent */
import produce from 'immer';

const initialState = {
  isSendingEmail: false, // 이메일 전송 시도 중
  isSendedEmail: false, // 이메일 전송 성공
  sendEmailErrorReason: '', // 이메일 전송 실패 사유

  isAuthingEmail: false, // 이메일 인증 시도 중
  isAuthedEmail: false, // 이메일 인증 성공
  authEmailErrorReason: '', // 이메일 인증 실패 사유
};

export const SEND_EMAIL = 'SEND_EMAIL';
export const SEND_EMAIL_SUCCESS = 'SEND_EMAIL_SUCCESS';
export const SEND_EMAIL_FAILURE = 'SEND_EMAIL_FAILURE';

export const AUTH_EMAIL = 'AUTH_EMAIL';
export const AUTH_EMAIL_SUCCESS = 'AUTH_EMAIL_SUCCESS';
export const AUTH_EMAIL_FAILURE = 'AUTH_EMAIL_FAILURE';

export default (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
      case SEND_EMAIL: {
        draft.isSendingEmail = true;
        draft.isSendedEmail = false;
        draft.sendEmailErrorReason = '';
        break;
      }

      case SEND_EMAIL_SUCCESS: {
        draft.isSendingEmail = false;
        draft.isSendedEmail = true;
        draft.sendEmailErrorReason = '';
        break;
      }

      case SEND_EMAIL_FAILURE: {
        draft.isSendingEmail = false;
        draft.isSendedEmail = false;
        draft.sendEmailErrorReason = action.error;
        break;
      }

      case AUTH_EMAIL: {
        draft.isAuthingEmail = true;
        draft.isAuthedEmail = false;
        draft.authEmailErrorReason = '';
        break;
      }

      case AUTH_EMAIL_SUCCESS: {
        draft.isAuthingEmail = false;
        draft.isAuthedEmail = true;
        draft.authEmailErrorReason = '';
        break;
      }

      case AUTH_EMAIL_FAILURE: {
        draft.isAuthingEmail = false;
        draft.isAuthedEmail = false;
        draft.authEmailErrorReason = action.error;
        break;
      }
      default: {
        break;
      }
    }
  });
