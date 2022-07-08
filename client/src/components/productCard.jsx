import React, { useState, useEffect } from "react";
import styled from "styled-components";
import reviewImg from "../assets/images/reviewIcon.png";

const productTags = (tag) => {
  let result = "";
  let resultStr = "";
  for (let i = 0; i < tag.length; i++) {
    //result.push(<SubTag>{tag[i]}&nbsp;</SubTag>);
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
  width: 19vw;
  overflow: hidden;
  border: 1px solid #bfbfbf;
  & + & {
    margin-left: 1.1vw;
  }
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
  src,
  tag,
  title,
  address,
  price,
  review,
}) {
  return (
    <CardWrap>
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
