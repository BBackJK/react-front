/* eslint-disable no-param-reassign */
/* eslint-disable indent */
import produce from 'immer';

const initialState = {
  isSending: false, // 메세지 전송 시도 중
  isSended: false, // 메세지 전송 성공
  sendErrorReason: '', // 메세지 전송 실패 사유

  isGettingReceive: false, // 수신 메시지 가져오는 중
  getReceiveErrorReason: '', // 수신 메세지 가져오기 실패 사유

  isGettingReceiveInfo: false, // 수신 메세지 정보 가져오는 중
  getReceiveInfoErrorReason: '', // 수신 메세지 정보 가져오기 실패 사유

  isReading: false, // 수신 메세지 읽는 중
  isReaded: false, // 수신 메세지 읽기 성공
  readErrorReason: '', // 수신 메세지 읽기 실패 사유

  receiveMessageLists: [], // 수신 메세지 리스트
  receiveMessageInfo: null, // 수신 메세지 정보
};

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';

export const GET_RECEIVE_MESSAGE = 'GET_RECEIVE_MESSAGE';
export const GET_RECEIVE_MESSAGE_SUCCESS = 'GET_RECEIVE_MESSAGE_SUCCESS';
export const GET_RECEIVE_MESSAGE_FAILURE = 'GET_RECEIVE_MESSAGE_FAILURE';

export const GET_RECEIVE_MESSAGE_INFO = 'GET_RECEIVE_MESSAGE_INFO';
export const GET_RECEIVE_MESSAGE_INFO_SUCCESS =  'GET_RECEIVE_MESSAGE_INFO_SUCCESS';
export const GET_RECEIVE_MESSAGE_INFO_FAILURE =  'GET_RECEIVE_MESSAGE_INFO_FAILURE';

export const READ_RECEIVE_MESSAGE = 'READ_MESSAGE';
export const READ_RECEIVE_MESSAGE_SUCCESS = 'READ_MESSAGE_SUCCESS';
export const READ_RECEIVE_MESSAGE_FAILURE = 'READ_MESSAGE_FAILURE';

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

      // get receive message lists
      case GET_RECEIVE_MESSAGE: {
        draft.isGettingReceive = true;
        draft.getReceiveErrorReason = '';
        draft.receiveMessageLists = [];
        break;
      }

      case GET_RECEIVE_MESSAGE_SUCCESS: {
        draft.isGettingReceive = false;
        draft.getReceiveErrorReason = '';
        draft.receiveMessageLists = action.data;
        break;
      }

      case GET_RECEIVE_MESSAGE_FAILURE: {
        draft.isGettingReceive = false;
        draft.getReceiveErrorReason = action.error;
        draft.receiveMessageLists = [];
        break;
      }

      // get receive message info
      case GET_RECEIVE_MESSAGE_INFO: {
        draft.isGettingReceiveInfo = true;
        draft.getReceiveInfoErrorReason = '';
        draft.receiveMessageInfo = null;
        break;
      }

      case GET_RECEIVE_MESSAGE_INFO_SUCCESS: {
        draft.isGettingReceiveInfo = false;
        draft.getReceiveInfoErrorReason = '';
        draft.receiveMessageInfo = action.data;
        break;
      }

      case GET_RECEIVE_MESSAGE_INFO_FAILURE: {
        draft.isGettingReceiveInfo = true;
        draft.getReceiveInfoErrorReason = action.error;
        draft.receiveMessageInfo = null;
        break;
      }

      // read receive message
      case READ_RECEIVE_MESSAGE: {
        draft.isReading = true;
        draft.isReaded = false;
        draft.readErrorReason = '';
        break;
      }

      case READ_RECEIVE_MESSAGE_SUCCESS: {
        draft.isReading = false;
        draft.isReaded = true;
        draft.readErrorReason = '';
        break;
      }

      case READ_RECEIVE_MESSAGE_FAILURE: {
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
