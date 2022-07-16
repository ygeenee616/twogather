import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import GetBookerInfo from "../components/book/GetBookerInfo";
import HostInfo from "../components/book/HostInfo";
import BookInfo from "../components/book/BookInfo";
import ToTop from "../components/ToTop";
import axios from "axios";

export default function Book() {
  const location = useLocation();
  // detail로 부터 받은 예약 정보
  const people = location.state.people;
  const date = location.state.date;
  const startTime = location.state.startTime;
  const endTime = location.state.endTime;
  const room = location.state.room;
  const host = location.state.host;

  // 유저 입력 정보
  const name = useRef("");
  const phone = useRef("");
  const email = useRef("");
  const purpose = useRef("");
  const request = useRef("");
  // 예약 가능 여부
  const possible = useRef(false);

  // 이름 입력 함수
  function onChangeName(e) {
    name.current = e;
  }

  // 전화번호 입력 함수
  function onChangePhone(e) {
    phone.current = e;
  }

  // 이메일 입력 함수
  function onChangeEmail(e) {
    email.current = e;
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
    name.current !== "" && phone.current !== "" && email.current !== ""
      ? (possible.current = true)
      : (possible.current = false);
  }

  return (
    <FullContainer possible={possible.current}>
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
        room={room}
        people={people}
        date={date}
        startTime={startTime}
        endTime={endTime}
      />
      <Button
        possible={possible.current}
        // onClick={() => possible.current && axios.post}
      >
        예약 완료
      </Button>
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

const Button = styled.button`
  width: 30%;
  padding: 5px;
  margin: 20px 0;
  border-radius: 10px;
  border: none;
  background: #8daef2;
  color: #fff;
  position: absolute;
  bottom: -60px;
  right: 0;
  transition: all 0.3s;

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
`;
