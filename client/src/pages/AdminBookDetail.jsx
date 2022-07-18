import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import HostInfo from "../components/book/HostInfo";
import BookInfo from "../components/book/BookInfo";
import PostBookerInfo from "../components/book/PostBookerInfo";
import ToTop from "../components/ToTop";
import axios from "axios";
import * as Api from "../api";
import userInfoState from "../atom/userInfoState";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

export default function AdminBookDetail() {
  const [data, setData] = useState("");

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  setUserInfo("HOST");
  console.log(userInfo);

  const navigate = useNavigate();
  const { params } = useParams();

  useEffect(() => {
    const getData = async (params) => {
      try {
        // 나중에 url 해당 BookId 사용해서 API 연결
        const req = await Api.get(`api/reservations/${params}`);
        // const req = await axios.get("/dummyBookDetail.json");
        const data = await req.data.book;
        setData(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  // 예약 삭제 함수
  async function deleteBook(params) {
    try {
      // 나중에 url 해당 BookId 사용해서 API 연결
      const req = await Api.delete(`api/reservations/${params}`);
      console.log(req);
      navigate("/admin");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    data && (
      <FullContainer>
        <BookInfo
          roomTitle={data.room}
          date={data.date}
          startTime={data.startTime}
          endTime={data.endTime}
          people={data.people}
          pay={data.pay}
        />
        <PostBookerInfo
          name={data.name}
          phone={data.phone}
          email={data.email}
          purpose={data.purpose}
          request={data.request}
        />
        <HostInfo host={data.host} />
        <ButtonContainer>
          <Button
            onClick={() => {
              deleteBook(params);
            }}
          >
            삭제하기
          </Button>
        </ButtonContainer>
        <ToTop />
      </FullContainer>
    )
  );
}

const FullContainer = styled.div`
  max-width: 100%;
  margin: 5% 15%;
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 50%;
  padding: 5px;
  margin: 0 10px;
  border-radius: 10px;
  border: none;
  background: #ff8b8b;
  color: #fff;

  &:hover {
    box-shadow: 2px 2px 5px -1px #a6a9b6;
    transition: 0.3s;
  }
`;
