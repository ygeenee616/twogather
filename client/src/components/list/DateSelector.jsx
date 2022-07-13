import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";

export default function DateSelector() {
  const handleClickDateSelectBtn = () => {};
  return (
    <SelectButton onClick={handleClickDateSelectBtn}>
      <About>날짜</About>
      <IoIosArrowDown />
    </SelectButton>
  );
}

const SelectButton = styled.button`
  all: unset;
  width: 13vw;
  height: 5vh;
  margin: 1vh 0 6vh 1vw;
  border: 1px solid #8daef2;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  svg {
    margin: auto 5% auto auto;
    color: #8daef2;
  }
`;

const About = styled.div`
  color: #8daef2;
  margin: auto auto auto 10%;
`;
