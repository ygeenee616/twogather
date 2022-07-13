import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import axios from "axios";
import { ko } from "date-fns/esm/locale";

import "react-datepicker/dist/react-datepicker.css";
import "./../../assets/styles/DatePicker.css";

// 날짜 선택시 해당 날짜의 예약 내역 가져오는 함수
const handleDateChange = async (date) => {
  // 클릭한 date에 따른 예약 내역
  const req = await axios.get("/dummyBook.json");
  const data = await req.data.books;
  console.log(data);

  let bookedTime = [];
  data.forEach((item) => {
    for (let t = item.startTime; t <= item.endTime; t++) {
      bookedTime.push(t);
    }
  });
  console.log(bookedTime);

  const disabled = [];
  let timeList = document.querySelectorAll(".time");
  timeList.forEach((t) => {
    disabled.push(Number(t.value));
  });
  console.log(disabled);

  console.log("필터" + disabled.filter((x) => bookedTime.includes(x)));
  // timeList.forEach;
};

// DatePicker + TimePicker
export function MyDatePicker({ bookedTime }) {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [caution, setCaution] = useState(false);

  // 날짜 포맷팅
  const dateToString = (date) => {
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0")
    );
  };

  useEffect(() => {
    console.log(dateToString(date), startTime, endTime);
  }, [date, startTime, endTime]);

  // 시간 테이블
  const timeTable = [];
  for (let i = 0; i < 24; i++) {
    timeTable.push(i);
  }

  return (
    <>
      <DatePicker
        locale={ko}
        selected={date}
        onChange={(date) => {
          setDate(date);
          handleDateChange(date);
        }}
        minDate={new Date()} // 이전 날짜는 선택 불가
        inline
      />

      <div className="timePicker">
        <TimeSelect
          name="timeTable"
          size="3"
          bookedTime={bookedTime}
          onChange={(e) => {
            setStartTime(Number(e.target.value));
            Number(e.target.value) < endTime
              ? setCaution(false)
              : setCaution(true);
          }}
        >
          {timeTable.map((time, i) => {
            return (
              <option key={i} name={time} value={time} className="time">
                {time}:00
              </option>
            );
          })}
        </TimeSelect>

        <span className="bookInfo"> ~ </span>

        <TimeSelect
          name="timeTable"
          size="3"
          bookedTime={bookedTime}
          onChange={(e) => {
            setEndTime(Number(e.target.value));
            startTime < Number(e.target.value)
              ? setCaution(false)
              : setCaution(true);
          }}
        >
          {timeTable.map((time, i) => {
            return (
              <option key={i} name={time} value={time} className="time">
                {time}:00
              </option>
            );
          })}
        </TimeSelect>
      </div>
      <Guide caution={caution}>
        <p className="caution">*최소 예약시간은 1시간입니다.</p>
      </Guide>
    </>
  );
}

const TimeSelect = styled.select`
  width: 100px;
  border: none;
  outline: 2px solid #8daef2;
  border-radius: 10px;
  text-align: center;

  & > option {
    padding: 7px;
    text-align: center;
  }

  & > option:checked {
    background-color: #8daef2;
  }

  & > option:hover {
    background-color: #bbd3fe;
  }
`;

const Guide = styled.div`
  width: 100%;
  font-size: 0.7rem;
  color: red;

  & p {
    margin: 0;
  }

  & .caution {
    ${({ caution }) => (caution ? `display: block;` : `display: none;`)};
  }
`;
