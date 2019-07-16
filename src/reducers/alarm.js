/* eslint-disable no-param-reassign */
/* eslint-disable indent */
import produce from 'immer';

const initialState = {
  isAddingAlarm: false, // 알람 추가 시도 중
  isAddedAlarm: false, // 알람 추가 성공
  addAlarmErrorReason: '', // 알람 추가 실패 사유

  isGettingAlarm: false, // 알람리스트 가져오는 중
  getAlarmErrorReason: '', // 알람리스트 가져오기 실패 사유

  isGettingAlarmInfo: false, // 알람 정보 가져오는 중
  getAlarmInfoErrorReason: '', // 알람 정보 가져오기 실패 사유

  isUpdatingAlarm: false, // 알람 정보 변경 중
  isUpdatedAlarm: false, // 알람 정보 변경 성공
  updateAlarmErrorReason: '', // 알람 정보 변경 실패 사유

  isDeletingAlarm: false, // 알람 정보 삭제 중
  isDeletedAlarm: false, // 알람 정보 삭제 성공
  deleteAlarmErrorReason: '', // 알람 정보 삭제 실패 사유

  alarmLists: [], // 알람 리스트
  alarmInfo: null, // 알람 정보
};

export const ADD_ALARM = 'ADD_ALARM';
export const ADD_ALARM_SUCCESS = 'ADD_ALARM_SUCCESS';
export const ADD_ALARM_FAILURE = 'ADD_ALARM_FAILURE';

export const GET_ALARM = 'GET_ALARM';
export const GET_ALARM_SUCCESS = 'GET_ALARM_SUCCESS';
export const GET_ALARM_FAILURE = 'GET_ALARM_FAILURE';

export const GET_ALARM_INFO = 'GET_ALARM_INFO';
export const GET_ALARM_INFO_SUCCESS = 'GET_ALARM_INFO_SUCCESS';
export const GET_ALARM_INFO_FAILURE = 'GET_ALARM_INFO_FAILURE';

export const UPDATE_ALARM = 'UPDATE_ALARM';
export const UPDATE_ALARM_SUCCESS = 'UPDATE_ALARM_SUCCESS';
export const UPDATE_ALARM_FAILURE = 'UPDATE_ALARM_FAILURE';

export const DELETE_ALARM = 'DELETE_ALARM';
export const DELETE_ALARM_SUCCESS = 'DELETE_ALARM_SUCCESS';
export const DELETE_ALARM_FAILURE = 'DELETE_ALARM_FAILURE';

export default (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
      // get alarm
      case GET_ALARM: {
        draft.isGettingAlarm = true;
        draft.getAlarmErrorReason = '';
        draft.alarmLists = [];
        break;
      }

      case GET_ALARM_SUCCESS: {
        draft.isGettingAlarm = false;
        draft.getAlarmErrorReason = '';
        draft.alarmLists = action.data;
        break;
      }

      case GET_ALARM_FAILURE: {
        draft.isGettingAlarm = false;
        draft.getAlarmErrorReason = action.error;
        draft.alarmLists = [];
        break;
      }

      // add alarm
      case ADD_ALARM: {
        draft.isAddingAlarm = true;
        draft.isAddedAlarm = false;
        draft.addAlarmErrorReason = '';
        break;
      }

      case ADD_ALARM_SUCCESS: {
        draft.isAddingAlarm = false;
        draft.isAddedAlarm = true;
        draft.addAlarmErrorReason = '';
        break;
      }

      case ADD_ALARM_FAILURE: {
        draft.isAddingAlarm = false;
        draft.isAddedAlarm = false;
        draft.addAlarmErrorReason = action.error;
        break;
      }

      // get alarm info
      case GET_ALARM_INFO: {
        draft.isGettingAlarmInfo = true;
        draft.getAlarmInfoErrorReason = '';
        draft.alarmInfo = null;
        break;
      }

      case GET_ALARM_INFO_SUCCESS: {
        draft.isGettingAlarmInfo = false;
        draft.getAlarmInfoErrorReason = '';
        draft.alarmInfo = action.data;
        break;
      }

      case GET_ALARM_INFO_FAILURE: {
        draft.isGettingAlarmInfo = false;
        draft.getAlarmInfoErrorReason = action.error;
        draft.alarmInfo = null;
        break;
      }

      // update alarm
      case UPDATE_ALARM: {
        draft.isUpdatingAlarm = true;
        draft.isUpdatedAlarm = false;
        draft.updateAlarmErrorReason = '';
        break;
      }

      case UPDATE_ALARM_SUCCESS: {
        draft.isUpdatingAlarm = false;
        draft.isUpdatedAlarm = true;
        draft.updateAlarmErrorReason = '';
        break;
      }

      case UPDATE_ALARM_FAILURE: {
        draft.isUpdatingAlarm = false;
        draft.isUpdatedAlarm = false;
        draft.updateAlarmErrorReason = action.error;
        break;
      }

      // delete alarm
      case DELETE_ALARM: {
        draft.isDeletingAlarm = true;
        draft.isDeletedAlarm = false;
        draft.deleteAlarmErrorReason = '';
        break;
      }

      case DELETE_ALARM_SUCCESS: {
        draft.isDeletingAlarm = false;
        draft.isDeletedAlarm = true;
        draft.deleteAlarmErrorReason = '';
        break;
      }

      case DELETE_ALARM_FAILURE: {
        draft.isDeletingAlarm = false;
        draft.isDeletedAlarm = false;
        draft.deleteAlarmErrorReason = action.error;
        break;
      }

      default: {
        break;
      }
    }
  });
