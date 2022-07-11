import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../layout/Header";
import Category from "../components/Category.jsx";
import Recommendation from "../components/Recommendation.jsx";
import Footer from "../layout/Footer.jsx";

const Slide = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 62vh;
  margin-bottom: 3vh;
`;

const ButtonWrap = styled.div`
  display: flex;
  margin: 0 15%;
  flex-direction: column;
`;

export default function Home() {
  return (
    <div>
      <Header />
      <Slide>slide</Slide>
      <ButtonWrap>
        <Category />
        <Recommendation />
      </ButtonWrap>
      <Footer />
    </div>
  );
}
