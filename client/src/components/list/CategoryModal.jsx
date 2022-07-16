import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function CategoryModal({ display }) {
  const nav = useNavigate();
  const { search } = window.location;
  const params = new URLSearchParams(search);

  //category 중복방지
  params.get("category")
    ? params.delete("category")
    : console.log("category없음");
  const stringParams = params.toString();

  //다른 요소(order, date) 존재에 따른 링크
  const handleClickCategoryLink = (category) => {
    if (stringParams) {
      nav(`/list?category=${category}&${stringParams}`);
    } else {
      nav(`/list?category=${category}`);
    }
    display = "none";
  };

  return (
    <ModalWrap display={display}>
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
  top: 22%;
  width: 15%;
  height: 20%;
  z-index: 100;
  border: 1px solid #8daef2;
  border-radius: 10px;
  display: ${(props) => props.display};
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
