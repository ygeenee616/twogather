import React from "react";
import styled from 'styled-components';
import { BiArrowToTop } from "react-icons/bi";

export default function ToTop() {
  return (
    <TopBtn onClick={() => {window.scrollTo({ top: 0, behavior: 'smooth' })}}>
      <BiArrowToTop size={'2rem'} color='#fff' />
    </TopBtn>
  )
}

const TopBtn = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: #5F85DB;
  display: flex;
  align-items: center;
  justify-content: center;
`