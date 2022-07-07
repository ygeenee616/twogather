import React from "react";
import styled from 'styled-components';

export default function Button({text}) {
  return (
    <CustomBtn onClick={() => console.log("SUBMIT!")}>{text}</CustomBtn>
  )
}

const CustomBtn = styled.button`
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