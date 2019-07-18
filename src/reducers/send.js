/* eslint-disable no-param-reassign */
/* eslint-disable indent */
import produce from 'immer';

const initialState = {
  isSending: false, // 메세지 전송 시도 중
  isSended: false, // 메세지 전송 성공
  sendErrorReason: '', // 메세지 전송 실패 사유

  isGettingRecieve: false, // 수신 메시지 가져오는 중
  getRecieveErrorReason: '', // 수신 메세지 가져오기 실패 사유

  isGettingRecieveInfo: false, // 수신 메세지 정보 가져오는 중
  getRecieveInfoErrorReason: '', // 수신 메세지 정보 가져오기 실패 사유

  isReading: false, // 수신 메세지 읽는 중
  isReaded: false, // 수신 메세지 읽기 성공
  readErrorReason: '', // 수신 메세지 읽기 실패 사유

  recieveMessageLists: [], // 수신 메세지 리스트
  recieveMessageInfo: null, // 수신 메세지 정보
};

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';

export const GET_RECIEVE_MESSAGE = 'GET_RECIEVE_MESSAGE';
export const GET_RECIEVE_MESSAGE_SUCCESS = 'GET_RECIEVE_MESSAGE_SUCCESS';
export const GET_RECIEVE_MESSAGE_FAILURE = 'GET_RECIEVE_MESSAGE_FAILURE';

export const GET_RECIEVE_MESSAGE_INFO = 'GET_RECIEVE_MESSAGE_INFO';
export const GET_RECIEVE_MESSAGE_INFO_SUCCESS =  'GET_RECIEVE_MESSAGE_INFO_SUCCESS';
export const GET_RECIEVE_MESSAGE_INFO_FAILURE =  'GET_RECIEVE_MESSAGE_INFO_FAILURE';

export const READ_RECIEVE_MESSAGE = 'READ_MESSAGE';
export const READ_RECIEVE_MESSAGE_SUCCESS = 'READ_MESSAGE_SUCCESS';
export const READ_RECIEVE_MESSAGE_FAILURE = 'READ_MESSAGE_FAILURE';

export default (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
      // send message
      case SEND_MESSAGE: {
        draft.isSending = true;
        draft.isSended = false;
        draft.sendErrorReason = '';
        break;
      }

      case SEND_MESSAGE_SUCCESS: {
        draft.isSending = false;
        draft.isSended = true;
        draft.sendErrorReason = '';
        break;
      }

      case SEND_MESSAGE_FAILURE: {
        draft.isSending = false;
        draft.isSended = false;
        draft.sendErrorReason = action.error;
        break;
      }

      // get recieve message lists
      case GET_RECIEVE_MESSAGE: {
        draft.isGettingRecieve = true;
        draft.getRecieveErrorReason = '';
        draft.recieveMessageLists = [];
        break;
      }

      case GET_RECIEVE_MESSAGE_SUCCESS: {
        draft.isGettingRecieve = false;
        draft.getRecieveErrorReason = '';
        draft.recieveMessageLists = action.data;
        break;
      }

      case GET_RECIEVE_MESSAGE_FAILURE: {
        draft.isGettingRecieve = false;
        draft.getRecieveErrorReason = action.error;
        draft.recieveMessageLists = [];
        break;
      }

      // get recieve message info
      case GET_RECIEVE_MESSAGE_INFO: {
        draft.isGettingRecieveInfo = true;
        draft.getRecieveInfoErrorReason = '';
        draft.recieveMessageInfo = null;
        break;
      }

      case GET_RECIEVE_MESSAGE_INFO_SUCCESS: {
        draft.isGettingRecieveInfo = false;
        draft.getRecieveInfoErrorReason = '';
        draft.recieveMessageInfo = action.data;
        break;
      }

      case GET_RECIEVE_MESSAGE_INFO_FAILURE: {
        draft.isGettingRecieveInfo = true;
        draft.getRecieveInfoErrorReason = action.error;
        draft.recieveMessageInfo = null;
        break;
      }

      // read recieve message
      case READ_RECIEVE_MESSAGE: {
        draft.isReading = true;
        draft.isReaded = false;
        draft.readErrorReason = '';
        break;
      }

      case READ_RECIEVE_MESSAGE_SUCCESS: {
        draft.isReading = false;
        draft.isReaded = true;
        draft.readErrorReason = '';
        break;
      }

      case READ_RECIEVE_MESSAGE_FAILURE: {
        draft.isReading = false;
        draft.isReaded = false;
        draft.readErrorReason = action.error;
        break;
      }

      default: {
        break;
      }
    }
  });
