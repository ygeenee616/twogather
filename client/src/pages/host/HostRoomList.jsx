import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as Api from "../../api";
import HostNav from "../../components/host/HostNav";
import BookList from "../../components/BookList";

export default function HostRoomBook() {
  const [data, setData] = useState("");

  // const roomList = [
  //   { id: 1, name: "예정룸" },
  //   { id: 2, name: "해란룸" },
  //   { id: 3, name: "연진룸" },
  //   { id: 4, name: "종원룸" },
  //   { id: 5, name: "태훈룸" },
  // ];

  useEffect(() => {
    const getData = async () => {
      try {
        const req = await Api.get(`api/rooms/host`);
        console.log(req);
        const data = await req.data.data;
        console.log("데이터" + data);
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  console.log(data);

  return (
    data && (
      <div>
        <HostNav />
        <RoomContainer>
          {data.map((room, id) => {
            return (
              <RoomLink to={`/host/bookList/${room.id}`}>
                <RoomList>{room.name}</RoomList>
              </RoomLink>
            );
          })}
        </RoomContainer>
      </div>
    )
  );
}

const RoomContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 80px;
  margin-bottom: 80px;
`;

const RoomLink = styled(Link)`
  text-decoration: none;
  color: #000;
  font-size: 1.1rem;
`;

const RoomList = styled.div`
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  margin: 0 auto;
  border: 1px solid #8daef2;
  padding: 10px;
`;
