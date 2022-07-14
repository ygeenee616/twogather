import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import "./../../assets/styles/DatePicker.css";

export default function ListDatePicker() {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [caution, setCaution] = useState(false);

  const timeTable = [];
  for (let i = 0; i < 24; i++) {
    timeTable.push(i);
  }

  return (
    <Container caution={caution}>
      <DatePicker
        locale={ko}
        selected={date}
        minDate={new Date()} // 이전 날짜는 선택 불가
        inline
      />

      <div className="timePicker">
        <TimeSelect
          name="timeTable"
          size="3"
          onClick={(e) => {
            setStartTime(Number(e.target.value));
            Number(e.target.value) < endTime
              ? setCaution(false)
              : setCaution(true);
          }}
        >
          <option className="title" disabled>
            시작 시간
          </option>
          {timeTable.map((time, i) => {
            return (
              <option key={i} name={time} value={time} className="startTime">
                {time}:00
              </option>
            );
          })}
        </TimeSelect>

        <span className="bookInfo"> ~ </span>

        <TimeSelect
          name="timeTable"
          size="3"
          onClick={(e) => {
            setEndTime(Number(e.target.value));
            startTime < Number(e.target.value)
              ? setCaution(false)
              : setCaution(true);
          }}
        >
          <option className="title" disabled>
            종료 시간
          </option>
          {timeTable.map((time, i) => {
            return (
              <option key={i} name={time} value={time} className="endTime">
                {time}:00
              </option>
            );
          })}
        </TimeSelect>
      </div>
      <Guide caution={caution}>
        <p className="caution">*최소 예약시간은 1시간입니다.</p>
      </Guide>
    </Container>
  );
}

const Container = styled.div`
  ${({ caution }) =>
    caution ? `margin: auto auto 0 auto;` : `margin: auto auto 12.8% auto;`};
`;

const TimeSelect = styled.select`
  width: 100px;
  border: none;
  outline: 2px solid #8daef2;
  border-radius: 10px;
  text-align: center;

  & > option {
    padding: 5px;
    text-align: center;
  }

  & > option:checked {
    background-color: #8daef2;
  }

  & > option:hover {
    background-color: #bbd3fe;
  }

  & .title,
  & .title:hover {
    color: #fff;
    background-color: #8daef2;
  }

  & .disable:hover {
    background-color: transparent;
  }
`;

const Guide = styled.div`
  width: 100%;
  font-size: 0.7rem;
  color: red;

  & .caution {
    ${({ caution }) => (caution ? `display: block;` : `display: none;`)};
  }
`;
