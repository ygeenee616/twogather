import React, { useState } from "react";
import styled from "styled-components";
import BookList from "../components/hostComponents/bookList";
function AdminBookList() {
  const columnNames = [
    "예약자",
    "예약방",
    "예약인원",
    "예약금액",
    "전화번호",
    "예약시간",
    "관리",
  ];
  return <BookList column="7" columnNames={columnNames}></BookList>;
}

export default AdminBookList;
