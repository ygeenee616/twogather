import React, { useState } from "react";
import styled from "styled-components";
import "../assets/styles/reservationPage.css";
import ReservationListItem from "./reservationListItem";
function reservationPage() {
  const data = [
    {
      booker: "강예정",
      bookedRoom: "파티파티룸",
      bookMembers: "5",
      price: "5000",
      phoneNumber: "010-3000-2000",
      date: "1월18일",
    },
    {
      booker: "강예쩡",
      bookedRoom: "파티파티룸",
      bookMembers: "5",
      price: "5000",
      phoneNumber: "010-3000-2000",
      date: "1월18일",
      modify: false,
    },

    {
      booker: "탱구",
      bookedRoom: "파티파티룸",
      bookMembers: "5",
      price: "5000",
      phoneNumber: "010-3000-2000",
      date: "1월18일",
      modify: false,
    },
  ];

  return (
    <>
      <Container>
        <ReservationHeader>
          <TitleName>
            <RoomName className="roomName">파티파티룸2</RoomName>
            <Title className="title">예약내역</Title>
          </TitleName>
        </ReservationHeader>

        <ReservationForm>
          <div className="list">
            <div className="header">예약자</div>
            <div className="header">예약방</div>
            <div className="header">예약인원</div>
            <div className="header">예약금액</div>
            <div className="header">전화번호</div>
            <div className="header">예약시간</div>
            <div className="header">관리</div>
          </div>
          {/* <ReservationListItem items={data}></ReservationListItem> */}
          {data.map((item) => {
            return <ReservationListItem item={item}></ReservationListItem>;
          })}
        </ReservationForm>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin: 0 auto;
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const ReservationHeader = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  margin: 10%;
`;

const ReservationForm = styled.div`
  margin: 0 auto;
  border-top: 2px solid #8daef2;
  border-bottom: 2px solid #8daef2;
  padding: 10px;

  width: 100%;
  height: 100%;
`;

const TitleName = styled.div`
  border-bottom: 2px solid #8daef2;
`;

const Title = styled.span`
  font-size: 1.2rem;
  line-height: 35px;
`;

const RoomName = styled.span`
  font-size: 1.4rem;
`;

export default reservationPage;
