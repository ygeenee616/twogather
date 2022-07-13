import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";

import "react-datepicker/dist/react-datepicker.css";
import "./../../assets/styles/DatePicker.css";

import axios from "axios";
import { ca } from "date-fns/locale";
import { set } from "date-fns";
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export function MyDatePicker() {
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
    console.log(startTime, endTime);
  }, [startTime, endTime]);

  const handleDateChange = async (date) => {
    setDate(date);
    console.log(dateToString(date));
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

    const disableList = document.querySelectorAll(
      ".react-datepicker__time-list-item "
    );
    console.log(disableList);
    console.log(new Date().getHours() == 2);
  };

  // 시간 필터
  const filterPassedTime = (bookedTime) => {
    const currentDate = new Date().getHours();

    const selectedDate = new Date();

    return currentDate.getTime() < selectedDate.getTime();
  };

  // 시간 테이블
  const timeTable = [];
  for (let i = 0; i < 24; i++) {
    timeTable.push(i);
  }

  console.log(dateToString(date));

  return (
    <>
      <DatePicker
        locale={ko}
        selected={date}
        onChange={(date) => handleDateChange(date)}
        minDate={new Date()} // 이전 날짜는 선택 불가
        inline
      />

      <div className="timePicker">
        <TimeSelect
          name="timeTable"
          size="2"
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
          size="2"
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
  border: 2px solid #8daef2;
  border-radius: 5px;
  text-align: center;

  &:focus {
    outline: none;
  }

  & > option {
    padding: 3px;
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
