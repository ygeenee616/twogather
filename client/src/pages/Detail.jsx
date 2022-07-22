import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import ImageSlider from "../components/detail/ImageSlider";
import Tab from "../components/detail/Tab";
import Map from "../components/detail/Map";
import Dropbox from "../components/detail/DropBox";
import { MyDatePicker } from "../components/detail/DatePicker";
import ToTop from "../components/ToTop";
import * as Api from "../api";

export default function Detail() {
  // api 데이터 state
  const [data, setData] = useState("");
  const [imgData, setImgData] = useState([]);
  // 선택한 룸
  const room = useRef({ id: "", name: "", pay: "" });
  // 사용자 예약 인원 state
  const [people, setPeople] = useState(0);
  const refPeople = useRef(people);
  // 데이트피커 state
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  // 예약 최소 시간
  const [lessTime, setLessTime] = useState(true);
  // 예약 중복 내역
  const [overlap, setOverlap] = useState(false);
  // 해당 날짜에 예약내역이 있는 시간대
  const [bookedTime, setBookedTime] = useState([]);

  // 선택한 룸의 수용 가능 인원
  const acceptPeople = useRef(0);
  // 예약 가능 여부
  const possible = useRef(false);

  const navigate = useNavigate();

  const { spaceId } = useParams();

  // api 데이터 받아오는 함수
  useEffect(() => {
    const getData = async () => {
      try {
        const spaceDataReq = await Api.get(`api/spaces/${spaceId}`);
        const spaceImgDataReq = await Api.get(
          `api/space-images/space/${spaceId}`
        );
        const data = await spaceDataReq.data.data;
        setData(data);
        const image = await spaceImgDataReq.data.data;
        setImgData(image);
        console.log(spaceDataReq);
        console.log(spaceImgDataReq);
        console.log(data);
        console.log(image);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  // 받아온 데이터를 각각 변수에 저장
  const name = data.name;
  const hashTags = data.hashtags;
  const intro = data.intro;
  const notice = data.notice;
  const qnas = data.qnas;
  const reviews = data.reviews;
  const address = data.address2;
  const rooms = data.rooms;
  const host = data.user;

  // 룸 선택시 적용하는 DropBox 함수
  function checkSelectRoom(id, name, pay) {
    room.current = {
      id: id,
      name: name,
      pay: pay,
    };
    console.log(room.current);
  }

  // 예약 정보를 제대로 입력했을 때만 예약 버튼을 활성화하는 함수
  function checkPossible(e) {
    e.preventDefault();
    Number(acceptPeople.current) !== 0 &&
    Number(refPeople.current) !== 0 &&
    Number(acceptPeople.current) >= Number(refPeople.current) &&
    lessTime === false &&
    overlap === false
      ? (possible.current = true)
      : (possible.current = false);
  }

  // setData 날짜 포맷팅 (YYYYMMDD)
  function dateToNumber(date) {
    const formatDate = Number(
      date.getFullYear() +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        date.getDate().toString().padStart(2, "0")
    );
    return formatDate;
  }

  // API 호출시 날짜 포맷팅 (YYYY-MM-DD)
  function dateToString(date) {
    const formatDate =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0");
    return formatDate;
  }

  // date 선택시 적용하는 DatePicker 함수
  function onChangeDate(date) {
    setDate(dateToNumber(date));
    console.log(dateToString(date));
    handleDateChange(dateToString(date));
  }

  // startTime 선택시 적용하는 DatePicker 함수
  function onClickStartTime(time) {
    setStartTime(Number(time));
    handleTimeChange(Number(time), endTime);
    Number(time) < endTime ? setLessTime(false) : setLessTime(true);
  }

  // endTime 선택시 적용하는 DatePicker 함수
  function onClickEndTime(time) {
    setEndTime(Number(time));
    handleTimeChange(startTime, Number(time));
    startTime < Number(time) ? setLessTime(false) : setLessTime(true);
  }

  // 날짜 선택시 해당 날짜의 예약 내역 가져오는 함수
  const handleDateChange = async (date) => {
    clearTimePicker();
    setBookedTime([]);

    // 클릭한 date에 따른 예약 내역
    const req = await Api.get(
      `api/reservations/room/${room.current.id}?date=${date}`
    );
    console.log(date);
    console.log(req);
    const data = await req.data.data.reservations;

    // 예약 내역이 있는 시간 배열
    const booked = data.map((time) => {
      for (let t = time.startTime; t <= time.endTime; t++) {
        bookedTime.push(t);
      }
    });

    // undefined 제거
    const bookedArr = booked.filter(Boolean);
    console.log(bookedArr);

    console.log(bookedTime);
    setBookedTime(bookedArr);

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

  // 타임피커 초기화
  function clearTimePicker() {
    let bookedList = document.querySelectorAll(".disable");
    console.log(bookedList);

    if (bookedList.length !== 0 || bookedList !== undefined) {
      bookedList.forEach((i) => {
        i.disabled = false;
        i.classList.remove("disable");
        i.style.textDecoration = "none";
      });
    }
  }

  // 예약 시작 시간과 종료 시간 사이에 이미 예약된 시간이 있을 시 주의를 주는 함수
  function handleTimeChange(startTime, endTime) {
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
  }

  return (
    data && (
      <FullContainer>
        <DetailHeader>
          <Title>[{name}]</Title>
          <div style={{ margin: "20px 0" }}>
            {hashTags.length === 0 ? (
              <HashTag>투게더</HashTag>
            ) : (
              hashTags.map((hashTag, i) => (
                <HashTag key={i}>{hashTag.tag}</HashTag>
              ))
            )}
          </div>
        </DetailHeader>

        <DetailContainer>
          <LeftContainer>
            <ImageSlider images={imgData} />
            <Tab
              name={name}
              intro={intro}
              notice={notice}
              qnas={qnas}
              reviews={reviews}
            />
            <Map name={name} address={address} />
          </LeftContainer>

          <RightContainer>
            <Dropbox
              rooms={rooms}
              checkSelectRoom={checkSelectRoom}
              acceptPeople={acceptPeople}
            />
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
                      refPeople.current = e.target.value;
                      checkPossible(e);
                    }
                  }}
                />
                명
              </InputPeople>
              <p className="overPeople">
                * 예약 정보를 맞게 입력했는지 확인해주세요
              </p>
            </Personnel>
            <Button
              possible={possible.current}
              onClick={() =>
                possible.current &&
                navigate("/book", {
                  state: {
                    people: people,
                    date: date,
                    startTime: startTime,
                    endTime: endTime,
                    room: room.current,
                    host: host,
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
  font-family: "NEXON Lv2 Gothic Light";
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
  font-family: "S-CoreDream-7ExtraBold";
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

  & .overPeople {
    font-size: 0.8rem;
    color: red;
    font-weight: bold;
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
