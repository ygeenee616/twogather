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
        const req = await Api.getAuth(`api/spaces/host`);
        const data = await req.data.data;
        setData(data);
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
        <Title>공간별 Q&A 관리</Title>
        <SpaceContainer>
          <TableTitle>공간별 Q&A</TableTitle>
          {data.length === 0 ? (
            <SpaceList>아직 등록된 공간이 없습니다.</SpaceList>
          ) : (
            data.map((space, id) => {
              return (
                <SpaceLink to={`/host/qna/${space.id}?page=1`} key={id}>
                  <SpaceList>🏡{space.name}</SpaceList>
                </SpaceLink>
              );
            })
          )}
        </SpaceContainer>
      </div>
    )
  );
}

const SpaceContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const SpaceLink = styled(Link)`
  text-decoration: none;
  color: #000;
  font-size: 1.1rem;
`;

const SpaceList = styled.div`
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  margin: 0 auto;
  border: 1px solid #8daef2;
  padding: 10px;
`;

const Title = styled.div`
  text-align: center;
  font-family: "NEXON Lv2 Gothic Light";
  font-size: 2.2rem;
  font-weight: 700;
  color: #000;
  margin: 50px 0;
`;

const TableTitle = styled.div`
  text-align: center;
  padding: 15px;
  font-size: 1rem;
  background-color: #6e85b7;
  color: #fff;
`;
