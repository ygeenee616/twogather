import styled from "styled-components";
import { Link } from "react-router-dom";

export default function CategoryModal({ display }) {
  return (
    <ModalWrap display={display}>
      <StyledLink to="/list/파티룸" onClick={{ display: "none" }}>
        파티룸
      </StyledLink>
      <StyledLink to="/list/스터디룸" onClick={{ display: "none" }}>
        스터디룸
      </StyledLink>
      <StyledLink to="/list/회의실" onClick={{ display: "none" }}>
        회의실
      </StyledLink>
      <StyledLink to="/list/연습실" onClick={{ display: "none" }}>
        연습실
      </StyledLink>
      <StyledLink to="/list/스튜디오" onClick={{ display: "none" }}>
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

const StyledLink = styled(Link)`
  all: unset;
  font-size: 0.9rem;
  //text-align: center;
  padding: 2.9% 13%;

  & + & {
    border-top: 1px solid #8daef2;
  }
  &: hover {
    background-color: #bbd3fe;
  }
`;
