import styled from "styled-components";
import { GrPowerReset } from "react-icons/gr";

export default function SelecotrResetBtn({ category, currentPage }) {
  return (
    <Button
      onClick={() =>
        window.location.replace(
          `/list?category=${category}&page=${currentPage}`
        )
      }
    >
      <div style={{ display: "flex", margin: "auto" }}>
        <GrPowerReset />
        <About>필터 초기화</About>
      </div>
    </Button>
  );
}

const Button = styled.button`
  all: unset;
  width: 120px;
  height: 40px;
  margin: 1vh 0 6vh 0;
  border: 1px solid #8daef2;
  border-radius: 10px;
  cursor: pointer;
  svg {
    margin: auto 2% auto 15%;
  }
  svg path {
    stroke: #8daef2;
  }
`;

const About = styled.div`
  color: #8daef2;
  font-weight: 600;
`;
