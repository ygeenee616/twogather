import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HostInfo from "../components/book/HostInfo";
import BookInfo from "../components/book/BookInfo";
import PostBookerInfo from "../components/book/PostBookerInfo";
import ToTop from "../components/ToTop";
import axios from "axios";

export default function AdminBookDetail() {
  const [data, setData] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        // 나중에 url 해당 BookId 사용해서 API 연결
        const req = await axios.get("/dummyBookDetail.json");
        const data = await req.data.book;
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
        <Button>취소하기</Button>
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
  position: relative;
`;

const Button = styled.button`
  width: 30%;
  padding: 5px;
  margin: 20px 0;
  border-radius: 10px;
  border: none;
  background: red;
  color: #fff;
  position: absolute;
  bottom: -60px;
  right: 0;

  &:hover {
    box-shadow: 2px 2px 5px -1px #a6a9b6;
    transition: 0.3s;
  }
`;
