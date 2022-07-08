import React, {useState} from "react";
import Dropdown from "./Dropdown";
import styled from "styled-components";
import './../../assets/styles/DropDown.css';

SelectRoom.defaultProps = {
  "rooms" : [
    {
      "id" : 1,
      "title" : "ROOM1",
      "pay" : 2000,
      "image" : "https://moplqfgeemqv2103108.cdn.ntruss.com/service/165499379_cb3435826a2e97ca0881d27c3809abd2.jpg?type=m&w=900&h=900&autorotate=true&quality=90",
      "roomType" : "회의실",
      "people" : 3,
    },
    {
      "id" : 2,
      "title" : "ROOM2",
      "pay" : 2500,
      "image" : "https://moplqfgeemqv2103108.cdn.ntruss.com/service/165656778_49d6c018a651d91bab751a4f642e438f.jpg?type=m&w=900&h=900&autorotate=true&quality=90",
      "roomType" : "회의실",
      "people" : 4,
    },
    {
      "id" : 3,
      "title" : "ROOM3",
      "pay" : 3100,
      "image" : "https://moplqfgeemqv2103108.cdn.ntruss.com/service/165656779_ae06739167b0424f0a2995ff7e5825a5.jpg?type=m&w=900&h=900&autorotate=true&quality=90",
      "roomType" : "회의실",
      "people" : 6,
    }
  ]    
}

export default function SelectRoom({rooms}) {

  const [dropdownVisibility, setDropdownVisibility] = useState(false);

  return (
    <RoomList>
      <p>세부 공간 선택</p>
      <DropDownBtn onClick={() => setDropdownVisibility(!dropdownVisibility)}>
        상세 설명 보기
      </DropDownBtn>
      
      {rooms.map((item, i) => {
        return (
        <div key={i}>
          <RoomItem>
            <input type="radio" id="select" name="room" value={item.id}
            onClick={e => console.log(e.target.value)}/>
            <RoomLabel>
              <span>{item.title}</span>
              <span>시간당 {item.pay}</span>
            </RoomLabel>
            <img src={item.image} />
          </RoomItem>
          <Dropdown visibility={dropdownVisibility}>
            <ul>
              <li>공간 유형 : {item.roomType}</li>
              <li>수용 인원 : {item.people}</li>
            </ul>
          </Dropdown>
        </div>
        )
      })}
      
    </RoomList>
  )
}

const RoomList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width : 100%;
  border: solid #8DAEF2;
  border-width: 3px 0;
  font-size: 0.8rem;
`

const DropDownBtn = styled.p`
  margin: 0;
  padding: 5px;
  align-self: flex-end;
  font-size: 0.6rem;
`

const RoomItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 0.7rem;
  border-top: 2px solid #8DAEF2;

  & img {
    width: 50%;
    border-radius: 10px;
    padding: 5px 0;
  }
`

const RoomLabel = styled.div`
  display: flex;
  flex-direction: column;
`
