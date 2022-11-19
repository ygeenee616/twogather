import { Container, ModalContainer, ModalContent, ModalTitle } from "./Modal";
import { FiAlertCircle } from "react-icons/fi";
import styled from "styled-components";

export default function ModalWithInput({
  title,
  content,
  clickEvent,
  cancelEvent,
  placeholder,
  inputRef,
}) {
  return (
    <Container id="box">
      <ModalContainer>
        <ModalTitle>
          <FiAlertCircle /> {title}
        </ModalTitle>
        <ModalContent>{content}</ModalContent>
        <ModalInput
          type="text"
          placeholder={placeholder}
          ref={inputRef}
        ></ModalInput>
        <ModalButtons>
          <button className="cancelBtn" onClick={cancelEvent}>
            닫기
          </button>
          <button className="OKBtn" onClick={clickEvent}>
            확인
          </button>
        </ModalButtons>
      </ModalContainer>
    </Container>
  );
}

const ModalInput = styled.input`
  width: 12rem;
  padding: 0.6rem;
  border: solid #d9d9d9;
  border-radius: 10px;
`;

const ModalButtons = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  button {
    width: 30%;
    border-radius: 10px;
    margin: 0 0.5rem;
    padding: 5px;
    border: none;
    transition: 0.3s;
    &:hover {
      box-shadow: 2px 2px 5px -1px #a6a9b6;
    }
  }

  .cancelBtn {
    background: lightgrey;
  }
  .OKBtn {
    background: #a8c1e8;
  }
`;
