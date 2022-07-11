import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
import reviewImg from "../assets/images/reviewIcon.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

function ImageSlider({ images }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
  };
  return (
    <Container>
      <div>
        <StyledSlider {...settings}>
          {images.map((image) => {
            return (
              <div>
                <img src={image} />
              </div>
            );
          })}
        </StyledSlider>
      </div>
    </Container>
  );
}

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
    <CardWrap>
      <ImageSliderWrap>
        <ImageSlider images={src} />
      </ImageSliderWrap>
      <ProductInfo onClick={handleClick}>
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

const Container = styled.div`
  max-width: 100%;
`;

const ImageSliderWrap = styled.div`
  overflow: hidden;
  height: 60%;
`;

const StyledSlider = styled(Slider)`
  .slick-arrow {
    z-index: 10;
  }
  .slick-prev {
    width: 40%;
    height: 100%;
    visibility: hidden;
  }
  .slick-next {
    width: 40%;
    height: 100%;
    visibility: hidden;
  }

  .slick-list {
    width: 100%;

    .slick-track {
      overflow-x: hidden;

      .slick-slide img {
        width: 100%;
        height: 100%;
        transition: transform 0.5s;
      }
    }
  }

  .slick-dots {
    bottom: 10px;

    li button:before {
      opacity: 1;
      color: #d4d4d4;
    }

    li.slick-active button:before {
      opacity: 1;
      color: #fff;
    }
  }
  &:hover {
    .slick-prev {
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0)
      );
      visibility: visible;
    }
    .slick-next {
      background: linear-gradient(
        to left,
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0)
      );
      visibility: visible;
    }
    // .slick-slide img {
    //   transform: scale(1.1, 1.1);
    // }
  }
`;
