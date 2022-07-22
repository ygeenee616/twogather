import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import GetBookerInfo from "../components/book/GetBookerInfo";
import HostInfo from "../components/book/HostInfo";
import BookInfo from "../components/book/BookInfo";
import ToTop from "../components/ToTop";
import * as Api from "../api";
import Modal from "../components/Modal";

export default function Book() {
  const location = useLocation();
  const navigate = useNavigate();

  // detail로 부터 받은 예약 정보
  const people = location.state.people;
  const date = location.state.date;
  const startTime = location.state.startTime;
  const endTime = location.state.endTime;
  const roomId = location.state.room.id;
  const roomTitle = location.state.room.name;
  const roomPay = location.state.room.pay;
  const host = location.state.host;

  console.log(location.state);

  // 유저 입력 정보
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const purpose = useRef("");
  const request = useRef("");
  // 예약 가능 여부
  const possible = useRef(false);

  // 총액 계산
  const totalPrice = roomPay * people * (endTime - startTime);

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

  useEffect(() => {
    async function getData() {
      try {
        const req = await Api.getAuth(`api/users/info`);
        console.log(req);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

  // API 호출용 날짜 포맷팅
  function dateToBook(date) {
    const fullDate = String(date);
    const year = fullDate.substring(0, 4);
    const month = fullDate.substring(4, 6);
    const day = fullDate.substring(6, 8);

    console.log(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
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
      const req = await Api.postAuth(`api/reservations/${roomId}`, {
        startTime: startTime,
        endTime: endTime,
        date: dateToBook(date),
        personnel: Number(people),
        totalPrice: totalPrice,
        reserveUsername: name,
        reservePhoneNumber: phone,
        reserveEmail: email,
        purpose: purpose.current,
        requirement: request.current,
      });
      const modal = document.querySelector(".modalWrap");
      modal.style.display = "block";
      window.scrollTo(0, 0);
      console.log(req);
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
        totalPrice={totalPrice}
      />
      <BookBox possible={possible.current}>
        <p className="required">*예약 필수 정보를 입력해주세요</p>
        <button onClick={() => possible.current && submitBook()}>
          예약 완료
        </button>
      </BookBox>
      <ToTop />
      <ModalWrap className="modalWrap">
        <Modal
          title={"예약 성공"}
          content={"룸 예약이 되었습니다."}
          clickEvent={() => window.location.replace("/mypage")}
        />
      </ModalWrap>
    </FullContainer>
  );
}

const FullContainer = styled.div`
  font-family: "NEXON Lv2 Gothic Light";
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

const ModalWrap = styled.div`
  width: 100%;
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  vertical-allign: middle;
  display: none;
  background-color: rgba(90, 90, 90, 0.2);
`;
