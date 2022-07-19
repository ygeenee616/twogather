import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StripeLayout from "../components/StripeLayout";
import BookDetail from "./BookDetail";
import axios from "axios";
import * as Api from "../api";

function AdminBookList() {
  const [data, setData] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const req = await Api.get(`api/reservations?page=1&perPage=5`);
        console.log(req);
        const data = await req.data.data.spaces.paginatedSpaces;
        console.log("데이터" + data);
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const keys = [
    "booker",
    "bookedRoom",
    "bookMembers",
    "price",
    "phoneNumber",
    "date",
  ];
  const headers = [
    "예약자",
    "예약방",
    "예약인원",
    "예약금액",
    "전화번호",
    "예약시간",
    "관리",
  ];
  const mainTitle = "전체예약내역";
  const columnTemplete = "1fr 2fr 1.2fr 1.2fr 2fr 1.2fr 1.2fr";
  const title = "";

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
          columnTemplete={columnTemplete}
          keys={keys}
          listName="BOOK"
        ></StripeLayout>
      </>
    )
  );
}
export default AdminBookList;

const ReservationHeader = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  margin: 5%;
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
