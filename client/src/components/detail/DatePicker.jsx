import React, { useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";

import "react-datepicker/dist/react-datepicker.css";
import "./../../assets/styles/DatePicker.css";

// DatePicker + TimePicker
export function MyDatePicker({
  date,
  startTime,
  endTime,
  lessTime,
  overlap,
  onChangeDate,
  onClickStartTime,
  onClickEndTime,
  clearTimePicker,
}) {
  // timePicker options
  const timeTable = [];
  for (let i = 0; i < 24; i++) {
    timeTable.push(i);
  }

  return (
    <div style={{ width: "100%" }}>
      <DatePicker
        locale={ko}
        selected={date}
        onChange={(date) => {
          // clearTimePicker();
          onChangeDate(date);
        }}
        minDate={new Date()} // 이전 날짜는 선택 불가
        inline
      />
      <Guide style={{ marginBottom: "40px", textAlign: "center" }}>
        *룸을 먼저 선택해주세요!
      </Guide>

      <div className="timePicker">
        <TimeSelect
          name="timeTable"
          size="3"
          onClick={(e) => {
            onClickStartTime(e.target.value);
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
            onClickEndTime(e.target.value);
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
      <Guide lessTime={lessTime} overlap={overlap}>
        <p className="lessTime">*최소 예약시간은 1시간입니다.</p>
        <p className="overlap">*중복 예약 내역이 있습니다.</p>
      </Guide>
    </div>
  );
}

const TimeSelect = styled.select`
  width: 45%;
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
  font-size: 0.8rem;
  color: red;
  font-weight: bold;

  & .lessTime {
    ${({ lessTime }) => (lessTime ? `display: block;` : `display: none;`)};
  }

  & .overlap {
    ${({ overlap }) => (overlap ? `display: block;` : `display: none;`)};
  }
`;
