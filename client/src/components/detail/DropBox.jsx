import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { HiChevronDown } from "react-icons/hi";
import { FcHome, FcConferenceCall } from "react-icons/fc";

Dropbox.defaultProps = {
  rooms: [
    {
      id: "room1",
      title: "ROOM1",
      pay: 2000,
      image:
        "https://moplqfgeemqv2103108.cdn.ntruss.com/service/165666149_3349f35a71f72e769413ec0259916966.jpeg?type=m&w=900&h=900&autorotate=true&quality=90",
      roomType: "회의실",
      people: 3,
    },
    {
      id: "room2",
      title: "ROOM2",
      pay: 2500,
      image:
        "https://moplqfgeemqv2103108.cdn.ntruss.com/service/165666153_16799d2af43e00dd7b3826057da2dc32.jpeg?type=m&w=900&h=900&autorotate=true&quality=90",
      roomType: "회의실",
      people: 4,
    },
    {
      id: "room3",
      title: "ROOM3",
      pay: 3100,
      image:
        "https://moplqfgeemqv2103108.cdn.ntruss.com/service/165666165_088b1880c43ad29ed310de168672f70e.jpeg?type=m&w=900&h=900&autorotate=true&quality=90",
      roomType: "회의실",
      people: 6,
    },
  ],
};

export default function Dropbox({ rooms }) {
  return (
    <RoomList>
      <p>세부 공간 선택</p>

      {rooms.map((item, i) => {
        return (
          <Container key={i}>
            <RoomItem>
              <input
                type="radio"
                id="select"
                name="room"
                value={item.id}
                onClick={(e) => console.log(e.target.value)}
              />
              <RoomLabel>
                <span>{item.title}</span>
                <span>시간당 {item.pay}</span>
              </RoomLabel>
              <img src={item.image} />
              <HiChevronDown />
            </RoomItem>
            <Dropdown>
              <div>
                <FcHome style={{ marginRight: "5px" }} size={16} />
                공간 유형 : {item.roomType}
              </div>
              <div>
                <FcConferenceCall style={{ marginRight: "5px" }} size={16} />
                수용 인원 : {item.people}
              </div>
            </Dropdown>
          </Container>
        );
      })}
    </RoomList>
  );
}

const RoomList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: solid #8daef2;
  border-width: 2px 0;
  background-color: #fff;
  font-size: 0.8rem;
`;

const Container = styled.details`
  &[open] summary ~ * {
    animation: sweep 0.5s ease-in-out;
  }

  @keyframes sweep {
    0% {
      transform: translateY(-30%);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const RoomItem = styled.summary`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.7rem;
  border-top: 2px solid #8daef2;
  padding: 5px 0;
  transition: all 0.3s;

  & img {
    width: 50%;
    border-radius: 15px;
    padding: 5px 0;
  }
`;

const RoomLabel = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Dropdown = styled.div`
  padding-bottom: 10px;
  transition: all 0.3s;
  & div {
    margin: 0 10%;
    display: flex;
    align-items: flex-end;
  }
`;
