/* eslint-disable no-param-reassign */
/* eslint-disable indent */
import produce from 'immer';

const initialState = {
  isFollowering: false, // 친구 목록 가져오는 중
  isFollowered: false, // 친구 목록 가져오기 성공
  followerErrorReason: '', // 친구 목록 가져오기 실패 사유

  isFolloweding: false, // 친구 요청 목록 가져오는 중
  isFolloweded: false, // 친구 요청 목록 가져오기 성공
  followedErrorReason: '', // 친구 요청 목록 가져오기 실패 사유

  isAddingFollow: false, // 친구 추가 시도중
  isAddedFollow: false, // 친구 추가 성공
  addFollowErrorReason: '', // 친구 추가 실패 사유

  isAcceptingFollow: false, // 친구 요청 수락 시도중
  isAcceptedFollow: false, // 친구 요청 수락 성공
  acceptFollowErrorReason: '', // 친구 요청 수락 실패 사유

  isDeletingFollow: false, // 친구 삭제 시도중
  isDeletedFollow: false, // 친구 삭제 성공
  deleteFollowErrorReason: '', // 친구 삭제 실패 사유

  follower: [], // 친구 목록
  followed: [], // 친구 요청 목록
};

export const ADD_FOLLOW = 'ADD_FOLLOW';
export const ADD_FOLLOW_SUCCESS = 'ADD_FOLLOW_SUCCESS';
export const ADD_FOLLOW_FAILURE = 'ADD_FOLLOW_FAILURE';

export const ACCEPT_FOLLOWED = 'ACCEPT_FOLLOWED';
export const ACCEPT_FOLLOWED_SUCCESS = 'ACCEPT_FOLLOWED_SUCCESS';
export const ACCEPT_FOLLOWED_FAILURE = 'ACCEPT_FOLLOWED_FAILURE';

export const GET_FOLLOWER = 'GET_FOLLOWER';
export const GET_FOLLOWER_SUCCESS = 'GET_FOLLOWER_SUCCESS';
export const GET_FOLLOWER_FAILURE = 'GET_FOLLOWER_FAILURE';

export const GET_FOLLOWED = 'GET_FOLLOWED';
export const GET_FOLLOWED_SUCCESS = 'GET_FOLLOWED_SUCCESS';
export const GET_FOLLOWED_FAILURE = 'GET_FOLLOWED_FAILURE';

export const DELETE_FOLLOWER = 'DELETE_FOLLOWER';
export const DELETE_FOLLOWER_SUCCESS = 'DELETE_FOLLOWER_SUCCESS';
export const DELETE_FOLLOWER_FAILURE = 'DELETE_FOLLOWER_FAILURE';

export default (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
      // add user
      case ADD_FOLLOW: {
        draft.isAddingFollow = true;
        draft.isAddedFollow = false;
        draft.addFollowErrorReason = '';
        break;
      }

      case ADD_FOLLOW_SUCCESS: {
        draft.isAddingFollow = false;
        draft.isAddedFollow = true;
        draft.addFollowErrorReason = '';
        break;
      }

      case ADD_FOLLOW_FAILURE: {
        draft.isAddingFollow = false;
        draft.isAddedFollow = false;
        draft.addFollowErrorReason = action.error;
        break;
      }

      // get followers
      case GET_FOLLOWER: {
        draft.isFollowering = true;
        draft.isFollowered = false;
        draft.followerErrorReason = '';
        draft.follower = [];
        break;
      }

      case GET_FOLLOWER_SUCCESS: {
        draft.isFollowering = false;
        draft.isFollowered = true;
        draft.followerErrorReason = '';
        draft.follower = action.data;
        break;
      }

      case GET_FOLLOWER_FAILURE: {
        draft.isFollowering = false;
        draft.isFollowered = false;
        draft.followerErrorReason = action.error;
        draft.follower = [];
        break;
      }

      // get followeds
      case GET_FOLLOWED: {
        draft.isFolloweding = true;
        draft.isFolloweded = false;
        draft.followedErrorReason = '';
        draft.followed = [];
        break;
      }

      case GET_FOLLOWED_SUCCESS: {
        draft.isFolloweding = false;
        draft.isFolloweded = true;
        draft.followedErrorReason = '';
        draft.followed = action.data;
        break;
      }

      case GET_FOLLOWED_FAILURE: {
        draft.isFolloweding = false;
        draft.isFolloweded = false;
        draft.followedErrorReason = action.error;
        draft.followed = [];
        break;
      }

      // accept followed
      case ACCEPT_FOLLOWED: {
        draft.isAcceptingFollow = true;
        draft.isAcceptedFollow = false;
        draft.acceptFollowErrorReason = '';
        break;
      }

      case ACCEPT_FOLLOWED_SUCCESS: {
        draft.isAcceptingFollow = false;
        draft.isAcceptedFollow = true;
        draft.acceptFollowErrorReason = '';
        break;
      }

      case ACCEPT_FOLLOWED_FAILURE: {
        draft.isAcceptingFollow = false;
        draft.isAcceptedFollow = false;
        draft.acceptFollowErrorReason = action.error;
        break;
      }

      // delete follower
      case DELETE_FOLLOWER: {
        draft.isDeletingFollow = true;
        draft.isDeletedFollow = false;
        draft.deleteFollowErrorReason = '';
        break;
      }

      case DELETE_FOLLOWER_SUCCESS: {
        draft.isDeletingFollow = false;
        draft.isDeletedFollow = true;
        draft.deleteFollowErrorReason = '';
        break;
      }

      case DELETE_FOLLOWER_FAILURE: {
        draft.isDeletingFollow = false;
        draft.isDeletedFollow = false;
        draft.deleteFollowErrorReason = action.error;
        break;
      }

      default: {
        break;
      }
    }
  });
