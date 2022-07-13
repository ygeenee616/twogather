import React from "react";
import styled from "styled-components";

export default function TimePicker() {
  const timeTable = [];
  for (let i = 0; i < 24; i++) {
    timeTable.push(i);
  }

  return (
    <TimeSelect name="timeTable" size="2">
      {timeTable.map((time, i) => {
        return (
          <option key={i} name={time} value={time} className="time">
            {time}:00
          </option>
        );
      })}
    </TimeSelect>
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
