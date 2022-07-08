import React, { useState } from "react";
import styled from 'styled-components';
import DetailHeader from "../components/DetailHeader";
import ImageSlider from "../components/ImageSlider";
import Tab from '../components/Tab';
import Map from "../components/Map";
import SelectRoom from "../components/SelectRoom";
import { MyDatePicker, MyTimePicker } from "../components/DatePicker";
import Button from '../components/Button';
import ToTop from "../components/ToTop";


export default function Detail({title}) {
  const [person, setPerson] = useState(0);

  return (
    <FullContainer>
      <DetailHeader />
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
          <Button text="예약하기" />
        </RightContainer>
        <ToTop />
      </DetailContainer>
    </FullContainer>
  )
}

const FullContainer = styled.div`
  max-width: 100%;
  margin: 5% 15%;
  display: flex;
  flex-direction: column;
`

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const LeftContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
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