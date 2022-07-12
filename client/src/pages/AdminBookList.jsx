import React, { useState } from "react";
import styled from "styled-components";
import BookList from "../components/hostComponents/BookList";
import StripeLayout from "../components/StripeLayout";
function AdminBookList() {
  const data = [
    {
      booker: "강예정",
      bookedRoom: "파티파티룸",
      bookMembers: "5",
      price: "5000",
      phoneNumber: "010-3000-2000",
      date: "1월18일",
      modify: false,
    },
    {
      booker: "강예쩡",
      bookedRoom: "파티파티룸",
      bookMembers: "5",
      price: "5000",
      phoneNumber: "010-3000-2000",
      date: "1월18일",
      modify: false,
    },

    {
      booker: "탱구",
      bookedRoom: "파티파티룸",
      bookMembers: "5",
      price: "5000",
      phoneNumber: "010-3000-2000",
      date: "1월18일",
      modify: false,
    },
  ];

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
  const columnTemplete = "1fr 2fr 1.2fr 1.2fr 2fr 1fr 1.2fr";

  return (
    <>
      <StripeLayout
        datas={data}
        headers={headers}
        mainTitle={mainTitle}
        columnTemplete={columnTemplete}
        keys={keys}
        listName="BOOK"
      ></StripeLayout>
    </>
  );
}

export default AdminBookList;
