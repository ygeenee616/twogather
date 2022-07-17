import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/styles/DatePicker.css";

export default function ListDatePicker() {
  const nav = useNavigate();
  const [date, setDate] = useState(new Date());

  const { search } = window.location;
  const params = new URLSearchParams(search);
  const category = params.get("category");

  //날짜 포맷팅
  const handleChangeDatePicker = (date) => {
    const yyyy = `${date.getFullYear()}`;
    const mm = (date.getMonth() + 1).toString().padStart(2, "0");
    const dd = date.getDate().toString().padStart(2, "0");
    const fullDate = Number(yyyy + mm + dd);
    setDate(fullDate);
  };

  const handleClickApplyButton = (date) => {
    params.set("date", date);
    const stringParams = params.toString();
    nav(`/list?${stringParams}`);
  };

  return (
    <Container>
      <DatePickeContainer>
        <DatePicker
          locale={ko}
          selected={date}
          minDate={new Date()} // 이전 날짜는 선택 불가
          inline
          onChange={handleChangeDatePicker}
        />
      </DatePickeContainer>

      <ApplyDateButton onClick={() => handleClickApplyButton(date)}>
        날짜 적용하기
      </ApplyDateButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const DatePickeContainer = styled.div`
  margin: auto;
`;

const ApplyDateButton = styled.button`
  all: unset;
  position: relative;
  bottom: 0;
  width: 100%;
  height: 1rem;
  padding: 6% 0;
  color: white;
  text-align: center;
  font-weight: 600;
  background-color: #8daef2;
  cursor: pointer;
`;
