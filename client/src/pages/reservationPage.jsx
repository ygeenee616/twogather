import React, { useState } from "react";
import styled from "styled-components";
import "../assets/styles/reservationPage.css";
// import ReservationListItem from "./reservationListItem";
function reservationPage() {
  const data = [
    {
      booker: "강예정",
      bookedRoom: "파티파티룸",
      date: "1월18일",
      modify: false,
    },
    {
      booker: "강예쩡",
      bookedRoom: "파티파티룸",
      date: "1월18일",
      modify: false,
    },

    {
      booker: "탱구",
      bookedRoom: "파티파티룸",
      date: "1월18일",
      modify: false,
    },
  ];

  return (
    <>
      <Container>
        <ReservationForm>
          <div>
            <span>파티파티룸2</span>예약내역
          </div>

          <div className="list">
            <div className="header">예약자</div>
            <div className="header">예약방</div>
            <div className="header">일시</div>
            <div className="header">수정</div>
          </div>
          {/* <ReservationListItem items={data}></ReservationListItem> */}
          <div className="items">
            {data.map((item) => {
              return;
              console.log(item.booker);
              console.log(item.bookedRoom);
              console.log(item.date);
            })}
            ;
          </div>
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

  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const ReservationForm = styled.div`
  margin: 0 auto;
  margin-top: 100px;
  background-color: lightgrey;
  width: 100%;
  height: 100%;
`;

export default reservationPage;
