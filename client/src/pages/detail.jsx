import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import ImageSlider from "../components/detail/ImageSlider";
import Tab from '../components/detail/Tab';
import Map from "../components/detail/Map";
import SelectRoom from "../components/detail/SelectRoom";
import { MyDatePicker, MyTimePicker } from "../components/detail/DatePicker";
import ToTop from "../components/ToTop";


Detail.defaultProps = {
  title: "스튜디오 709",
  hashTag: ["스튜디오", "촬영대관"]
}

export default function Detail({title, hashTag}) {
  const [person, setPerson] = useState(0);

  return (
    <FullContainer>
      <DetailHeader>
        <Title>[{title}]</Title>
        <div style={{margin: "20px 0"}}>
        {hashTag.map((tag, i) => {
          return (
            <HashTag key={i}># {tag}</HashTag>
          )
        })}
        </div>
      </DetailHeader>

      <DetailContainer>
        
        <LeftContainer>
        <ImageSlider />
          <TabContainer>
            <Tab />
            <Map />
          </TabContainer>
        </LeftContainer>

        <RightContainer>
          <SelectRoom />
          <MyDatePicker />
          <MyTimePicker />
          <Personnel>
            예약 인원:
            <input type='number' value={person}
            onChange={(e) => setPerson(e.target.value)}/>
            명
          </Personnel>
          <Link to='/book'><Button>예약하기</Button></Link>
        </RightContainer>

        <ToTop />
      </DetailContainer>
    </FullContainer>
  )
}

const FullContainer = styled.div`
  max-width: 100%;
  margin: 5% 10%;
  display: flex;
  flex-direction: column;
`
const DetailHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Title = styled.div`
  font-weight: bold;
  font-size: 2.5rem;
`

const HashTag = styled.span`
  display: inline-block;
  background-color: #9BA3EB;
  color: white;
  border-radius: 20px;
  padding: 0 5px;
  margin-right: 10px;
`

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const LeftContainer = styled.div`
  width: 70%;
`

const RightContainer = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Personnel = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & > input {
    width: 50%;
    max-height: 22px;
    border: 2px solid #8DAEF2;
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
  & > input[type=number] {
    -moz-appearance: textfield;
  }
`

const Button = styled.button`
  width: 100%;
  padding: 5px;
  margin: 20px 0;
  border-radius: 10px;
  border: none;
  background: #8DAEF2;
  color: #fff;

  &:hover {
    box-shadow: 2px 2px 5px -1px #A6A9B6;
  }
`