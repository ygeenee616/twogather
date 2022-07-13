import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../layout/Header";
import HomeImageSlider from "../components/HomeImageSlider";
import Category from "../components/Category.jsx";
import Recommendation from "../components/Recommendation.jsx";
import Footer from "../layout/Footer.jsx";

export default function Home() {
  return (
    <div>
      <Header />
      <HomeImageSlider />
      <ButtonWrap>
        <Category />
        <Recommendation />
      </ButtonWrap>
      <Footer />
    </div>
  );
}

const ButtonWrap = styled.div`
  display: flex;
  margin: 0 15%;
  flex-direction: column;
`;
