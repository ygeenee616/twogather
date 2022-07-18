import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StripeLayout from "../components/StripeLayout";
import Pagination from "../components/Pagination";
import * as api from "../api";

const data = [
  {
    booker: "강예정",
    bookedSpace: "미지미지룸",
    bookedRoom: "파티파티룸",
    bookMembers: "5",
    price: "5000",
    phoneNumber: "010-3000-2000",
    date: "1월18일",
    modify: false,
  },
  {
    booker: "강예쩡",
    bookedSpace: "해란해란룸",
    bookedRoom: "파티파티룸",
    bookMembers: "5",
    price: "5000",
    phoneNumber: "010-3000-2000",
    date: "1월18일",
    modify: false,
  },

  {
    booker: "탱구",
    bookedSpace: "미지미지룸",
    bookedRoom: "파티룸",
    bookMembers: "5",
    price: "5000",
    phoneNumber: "010-3000-2000",
    date: "1월18일",
    modify: false,
  },
];

const keys = [
  "booker",
  "bookedSpace",
  "bookedRoom",
  "bookMembers",
  "price",
  "phoneNumber",
  "date",
];
const headers = [
  "예약자",
  "예약공간",
  "예약룸",
  "예약인원",
  "예약금액",
  "전화번호",
  "예약시간",
  "관리",
];
const mainTitle = "김민수님";
const title = "예약내역";
const columnTemplete = "1fr 1.7fr 1.7fr 1fr 1fr 2fr 1fr 1.2fr";

export default function HostBookList() {
  // const [data, setData] = useState(false);

  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       const res = await api.get("api/spaces/host");
  //       const spaceData = res.data.data;
  //       const roomId = spaceData.map((data) => data.id);
  //       // setData(resData);
  //       console.log(roomId);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   getData();
  // }, []);

  return (
    data && (
      <>
        <ReservationHeader>
          <TitleName>
            <MainTitle>{mainTitle}</MainTitle>
            {title ? <Title className="title">{title}</Title> : ""}
          </TitleName>
        </ReservationHeader>

        <StripeLayout
          datas={data}
          headers={headers}
          mainTitle={mainTitle}
          title={title}
          columnTemplete={columnTemplete}
          keys={keys}
          listName="BOOK"
        ></StripeLayout>
      </>
    )
  );
}

const ReservationHeader = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  margin: 10%;
`;
const TitleName = styled.div`
  border-bottom: 2px solid #8daef2;
`;
const Title = styled.span`
  font-size: 1.2rem;
  line-height: 35px;
  margin: 10px;
`;

const MainTitle = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
  color: #8daef2;
`;

const BookBox = styled.div`
  width: 80%;
  height: 80%;
`;
