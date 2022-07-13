import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

HomeImageSlider.defaultProps = {
  images: [
    {
      id: 1,
      title: "스튜디오",
      url: "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
    },
    {
      id: 2,
      title: "스터디룸",
      url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
    {
      id: 3,
      title: "파티룸",
      url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
  ],
};

export default function HomeImageSlider({ images }) {
  const nav = useNavigate();
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
              <div onClick={() => nav(`/list/${image.title}`)} key={image.id}>
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
  max-height: 62vh;
`;

const StyledSlider = styled(Slider)`
.slick-arrow {
  z-index: 10;
}
.slick-prev {
  width: 20%;
  visibility: hidden;
}
.slick-next {
  width: 20%;
  visibility: hidden;
}

.slick-list {
  width: 100%;
  max-height: 62vh;

  .slick-track {
    overflow-x: hidden;

    .slick-slide img {
      width: 100%;
      height: 100%;
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
    visibility: visible;
  }
  .slick-next {
    visibility: visible;
}
`;
