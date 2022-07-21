import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as Api from "../../api";
import HostNav from "../../components/host/HostNav";
import BookList from "../../components/BookList";
import { useParams } from "react-router-dom";

export default function HostRoomBook() {
  const [data, setData] = useState("");
  const params = useParams();
  console.log(params);
  const spaceId = params.spaceId;
  useEffect(() => {
    const getData = async () => {
      try {
        //space에 대한 roomAPI받기
        const req = await Api.get(`api/rooms/space/${spaceId}`);
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

  return data ? (
    <div>
      <HostNav />
      <RoomContainer>
        {data.map((room, id) => {
          return (
            <RoomLink to={`/host/updateRoom/${room.id}`}>
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

const Title = styled.div`
  text-align: center;
  padding: 15px;
  font-size: 1rem;
  background-color: #8daef2;
  color: #fff;
`;
