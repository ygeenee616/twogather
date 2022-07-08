import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProductCard from "./productCard";
import exImg from "../assets/images/ex1.png";

const exData = {
  src: exImg,
  tag: [
    "#강남모임공간",
    "#강남파티룸",
    "#강남럭셔리파티룸",
    "#강남럭셔리모임공간",
    "#앤틱공간대여",
  ],
  title: "강남최대 앤틱모임공간 공유먼트청담",
  address: "서울 강남구 청담동 88-1 하늘빌딩 지하1층",
  price: "150,000",
  review: "12",
};

const RecomTitle = styled.div`
  font-size: 1.5vw;
  font-weight: bold;
  margin-bottom: 5vh;
`;

const RecomWrap = styled.div`
  margin: 10vh 0;
`;

const CardWrap = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    & + button {
      margin-left: 1vw;
    }
  }
`;

export default function Recommendation() {
  const rendering = () => {
    const result = [];
    for (let i = 1; i <= 4; i++) {
      result.push(
        <ProductCard
          className="recomCard"
          src={exData.src}
          tag={exData.tag}
          title={exData.title}
          address={exData.address}
          price={exData.price}
          review={exData.review}
        ></ProductCard>
      );
    }
    return result;
  };
  return (
    <RecomWrap>
      <RecomTitle>오늘의 추천 공간</RecomTitle>
      <CardWrap>{rendering()}</CardWrap>
    </RecomWrap>
  );
}
