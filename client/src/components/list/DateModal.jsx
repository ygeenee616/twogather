import styled from "styled-components";
import ListDatePicker from "./ListDatePicker";

export default function DateModal({ display }) {
  return (
    <ModalWrap display={display}>
      <ListDatePicker />
    </ModalWrap>
  );
}

const ModalWrap = styled.div`
  position: absolute;
  top: 60px;
  left: 1vw;
  width: 350px;
  height: 475px;
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
