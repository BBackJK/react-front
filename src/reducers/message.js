/* eslint-disable no-param-reassign */
/* eslint-disable indent */
import produce from 'immer';

const initialState = {
  isAddingMsg: false, // 메세지 추가 시도 중
  isAddedMsg: false, // 메세지 추가 성공
  addMsgErrorReason: '', // 메세지 추가 실패 사유

  isGettingMsg: false, // 메세지 리스트 가져오는 중
  getMsgErrorReason: '', // 메세지 리스트 가져오기 실패 사유

  isGettingMsgInfo: false, // 메세지 정보 가져오는 중
  getMsgInfoErrorReason: '', // 메세지 정보 가져오기 실패 사유

  isUpdatingMsg: false, // 메세지 변경 시도 중
  isUpdatedMsg: false, // 메세지 변경 성공
  updateMsgErrorReason: '', // 메세지 변경 실패 사유

  isDeletingMsg: false, // 메세지 삭제 시도 중
  isDeletedMsg: false, // 메세지 삭제 성공
  deleteMsgErrorReason: '', // 메세지 삭제 실패 사유

  messages: [], // 메시지 리스트
  messageInfo: null, // 메시지 정보
};

export const ADD_MSG = 'ADD_MSG';
export const ADD_MSG_SUCCESS = 'ADD_MSG_SUCCESS';
export const ADD_MSG_FAILURE = 'ADD_MSG_FAILURE';

export const GET_MSG = 'GET_MSG';
export const GET_MSG_SUCCESS = 'GET_MSG_SUCCESS';
export const GET_MSG_FAILURE = 'GET_MSG_FAILURE';

export const GET_MSG_INFO = 'GET_MSG_INFO';
export const GET_MSG_INFO_SUCCESS = 'GET_MSG_INFO_SUCCESS';
export const GET_MSG_INFO_FAILURE = 'GET_MSG_INFO_FAILURE';

export const UPDATE_MSG = 'UPDATE_MSG';
export const UPDATE_MSG_SUCCESS = 'UPDATE_MSG_SUCCESS';
export const UPDATE_MSG_FAILURE = 'UPDATE_MSG_FAILURE';

export const DELETE_MSG = 'DELETE_MSG';
export const DELETE_MSG_SUCCESS = 'DELETE_MSG_SUCCESS';
export const DELETE_MSG_FAILURE = 'DELETE_MSG_FAILURE';

export default (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
      // add message
      case ADD_MSG: {
        draft.isAddingMsg = true;
        draft.isAddedMsg = false;
        draft.addMsgErrorReason = '';
        break;
      }

      case ADD_MSG_SUCCESS: {
        draft.isAddingMsg = false;
        draft.isAddedMsg = true;
        draft.addMsgErrorReason = '';
        break;
      }

      case ADD_MSG_FAILURE: {
        draft.isAddingMsg = false;
        draft.isAddedMsg = false;
        draft.addMsgErrorReason = action.error;
        break;
      }

      // get message list
      case GET_MSG: {
        draft.isGettingMsg = true;
        draft.getMsgErrorReason = '';
        draft.messages = [];
        break;
      }

      case GET_MSG_SUCCESS: {
        draft.isGettingMsg = false;
        draft.getMsgErrorReason = '';
        draft.messages = action.data;
        break;
      }

      case GET_MSG_FAILURE: {
        draft.isGettingMsg = false;
        draft.getMsgErrorReason = action.error;
        draft.messages = [];
        break;
      }

      // get message info
      case GET_MSG_INFO: {
        draft.isGettingMsgInfo = true;
        draft.getMsgInfoErrorReason = '';
        draft.messageInfo = null;
        break;
      }

      case GET_MSG_INFO_SUCCESS: {
        draft.isGettingMsgInfo = false;
        draft.getMsgInfoErrorReason = '';
        draft.messageInfo = action.data;
        break;
      }

      case GET_MSG_INFO_FAILURE: {
        draft.isGettingMsgInfo = false;
        draft.getMsgInfoErrorReason = action.error;
        draft.messageInfo = null;
        break;
      }

      // update message
      case UPDATE_MSG: {
        draft.isUpdatingMsg = true;
        draft.isUpdatedMsg = false;
        draft.updateMsgErrorReason = '';
        break;
      }

      case UPDATE_MSG_SUCCESS: {
        draft.isUpdatingMsg = false;
        draft.isUpdatedMsg = true;
        draft.updateMsgErrorReason = '';
        break;
      }

      case UPDATE_MSG_FAILURE: {
        draft.isUpdatingMsg = false;
        draft.isUpdatedMsg = false;
        draft.updateMsgErrorReason = action.error;
        break;
      }

      // delete message
      case DELETE_MSG: {
        draft.isDeletingMsg = true;
        draft.isDeletedMsg = false;
        draft.deleteMsgErrorReason = '';
        break;
      }

      case DELETE_MSG_SUCCESS: {
        draft.isDeletingMsg = false;
        draft.isDeletedMsg = true;
        draft.deleteMsgErrorReason = '';
        break;
      }

      case DELETE_MSG_FAILURE: {
        draft.isDeletingMsg = false;
        draft.isDeletedMsg = false;
        draft.deleteMsgErrorReason = action.error;
        break;
      }

      default: {
        break;
      }
    }
  });
