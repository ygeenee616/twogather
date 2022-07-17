import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ImageSlider({ images }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
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
              <div key={image.id}>
                <img src={image.url} />
              </div>
            );
          })}
        </StyledSlider>
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const StyledSlider = styled(Slider)`
  .slick-arrow {
    z-index: 10;
  }
  .slick-prev {
    left: 10px;
  }
  .slick-next {
    right: 10px;
  }

  .slick-list {
    width: 100%;
    border-radius: 20px;

    .slick-track {
      overflow-x: hidden;

      .slick-slide img {
        width: 100%;
        height: 100%;
        border-radius: 20px;
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
`;
