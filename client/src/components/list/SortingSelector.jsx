import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

export default function CategorySelector() {
  const nav = useNavigate();
  const { search } = window.location;
  const params = new URLSearchParams(search);

  //click시 query 바꿔주는 함수
  const handelClickSortSelect = (order) => {
    params.set("order", order);
    const stringParam = params.toString();
    nav(`/list?${stringParam}`);
  };

  return (
    <SortWrap>
      <SortSelector
        className="sortSelector"
        onChange={(e) => handelClickSortSelect(e.target.value)}
      >
        <option value="recent">최근순</option>
        <option value="past">오래된순</option>
        <option value="hightPrice">가격 높은순</option>
        <option value="lowPrice">가격 낮은순</option>
      </SortSelector>
    </SortWrap>
  );
}

const SortWrap = styled.div`
  display: flex;
  margin-bottom: 2%;
`;

const SortSelector = styled.select`
  border: none;
  margin-left: auto;
  font-size: 1rem;
  font-weight: 600;
  &: focus-visible {
    outline: none;
  }
`;
