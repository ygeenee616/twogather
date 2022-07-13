import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";

import "react-datepicker/dist/react-datepicker.css";
import "./../../assets/styles/DatePicker.css";
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export function MyDatePicker() {
  const [date, setDate] = useState(new Date());

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

  console.log(dateToString(date));

  return (
    <DatePicker
      locale={ko}
      selected={date}
      onChange={(date) => setDate(date)}
      minDate={new Date()} // 이전 날짜는 선택 불가
      inline
    />
  );
}

export function MyTimePicker() {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  // 시간 포맷팅
  const timeToString = (time) => {
    return time.getHours();
  };

  // 시간 필터 - 과거 시간은 선택 불가
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  useEffect(() => {
    console.log(timeToString(startTime), timeToString(endTime));
  }, [startTime, endTime]);

  return (
    <div className="timePicker">
      <DatePicker
        locale={ko}
        selected={startTime}
        onChange={(date) => setStartTime(date)}
        filterTime={filterPassedTime}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={60}
        timeCaption="시간"
        dateFormat="HH시 부터"
      />

      <span className="bookInfo"> ~ </span>

      <DatePicker
        locale={ko}
        selected={endTime}
        onChange={(date) => setEndTime(date)}
        filterTime={filterPassedTime}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={60}
        timeCaption="시간"
        dateFormat="HH시 까지"
      />
    </div>
  );
}
