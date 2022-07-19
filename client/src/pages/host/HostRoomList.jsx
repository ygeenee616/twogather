import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as Api from "../../api";

export default function HostRoomList({ data, title, link }) {
  return (
    data && (
      <div>
        <RoomContainer>
          <Title>{title}</Title>
          {data.map((room, id) => {
            return (
              <RoomLink to={`${link}${room.id}?page=1`} key={id}>
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

const Title = styled.div`
  text-align: center;
  padding: 15px;
  font-size: 1rem;
  background-color: #8daef2;
  color: #fff;
`;
