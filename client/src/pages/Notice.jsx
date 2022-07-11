import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import Header from "../layout/Header";
import Footer from "../layout/Footer.jsx";
import Pagination from "../components/Pagination";

const exData = [
  { id: 1, title: "1번째 공지사항", content: "입니다." },
  { id: 2, title: "2번째 공지사항", content: "입니다." },
  { id: 3, title: "3번째 공지사항", content: "입니다." },
  { id: 4, title: "4번째 공지사항", content: "입니다." },
  { id: 5, title: "5번째 공지사항", content: "입니다." },
  { id: 6, title: "6번째 공지사항", content: "입니다." },
  { id: 7, title: "7번째 공지사항", content: "입니다." },
  { id: 8, title: "8번째 공지사항", content: "입니다." },
  { id: 9, title: "9번째 공지사항", content: "입니다." },
  { id: 10, title: "10번째 공지사항", content: "입니다." },
  { id: 11, title: "11번째 공지사항", content: "입니다." },
  { id: 12, title: "12번째 공지사항", content: "입니다." },
  { id: 13, title: "13번째 공지사항", content: "입니다." },
  { id: 14, title: "14번째 공지사항", content: "입니다." },
  { id: 15, title: "15번째 공지사항", content: "입니다." },
  { id: 16, title: "16번째 공지사항", content: "입니다." },
];

const reversedData = exData.reverse();

const renderData = ({ offset, limit }) => {
  return reversedData.slice(offset, offset + limit).map((cur, i) => {
    return (
      <Item key={i}>
        <Line>
          <div>공지사항</div>
          <div>{cur.title}</div>
          <IoIosArrowDown />
        </Line>
        <Content>{cur.content}</Content>
      </Item>
    );
  });
};

export default function Notice() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  return (
    <div>
      <Header />
      <NoticeWrap>
        <NoticeTitle>공지사항</NoticeTitle>
        <NoticeTable>{renderData({ offset, limit })}</NoticeTable>
      </NoticeWrap>
      <Pagination
        total={exData.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
      <Footer />
    </div>
  );
}

const Item = styled.div`
  display: flex;
  flex-direction: column;
`;

const Line = styled.div`
  display: flex;
  border-bottom: 1px solid #8daef2;
  font-size: 1.2rem;
  font-weight: 400;
  padding: 1.5vh 0;
  cursor: pointer;
  div {
    flex-grow: 1;
    margin-left: 2.5vw;
  }
  svg {
    margin-right: 2.5vw;
    color: #8daef2;
  }
  div:nth-child(2) {
    flex: 20 1 0;
  }
  &:hover {
    svg {
      color: #5155a6;
    }
    background-color: #f2f2f2;
  }
`;

const Content = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  padding: 3vh 12.6vw;
  border: 1px solid #8daef2;
  border-top: none;
`;

const NoticeWrap = styled.div`
  margin: 0 auto 10vh auto;
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const NoticeTitle = styled.span`
  font-size: 2.2rem;
  font-weight: 700;
  text-align: center;
  margin: 8vh 0;
`;

const NoticeTable = styled.div`
  margin: 0 auto;
  border-top: 2px solid #8daef2;
  border-bottom: 2px solid #8daef2;

  width: 100%;
  height: 100%;
  padding-bottom: 0;
`;
