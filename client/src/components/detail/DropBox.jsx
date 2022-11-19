import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { HiChevronDown } from "react-icons/hi";
import { FcHome, FcConferenceCall } from "react-icons/fc";
import * as Api from "../../api";

export default function Dropbox({ rooms, acceptPeople, checkSelectRoom }) {
  const [roomUrl, setRoomUrl] = useState([]);

  useEffect(() => {
    const take = async () => {
      for (let i = 0; i < rooms.length; i++) {
        const imageUrl = await Api.getAuth(
          `api/room-images/room/${rooms[i].id}`
        );
        const i2 = imageUrl.data.data[0].imageUrl;
        setRoomUrl((prev) => [...prev, i2]);
      }
    };
    take();
  }, []);

  return (
    rooms && (
      <RoomList>
        <p>세부 공간 선택</p>
        {rooms.map((room, i) => {
          return (
            <Container key={i}>
              <RoomItem>
                <input
                  type="radio"
                  id="select"
                  name="room"
                  className={room.name}
                  value={room.id}
                  onClick={(e) => {
                    checkSelectRoom(room.id, room.name, room.price);
                    acceptPeople.current = room.capacity;
                  }}
                />
                <RoomLabel>
                  <span>{room.name}</span>
                  <span>시간당 {room.price} ₩</span>
                </RoomLabel>
                <img src={roomUrl[i]} />
                <HiChevronDown />
              </RoomItem>
              <Dropdown>
                <div>
                  <FcHome style={{ marginRight: "5px" }} size={16} />
                  공간 유형 : {room.description}
                </div>
                <div>
                  <FcConferenceCall style={{ marginRight: "5px" }} size={16} />
                  수용 인원 : {room.capacity}
                </div>
              </Dropdown>
            </Container>
          );
        })}
      </RoomList>
    )
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
  font-size: 0.9rem;
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
  justify-content: space-around;
  font-size: 0.8rem;
  border-top: 2px solid #8daef2;
  padding: 5px 0;
  transition: all 0.3s;

  & img {
    width: 40%;
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
  & div {
    margin: 0 10%;
    display: flex;
    align-items: flex-end;
  }
`;
