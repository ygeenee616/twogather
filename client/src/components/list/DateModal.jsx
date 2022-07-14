import styled from "styled-components";
import { MyDatePicker } from "../detail/DatePicker";

export default function DateModal({ display }) {
  return (
    <ModalWrap display={display}>
      <MyDatePicker className="datePicker" />
    </ModalWrap>
  );
}

const ModalWrap = styled.div`
  position: absolute;
  top: 22%;
  width: 16.7%;
  height: 50%;
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
