import React, { useEffect } from "react";
import { userInfoRequest } from "../modules/auth";
import { roomInfoRequest } from "../modules/room";
import { useDispatch } from "react-redux";

const BaseContainer = () => {
  const dispatch = useDispatch();

  const checkUser = () => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const roomId = sessionStorage.setRoomId;
    if (userInfo) {
      //원래는 인자로 토큰만 넣으면되는데 테스트용으로 이름이랑 닉네임 넣어줌
      dispatch(
        userInfoRequest(userInfo.username, userInfo.nickname, userInfo.token)
      );
    }

    if(roomId){
      dispatch(roomInfoRequest(roomId));
    }
  };

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return <div></div>;
};

export default BaseContainer;
