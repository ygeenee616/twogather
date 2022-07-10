import React, { useState, memo } from "react";
import styled from "styled-components";
import { ImBin } from "react-icons/im";
import { RiEdit2Fill } from "react-icons/ri";
function ListItem({ item, columnTemplete }) {
  const { booker, bookMembers, bookedRoom, price, phoneNumber, date } = item;

  return (
    <ItemList templete={columnTemplete}>
      <Item className="booker">{booker}</Item>
      <Item className="bookedRoom">{bookedRoom}</Item>
      <Item className="bookMembers">{bookMembers}</Item>
      <Item className="price">{price}</Item>
      <Item className="phoneNumber">{phoneNumber}</Item>
      <Item className="date">{date}</Item>
      <Item></Item>
    </ItemList>
  );
}
// 1fr 2fr 1fr 1fr 2fr 1fr 1.2fr;
const ItemList = styled.div`
  display: grid;

  grid-template-columns: ${(props) => props.templete};

  column-gap: 3px;
  border-bottom: 1px solid #bbd3f2;
  &:last-child {
    border-bottom: none;
  }
`;
const Item = styled.div`
  background-color: white;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 3.4rem;
  margin: 0;
`;

const ButtonBox = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const Button = styled.div`
  width:  2.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  border-radius: 5px;
  font-size: 1rem;
  &:last-child {
    margin-left: 5px;
  }

  &.btnModify{
    background-color:#86B7CA;

    .modify {
      &:hover {
        transform: scale(1.3);
      }
    }
  }

  &.btnDelete{
    background-color:#D80907;

    .delete {
      &:hover {
        transform: scale(1.4);
      }
    }
  }
  }


 

  background-color: ${(props) => props.backGroundColor};
  color: ${(props) => props.color};
  cursor: pointer;
  :hover {
  }
`;

export default ListItem;
