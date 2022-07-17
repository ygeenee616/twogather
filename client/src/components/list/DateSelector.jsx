import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";

export default function DateSelector() {
  return (
    <SelectButton className="Date">
      <About>날짜</About>
      <IoIosArrowDown />
    </SelectButton>
  );
}

const SelectButton = styled.div`
  width: 180px;
  height: 40px;
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
  font-weight: 600;
  margin: auto auto auto 10%;
`;
