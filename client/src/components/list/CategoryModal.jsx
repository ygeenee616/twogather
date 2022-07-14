import styled from "styled-components";

export default function CategoryModal({ display }) {
  return (
    <ModalWrap display={display}>
      <ListItem>파티룸</ListItem>
      <ListItem>스터디룸</ListItem>
      <ListItem>회의실</ListItem>
      <ListItem>연습실</ListItem>
      <ListItem>스튜디오</ListItem>
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

const ListItem = styled.div`
  font-size: 1rem;
  //text-align: center;
  padding: 2.5% 13%;

  & + & {
    border-top: 1px solid #8daef2;
  }
  &: hover {
    background-color: #f2f2f2;
  }
`;
