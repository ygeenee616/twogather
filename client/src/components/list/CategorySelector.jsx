import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";

export default function CategorySelector({ category }) {
  category === null ? (category = "카테고리") : (category = category);
  return (
    <SelectButton className="Category">
      <About>{category}</About>
      <IoIosArrowDown />
    </SelectButton>
  );
}

CategorySelector.defaultProps = {
  category: "카테고리",
};

const SelectButton = styled.div`
  width: 180px;
  height: 40px;
  margin: 1vh 0 6vh 0;
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
