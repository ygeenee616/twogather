import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import ImageSlider from "../components/detail/ImageSlider";
import Tab from "../components/detail/Tab";
import Map from "../components/detail/Map";
import Dropbox from "../components/detail/DropBox";
import { MyDatePicker } from "../components/detail/DatePicker";
import ToTop from "../components/ToTop";
import axios from "axios";

// 날짜 선택시 해당 날짜의 예약 내역 가져오는 함수
const handleDateChange = async (date) => {
  // 클릭한 date에 따른 예약 내역
  const req = await axios.get("/dummyBook.json");
  const data = await req.data.books;

  // 예약 내역이 있는 시간 배열
  let bookedTime = [];
  data.map((item) => {
    for (let t = item.startTime; t <= item.endTime; t++) {
      bookedTime.push(t);
    }
  });

  let startTimeList = document.querySelectorAll(".startTime");
  let endTimeList = document.querySelectorAll(".endTime");

  bookedTime.forEach((num) => {
    startTimeList[num].disabled = true;
    startTimeList[num].classList.add("disable");
    startTimeList[num].style.textDecoration = "line-through";

    endTimeList[num].disabled = true;
    endTimeList[num].classList.add("disable");
    endTimeList[num].style.textDecoration = "line-through";
  });
};

export default function Detail() {
  // api 데이터 state
  const [data, setData] = useState(0);
  // 사용자 예약 인원 state
  const [people, setPeople] = useState(0);
  const inputPeople = useRef(people);
  // 데이트피커 state
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [lessTime, setLessTime] = useState(false);
  const [overlap, setOverlap] = useState(false);

  // 선택한 룸의 수용 가능 인원
  const acceptPeople = useRef(0);
  // 예약 가능 여부
  const possible = useRef(false);

  const navigate = useNavigate();

  // 수용 가능 인원보다 예약 인원이 많으면 예약 불가
  function makeReservation(e) {
    e.preventDefault();
    Number(acceptPeople.current) !== 0 &&
    Number(inputPeople.current) !== 0 &&
    Number(acceptPeople.current) >= Number(inputPeople.current)
      ? (possible.current = true)
      : (possible.current = false);
  }

  // date 선택시 적용 함수
  function onChangeDate(date) {
    setDate(date);
    handleDateChange(date);
  }

  // startTime 선택시 적용 함수
  function onClickStartTime(time) {
    setStartTime(Number(time));
    handleTimeChange(Number(time), endTime);
    Number(time) < endTime ? setLessTime(false) : setLessTime(true);
  }

  // endTime 선택시 적용 함수
  function onClickEndTime(time) {
    setEndTime(Number(time));
    handleTimeChange(startTime, Number(time));
    startTime < Number(time) ? setLessTime(false) : setLessTime(true);
  }

  // 예약 시작 시간과 종료 시간 사이에 이미 예약된 시간이 있을 시 처리하는 함수
  const handleTimeChange = (startTime, endTime) => {
    let disableList = document.querySelectorAll(".disable");

    let booked = [];
    disableList.forEach((list) => {
      booked.push(Number(list.value));
    });
    booked = booked.slice(booked.length / 2);

    let newBookTime = [];
    for (let n = Number(startTime); n <= Number(endTime); n++) {
      newBookTime.push(n);
    }
    const filtering = newBookTime.filter((x) => booked.includes(x));
    filtering.length > 0 ? setOverlap(true) : setOverlap(false);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const req = await axios.get("/dummyDetail.json");
        const space = await req.data.space;
        setData(space);
        console.log(space);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const title = data.title;
  const hashTag = data.hashTag;
  const contents = data.contents;
  const rooms = data.rooms;
  const images = data.images;

  useEffect(() => {
    inputPeople.current = people;
  }, [people]);

  return (
    data && (
      <FullContainer>
        <DetailHeader>
          <Title>[{title}]</Title>
          <div style={{ margin: "20px 0" }}>
            {hashTag.map((tag, i) => (
              <HashTag key={i}>{tag}</HashTag>
            ))}
          </div>
        </DetailHeader>

        <DetailContainer>
          <LeftContainer>
            <ImageSlider images={images} />
            <Tab contents={contents} />
            <Map />
          </LeftContainer>

          <RightContainer>
            <Dropbox rooms={rooms} acceptPeople={acceptPeople} />
            <MyDatePicker
              date={date}
              startTime={startTime}
              endTime={endTime}
              lessTime={lessTime}
              overlap={overlap}
              onChangeDate={onChangeDate}
              onClickStartTime={onClickStartTime}
              onClickEndTime={onClickEndTime}
            />
            <Personnel possible={possible.current}>
              <InputPeople>
                예약 인원:
                <input
                  type="number"
                  value={people}
                  onChange={(e) => {
                    if (e.target.value !== "" || e.target.value !== 0) {
                      setPeople(e.target.value);
                      inputPeople.current = e.target.value;
                      makeReservation(e);
                    }
                  }}
                />
                명
              </InputPeople>
              <p className="OverPeople">* 예약 정보를 제대로 입력해주세요.</p>
            </Personnel>
            <Button
              possible={possible.current}
              onClick={() =>
                possible.current &&
                navigate("/book", {
                  state: {
                    people: people,
                  },
                })
              }
            >
              예약하기
            </Button>
          </RightContainer>

          <ToTop />
        </DetailContainer>
      </FullContainer>
    )
  );
}

const FullContainer = styled.div`
  max-width: 100%;
  margin: 5% 10%;
  display: flex;
  flex-direction: column;
`;

const DetailHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 2.5rem;
`;

const HashTag = styled.span`
  display: inline-block;
  background-color: #9ba3eb;
  color: white;
  border-radius: 20px;
  padding: 3px 15px;
  margin-right: 10px;
`;

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  width: 65%;
`;

const RightContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Personnel = styled.div`
  width: 100%;

  & .OverPeople {
    font-size: 0.8rem;
    color: red;
    ${({ possible }) => (possible ? `display: none;` : `display: block;`)};
  }
`;

const InputPeople = styled.div`
  width: 100%;
  display: flex;
  margin: 10px 0;

  & > input {
    width: 30%;
    max-height: 22px;
    border: 2px solid #8daef2;
    border-radius: 5px;
    text-align: center;
    padding: 0;
    margin: 0 10px;
  }

  /* 스피너 제거 */
  /* Chrome, Safari, Edge, Opera */
  & > input::-webkit-outer-spin-button,
  & > input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  & > input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 5px;
  border-radius: 10px;
  border: none;

  ${({ possible }) =>
    possible
      ? `
      background: #8daef2;
      transition: all 0.3s;
      color: #fff;
      &:hover {
        box-shadow: 2px 2px 5px -1px #a6a9b6;
      }
      `
      : `
      background: #DFDFDE;
      color: #fff;
      `};
`;
