import styled from "styled-components";

export default function CategoryModal({ display }) {
  const { search } = window.location;
  const params = new URLSearchParams(search);

  //category 중복방지
  params.get("category") && params.delete("category");
  const stringParams = params.toString();

  //다른 요소(order, date) 존재에 따른 링크
  const handleClickCategoryLink = (category) => {
    const categoryModal = document.querySelector("#categoryModal");
    categoryModal.style.display = "none;";
    if (stringParams) {
      window.location.replace(`/list?category=${category}&${stringParams}`);
    } else {
      display = "none";
      window.location.replace(`/list?category=${category}`);
    }
  };

  return (
    <ModalWrap id="categoryModal" display={display}>
      <StyledLink onClick={() => handleClickCategoryLink("파티룸")}>
        파티룸
      </StyledLink>
      <StyledLink onClick={() => handleClickCategoryLink("스터디룸")}>
        스터디룸
      </StyledLink>
      <StyledLink onClick={() => handleClickCategoryLink("회의실")}>
        회의실
      </StyledLink>
      <StyledLink onClick={() => handleClickCategoryLink("연습실")}>
        연습실
      </StyledLink>
      <StyledLink onClick={() => handleClickCategoryLink("스튜디오")}>
        스튜디오
      </StyledLink>
    </ModalWrap>
  );
}

const ModalWrap = styled.div`
  position: absolute;
  top: 60px;
  width: 180px;
  z-index: 100;
  border: 1px solid #8daef2;
  border-radius: 10px;
  ${(props) => `display:${props.display}`};
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  overflow: hidden;
`;

const StyledLink = styled.div`
  all: unset;
  font-size: 0.9rem;
  //text-align: center;
  padding: 3% 13%;

  & + & {
    border-top: 1px solid #8daef2;
  }
  &: hover {
    background-color: #bbd3fe;
  }
`;
