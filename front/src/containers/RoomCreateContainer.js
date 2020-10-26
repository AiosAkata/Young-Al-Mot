import React, { useState } from "react";
import { useDispatch } from "react-redux";

import RoomCreate from "../components/RoomCreate";
import RoomContainer from "./RoomContainer";
import { roomCreateRequest, roomInRequest } from "../modules/room";


const RoomCreateContainer = () => {
  // 방제목 비밀번호 게임 인원수
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [gametype, setGametype] = useState("십자말풀이");
  const [peopleMaxNum, setPeopleMaxNum] = useState(0);
  const dispatch = useDispatch();


  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeGametype = (e) => {
    setGametype(e.target.value);
  };
  const handleChangePeopleMaxNum = (e) => {
    setPeopleMaxNum(e.target.value);
  };

  const handleCreateroom = (e) => {
    dispatch(roomCreateRequest(
      title,
      password,
      gametype,
      peopleMaxNum
    )).then((res) => {
      
    });
  };

  return (
    <RoomCreate
      title={title}
      password={password}
      gametype={gametype}
      peopleMaxNum={peopleMaxNum}
      handleChangeTitle={handleChangeTitle}
      handleChangePassword={handleChangePassword}
      handleChangeGametype={handleChangeGametype}
      handleChangePeopleNum={handleChangePeopleMaxNum}
      handleCreateroom={handleCreateroom}
    ></RoomCreate>
  );
};

export default RoomCreateContainer;
