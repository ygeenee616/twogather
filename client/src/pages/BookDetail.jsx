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

export default function BookDetail() {
  const [data, setData] = useState("");

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  setUserInfo("HOST");
  console.log(userInfo);

  const navigate = useNavigate();
  const { bookId } = useParams();

  useEffect(() => {
    const getData = async (bookId) => {
      try {
        // 나중에 url 해당 BookId 사용해서 API 연결
        const req = await Api.get(`api/reservations/${bookId}`);
        // const req = await axios.get("/dummyBookDetail.json");
        const data = await req.data.data;
        console.log(req);
        setData(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData(bookId);
  }, []);

  console.log(data);

  // 예약 삭제 함수
  async function deleteBook(bookId) {
    try {
      // 나중에 url 해당 BookId 사용해서 API 연결
      const req = await Api.delete(`api/reservations/${bookId}`);
      console.log(req);
      navigate("/admin/bookList");
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
          people={data.personnel}
          pay={data.totalPrice}
        />
        <PostBookerInfo
          name={data.user.name}
          phone={data.user.phoneNumber}
          email={data.user.email}
          purpose={data.purpose}
          request={data.requirement}
        />
        <HostInfo host={data.user} />
        <Button
          onClick={() => {
            deleteBook(bookId);
          }}
        >
          삭제하기
        </Button>
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
