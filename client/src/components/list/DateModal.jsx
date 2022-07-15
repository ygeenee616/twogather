import styled from "styled-components";
import ListDatePicker from "./ListDatePicker";

export default function DateModal({ display }) {
  return (
    <ModalWrap display={display}>
      <ListDatePicker />
      <ApplyDateButton>날짜 적용하기</ApplyDateButton>
    </ModalWrap>
  );
}

const ModalWrap = styled.div`
  position: absolute;
  top: 22%;
  width: 20%;
  height: 60%;
  z-index: 100;
  border: 1px solid #8daef2;
  border-radius: 10px;
  background-color: white;
  display: ${(props) => props.display};
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  .datePicker {
    background-color: #f2f2f2;
  }
`;

const ApplyDateButton = styled.button`
  all: unset;
  width: 100%;
  height: 10%;
  color: white;
  text-align: center;
  font-weight: 600;
  background-color: #8daef2;
`;
