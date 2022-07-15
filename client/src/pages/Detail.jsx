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
  const [data, setData] = useState(0);
  const [people, setPeople] = useState(0);
  const currPeople = useRef(0);
  const [possible, setPossible] = useState();
  const navigate = useNavigate();

  function makeReservation(e) {
    e.preventDefault();
    Number(currPeople.current) >= Number(people)
      ? setPossible("true")
      : setPossible("false");
    possible && navigate("/book");
  }

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
    console.log(people);

    // console.log(possible);
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
            <Dropbox rooms={rooms} currPeople={currPeople} />
            <MyDatePicker />
            <Personnel>
              예약 인원:
              <input
                type="number"
                value={people}
                onChange={(e) => {
                  setPeople(e.target.value);
                }}
              />
              명
            </Personnel>
            <p className="OverPeople" possible={possible}>
              * 예약 인원이 수용 가능 인원을 초과하였습니다.
            </p>
            <Button onClick={(e) => makeReservation(e)}>예약하기</Button>
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

  & .OverPeople {
    font-size: 0.7rem;
    color: red;
    ${({ possible }) => (possible ? `display: block;` : `display: none;`)};
  }
`;

const Personnel = styled.div`
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
  background: #8daef2;
  transition: all 0.3s;
  color: #fff;

  &:hover {
    box-shadow: 2px 2px 5px -1px #a6a9b6;
  }

  // & .move {
  //   text-decoration: none;
  //   color: #fff;
  // }
`;
