import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import GetBookerInfo from "../components/book/GetBookerInfo";
import HostInfo from "../components/book/HostInfo";
import BookInfo from "../components/book/BookInfo";
import ToTop from "../components/ToTop";

export default function Book() {
  const location = useLocation();
  // detail로 부터 받은 예약 정보
  const people = location.state.people;
  const date = location.state.date;
  const startTime = location.state.startTime;
  const endTime = location.state.endTime;
  const room = location.state.room;
  const host = location.state.host;

  const name = useRef("");
  const phone = useRef("");
  const email = useRef("");
  const purpose = useRef("");
  const request = useRef("");

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
      />
      <HostInfo host={host} />
      <BookInfo
        room={room}
        people={people}
        date={date}
        startTime={startTime}
        endTime={endTime}
      />
      <Button>예약 완료</Button>
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

  &:hover {
    box-shadow: 2px 2px 5px -1px #a6a9b6;
  }
`;
