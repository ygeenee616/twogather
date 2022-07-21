import styled from "styled-components";

export default function CategorySelector() {
  const { search } = window.location;
  const params = new URLSearchParams(search);

  //click시 query 바꿔주는 함수
  const handelClickSortSelect = (order) => {
    params.set("order", order);
    const stringParam = params.toString();
    window.location.replace(`/list?${stringParam}`);
  };

  return (
    <SortWrap>
      <SortSelector
        className="sortSelector"
        onChange={(e) => handelClickSortSelect(e.target.value)}
      >
        <option value="date">최근순</option>
        <option value="price">가격 낮은순</option>
        <option value="review">리뷰 많은순</option>
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
