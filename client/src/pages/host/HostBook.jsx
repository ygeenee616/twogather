import React, { useState, useEffect } from "react";
import * as Api from "../../api";
import styled from "styled-components";
import { Link } from "react-router-dom";
import HostNav from "../../components/host/HostNav";

export default function HostRoomBook() {
  const [data, setData] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const req = await Api.get(`api/rooms/host`);
        const data = await req.data.data;
        console.log(req);
        setData(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    data && (
      <div>
        <HostNav />
        <RoomContainer>
          <Title>룸별 예약 내역</Title>
          {data.length === 0 ? (
            <RoomList>아직 등록된 룸이 없습니다.</RoomList>
          ) : (
            data.map((room, id) => {
              return (
                <RoomLink to={`/host/bookList/${room.id}?page=1`} key={id}>
                  <RoomList>{room.name}</RoomList>
                </RoomLink>
              );
            })
          )}
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

const Title = styled.div`
  text-align: center;
  padding: 15px;
  font-size: 1rem;
  background-color: #8daef2;
  color: #fff;
`;
