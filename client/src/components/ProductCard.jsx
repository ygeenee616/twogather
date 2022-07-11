import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import reviewImg from "../assets/images/reviewIcon.png";

const productTags = (tag) => {
  let result = "";
  let resultStr = "";
  for (let i = 0; i < tag.length; i++) {
    resultStr += tag[i];
  }
  if (resultStr.length >= 20) {
    for (let i = 0; i <= 18; i++) {
      result += resultStr[i];
    }
    result += "···";
  }
  return result;
};

const SubTag = styled.span`
  color: #777;
  font-size: 0.7vw;
`;

const CardWrap = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: auto;
  overflow: hidden;
  border: 1px solid #bfbfbf;
  &:hover {
    .productImg {
      transform: scale(1.1, 1.1);
    }
  }
`;

const ProductImg = styled.img`
  width: 100%;
  transition: all 0.5s;
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

export default function ProductCard({
  //id,
  src,
  tag,
  title,
  address,
  price,
  review,
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/detail/1`);
  };
  //후에 아이디 넣기 지금은 임의로  1로 고정
  return (
    <CardWrap onClick={handleClick}>
      <div style={{ overflow: "hidden" }}>
        <ProductImg className="productImg" src={src} />
      </div>
      <ProductInfo>
        <Line>
          <SubTag>{productTags(tag)}</SubTag>
          <img src={reviewImg} style={{ width: "1vw", marginLeft: "auto" }} />
          <SubTag>{review}</SubTag>
        </Line>
        <Line>
          <Title>{title}</Title>
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
