import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

export default function CategorySelector({ category }) {
  const nav = useNavigate();
  const { search } = window.location;
  const params = new URLSearchParams(search);

  const handelClickSortSelect = (order) => {
    params.set("order", order);
    const stringParam = params.toString();
    nav(`/list/${category}?${stringParam}`);
  };

  return (
    <SortWrap>
      <SortSelector
        className="sortSelector"
        onChange={(e) => handelClickSortSelect(e.target.value)}
      >
        <option value="hightPrice">가격 높은 순</option>
        <option value="lowPrice">가격 낮은 순</option>
        <option value="review">리뷰 많은 순</option>
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
