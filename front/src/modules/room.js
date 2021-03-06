import axios from "axios";
import { useHistory } from "react-router-dom";

// 액션타입
const ROOM_IN = "ROOM_IN";
const ROOM_OUT = "ROOM_OUT";
const ROOM_INFO_UPDATE = "ROOM_INFO_UPDATE";

//초기값
const initialState = {
  room: {
    title: "",
    gametype: "",
    peoplemaxnum: -1,
    roomid: 0,
  },
};

//액션 생성함수
export const roomin = (roomid) => {
  return {
    type: ROOM_IN,
    roomid,
  };
};

export const roomout = () => {
  return {
    type: ROOM_OUT,
  };
};

export const roomInfoUpdate = (roomid) => {
  return {
    type: ROOM_INFO_UPDATE,
    roomid,
  };
};

//thunk (middleware)
export const roomCreateRequest = (title, password, gametype, peoplemaxnum) => (
  dispatch
) => {
  //방 만들면 방번호 서버에서 리턴해줘야됨
  return axios({
    method: "POST",
    url: "http://localhost:5000/roomnumber",
    data: {
      userid: JSON.parse(sessionStorage.userInfo).username,
      title,
      password,
      gametype,
      peoplemaxnum,
    },
  }).then((res) => {
    return dispatch(roomin(res.data.roomnum));
  });
};

export const roomInRequest = (roomid, password) => (dispatch) => {
  return axios({
    method: "POST",
    url: "http://localhost:5000/roominchk",
    data: {
      userid: JSON.parse(sessionStorage.userInfo).username,
      roomid,
      password,
    },
  })
    .then((res) => {
      if (res.data.success) return dispatch(roomin(roomid));
    })
    .catch((e) => {
      //e.response.data
      if (e.response.data.error == 4) {
        return { roomid: 0, error: 4 };
      } else if (e.response.data.error == 5) {
        return { roomid: 0, error: 5 };
      }
      return { roomid: 0 };
    });
};

export const roomOutRequest = (roomid) => (dispatch) => {
  return axios({
    method: "POST",
    url: "http://localhost:5000/roomout",
    data: {
      roomid,
      userid: JSON.parse(sessionStorage.userInfo).username,
    },
  }).then((res) => {
    if (res.data.success) return dispatch(roomout());
  });
};

export const roomInfoRequest = (roomid) => (dispatch) => {
  return dispatch(roomInfoUpdate(roomid));
};

//리듀서
const room = (state = initialState, action) => {
  switch (action.type) {
    case ROOM_IN:
      sessionStorage.setRoomId = action.roomid;
      return {
        ...state,
        room: {
          roomid: action.roomid,
        },
      };
    case ROOM_OUT:
      sessionStorage.removeItem("setRoomId");
      return {
        ...state,
        room: {
          title: "",
          gametype: "",
          peoplemaxnum: -1,
          roomid: 0,
        },
      };
    case ROOM_INFO_UPDATE:
      return {
        ...state,
        room: {
          roomid: action.roomid,
        },
      };
    default:
      return state;
  }
};

export default room;
