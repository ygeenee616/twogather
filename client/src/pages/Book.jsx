import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import GetBookerInfo from "../components/book/GetBookerInfo";
import HostInfo from "../components/book/HostInfo";
import BookInfo from "../components/book/BookInfo";
import ToTop from "../components/ToTop";
import axios from "axios";
import { useEffect } from "react";
import * as Api from "../api";

export default function Book() {
  const location = useLocation();
  // detail로 부터 받은 예약 정보
  const people = location.state.people;
  const date = location.state.date;
  const startTime = location.state.startTime;
  const endTime = location.state.endTime;
  const roomId = location.state.room.id;
  const roomTitle = location.state.room.title;
  const host = location.state.host;

  console.log(people, date, startTime, endTime, roomId, roomTitle, host);

  // 유저 입력 정보
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const purpose = useRef("");
  const request = useRef("");
  // 예약 가능 여부
  const possible = useRef(false);

  // 이름 입력 함수
  function onChangeName(e) {
    setName(e);
  }

  // 전화번호 입력 함수
  function onChangePhone(e) {
    setPhone(e);
  }

  // 이메일 입력 함수
  function onChangeEmail(e) {
    setEmail(e);
  }

  // 사용 목적 입력 함수
  function onChangePurpose(e) {
    purpose.current = e;
  }

  // 요청 사항 입력 함수
  function onChangeRequest(e) {
    request.current = e;
  }

  // 필수 예약 정보를 모두 입력했을 때만 예약 버튼을 활성화하는 함수
  function checkPossible(e) {
    e.preventDefault();
    name !== "" && phone !== "" && email != ""
      ? (possible.current = true)
      : (possible.current = false);
  }

  // 예약 등록 함수
  async function submitBook(id) {
    try {
      const req = await Api.post(`api/reservations/${roomId}`, {
        startTime: startTime,
        endTime: endTime,
        date: date,
        personnel: people,
      });
      console.log(req);
      console.log("예약완료");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <FullContainer>
      <GetBookerInfo
        name={name}
        phone={phone}
        email={email}
        purpose={purpose}
        request={request}
        onChangeName={onChangeName}
        onChangePhone={onChangePhone}
        onChangeEmail={onChangeEmail}
        onChangePurpose={onChangePurpose}
        onChangeRequest={onChangeRequest}
        checkPossible={checkPossible}
      />
      <HostInfo host={host} />
      <BookInfo
        roomId={roomId}
        roomTitle={roomTitle}
        people={people}
        date={date}
        startTime={startTime}
        endTime={endTime}
      />
      <BookBox possible={possible.current}>
        <p className="required">*예약 필수 정보를 입력해주세요</p>
        <button onClick={() => possible.current && submitBook()}>
          예약 완료
        </button>
      </BookBox>
      <ToTop />
    </FullContainer>
  );
}

const FullContainer = styled.div`
  max-width: 100%;
  margin: 5% 15%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const BookBox = styled.div`
  width: 30%;
  position: absolute;
  bottom: -40px;
  right: 0;

  & .required {
    margin: 5px 0;
    font-size: 0.8rem;
    color: red;

    display: ${({ possible }) => (possible ? "none" : "block")};
  }

  & button {
    width: 100%;
    padding: 5px;
    border-radius: 10px;
    border: none;

    ${({ possible }) =>
      possible
        ? `
      background: #8daef2;
      transition: all 0.3s;
      color: #fff;
      &:hover {
        box-shadow: 2px 2px 5px -1px #a6a9b6;
      }
      `
        : `
      background: #DFDFDE;
      color: #fff;
      `};
  }
`;
