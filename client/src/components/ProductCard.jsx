import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProductImageSlider from "./ProductImageSlider";
import reviewImg from "../assets/images/reviewIcon.png";

const productTags = (hashtags) => {
  let result = "";
  let resultStr = "";
  if (hashtags) {
    for (let i = 0; i < hashtags.length; i++) {
      resultStr += hashtags[i];
    }
    if (resultStr.length >= 20) {
      for (let i = 0; i <= 18; i++) {
        result += resultStr[i];
      }
      result += "···";
    } else {
      return resultStr;
    }
    return result;
  }
};

export default function ProductCard({
  //id,
  src,
  hashtags,
  name,
  address,
  price,
  review,
  link,
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(link);
  };
  //후에 아이디 넣기 지금은 임의로  1로 고정
  return (
    <CardWrap>
      <ImageSliderWrap>
        <ProductImageSlider images={src} link={link} />
      </ImageSliderWrap>
      <ProductInfo onClick={handleClick}>
        <Line>
          <SubTag>{productTags(hashtags)}</SubTag>
          <img
            src={reviewImg}
            style={{ width: "13px", height: "13px", marginLeft: "auto" }}
          />
          <SubTag>{review}</SubTag>
        </Line>
        <Line>
          <Title>{name}</Title>
        </Line>
        <Line>
          <SubTag>{address}</SubTag>
        </Line>
        <Line style={{ justifyContent: "flex-end", marginTop: "0.6vh" }}>
          <Price>{price}</Price>
          <SubTag style={{ marginTop: "0.6vh" }}>원/시간</SubTag>
        </Line>
      </ProductInfo>
    </CardWrap>
  );
}

const SubTag = styled.span`
  color: #777;
  font-size: 0.7vw;
`;

const CardWrap = styled.div`
  all: unset;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: auto;
  overflow: hidden;
  box-shadow: 3px 3px 5px #bfbfbf;
  border-radius: 10px;
  // border: 1px solid #bfbfbf;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.8vh 0.8vw;
`;

const Line = styled.div`
  display: flex;
`;

const Title = styled.span`
  color: black;
  margin: 0.5vh 0;
  font-weight: bold;
  font-size: 1vw;
`;

const Price = styled.span`
  color: #5155a6;
  font-size: 1.3vw;
  font-weight: 800;
`;

const ImageSliderWrap = styled.div`
  overflow: hidden;
  height: 60%;
`;
