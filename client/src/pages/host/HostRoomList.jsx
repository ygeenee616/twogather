import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as Api from "../../api";
import HostNav from "../../components/host/HostNav";
import BookList from "../../components/BookList";

export default function HostRoomBook() {
  const [data, setData] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const req = await Api.get(`api/rooms/host`);
        const data = await req.data.data;
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return data ? (
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
  ) : (
    <p>등록된 룸이 없습니다.</p>
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
