import React, { useState } from "react";
import styled from "styled-components";
import ReservationListItem from "./BookListItem";
function BookList({ columnNames, column }) {
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
          <List>
            {columnNames.map((name) => {
              return <Header>{name}</Header>;
            })}
          </List>
          {data.map((item) => {
            return (
              <ReservationListItem
                item={item}
                cols={column}
              ></ReservationListItem>
            );
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
  padding-bottom: 0;
`;

const TitleName = styled.div`
  border-bottom: 2px solid #8daef2;
`;

const Title = styled.span`
  font-size: 1.2rem;
  line-height: 35px;
  margin: 10px;
`;

const RoomName = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
  color: #8daef2;
`;

const Header = styled.div`
  background-color: white;
  font-size: 1.2rem;
  line-height: 2.4rem;
  text-align: center;
  height: 3rem;
  font-weight: bold;

  margin: 0;

  &:last-child {
    border-right: none;
  }
`;

const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 2fr 1fr 1.2fr;
  border-bottom: 2px solid #8daef2;
  column-gap: 3px;
`;

export default BookList;
