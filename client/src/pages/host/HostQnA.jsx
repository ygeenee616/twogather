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
        const req = await Api.get(`api/spaces/host`);
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
        <div>
          <SpaceContainer>
            <Title>공간별 Q&A</Title>
            {data.length === 0 ? (
              <SpaceList>아직 등록된 공간이 없습니다.</SpaceList>
            ) : (
              data.map((space, id) => {
                return (
                  <SpaceLink to={`/host/qna/${space.id}?page=1`} key={id}>
                    <SpaceList>{space.name}</SpaceList>
                  </SpaceLink>
                );
              })
            )}
          </SpaceContainer>
        </div>
      </div>
    )
  );
}

const SpaceContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 80px;
  margin-bottom: 80px;
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
  padding: 15px;
  font-size: 1rem;
  background-color: #8daef2;
  color: #fff;
`;
