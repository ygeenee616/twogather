import React, { useState, memo } from "react";
import styled from "styled-components";

function ReservationListItem({ item }) {
  const { booker, bookMembers, bookedRoom, price, phoneNumber, date } = item;
  console.log(item);
  return (
    <ItemList>
      <Item className="booker">{booker}</Item>
      <Item className="bookedRoom">{bookedRoom}</Item>
      <Item className="bookMembers">{bookMembers}</Item>
      <Item className="price">{price}</Item>
      <Item className="phoneNumber">{phoneNumber}</Item>
      <Item className="date">{date}</Item>
      <Item>
        <ButtonBox>
          <Button type="button" backGroundColor="#BBD3F2" color="white">
            수정
          </Button>
          <Button backGroundColor="#BBD3F2" color="white">
            삭제
          </Button>
        </ButtonBox>
      </Item>
    </ItemList>
  );
}

const ItemList = styled.div`
  display: grid;

  grid-template-columns: 1fr 2fr 1fr 1fr 2fr 1fr 1.2fr;
  line-height:
  column-gap: 3px;
  &:last-child {
    
  }
`;
const Item = styled.div`
  background-color: white;
  font-size: 1rem;
  line-height: 50px;
  text-align: center;
  height: 50px;
  margin: 0;
`;

const ButtonBox = styled.div`
  width: 100%;
  flex: display;
  justify-content: center;
`;

const Button = styled.div`
  width: 50%;
  height: 80%
  background-color: ${(props) => props.backGroundColor};
  color: ${(props) => props.color};
`;
export default ReservationListItem;
