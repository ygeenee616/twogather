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

export default function Detail() {
  // api 데이터
  const [data, setData] = useState(0);
  // 사용자 예약 인원
  const [people, setPeople] = useState(0);
  const inputPeople = useRef(people);
  // 선택한 룸의 수용 가능 인원
  const acceptPeople = useRef(0);
  // 예약 가능 여부
  const possible = useRef(false);
  // const [possible, setPossible] = useState(false);

  const navigate = useNavigate();

  // 수용 가능 인원보다 예약 인원이 많으면 예약 불가
  function makeReservation(e) {
    e.preventDefault();
    Number(acceptPeople.current) !== 0 &&
    Number(inputPeople.current) !== 0 &&
    Number(acceptPeople.current) >= Number(inputPeople.current)
      ? (possible.current = true)
      : (possible.current = false);
    console.log(possible.current);
  }

  // function okBook(e) {
  //   possible && navigate("/book");
  // }

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

    console.log(inputPeople.current);
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
            <MyDatePicker />
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
              <p className="OverPeople">
                * 예약 인원이 수용 가능 인원을 초과하였습니다.
              </p>
            </Personnel>
            <Button
              possible={possible.current}
              onClick={() => possible.current && navigate("/book")}
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
  & .OverPeople {
    font-size: 0.8rem;
    color: red;
    ${({ possible }) => (possible ? `display: none;` : `display: block;`)};
  }
`;

const InputPeople = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;

  & > input {
    width: 50%;
    max-height: 22px;
    border: 2px solid #8daef2;
    border-radius: 5px;
    text-align: center;
    padding: 0;
    margin: 0;
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
