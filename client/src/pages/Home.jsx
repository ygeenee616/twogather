import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HomeImageSlider from "../components/HomeImageSlider";
import Category from "../components/Category.jsx";
import Recommendation from "../components/Recommendation.jsx";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import userInfoState from "../atom/userInfoState";

export default function Home() {
  // const a = useRecoilValue(userInfoState);

  return (
    <div>
      <HomeImageSlider />
      <ButtonWrap>
        <Category />
        <Recommendation />
      </ButtonWrap>
    </div>
  );
}

const ButtonWrap = styled.div`
  display: flex;
  margin: 0 15%;
  flex-direction: column;
`;
