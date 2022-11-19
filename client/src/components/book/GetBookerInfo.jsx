import React from "react";
import styled from "styled-components";

export default function GetBookerInfo({
  name,
  phone,
  email,
  purpose,
  request,
  onChangeName,
  onChangePhone,
  onChangeEmail,
  onChangePurpose,
  onChangeRequest,
  checkPossible,
}) {
  return (
    <Container>
      <Header>
        <Title>예약자 정보</Title>
        <p style={{ color: "red", margin: 0 }}>*필수 입력</p>
      </Header>
      <div>
        <Content>
          <label htmlFor="inputName">
            <span style={{ color: "red" }}>*</span> 이름 :
          </label>
          <Input
            type="text"
            id="inputName"
            placeholder="홍길동"
            onChange={(e) => {
              onChangeName(e.target.value);
              checkPossible(e);
            }}
          ></Input>
        </Content>
        <Content>
          <label htmlFor="inputPhone">
            <span style={{ color: "red" }}>*</span> 연락처 :
          </label>
          <Input
            type="number"
            id="inputPhone"
            placeholder="숫자만 입력. ex)01012345678"
            onChange={(e) => {
              onChangePhone(e.target.value);
              checkPossible(e);
            }}
          ></Input>
        </Content>
        <Content>
          <label htmlFor="inputEmail">
            <span style={{ color: "red" }}>*</span> 이메일 :
          </label>
          <Input
            type="text"
            id="inputEmail"
            placeholder="abc@naver.com"
            onChange={(e) => {
              onChangeEmail(e.target.value);
              checkPossible(e);
            }}
          ></Input>
        </Content>
        <Content>
          <label htmlFor="inputPurpose">사용 목적 :</label>
          <Input
            type="text"
            id="inputPurpose"
            placeholder="공간의 사용 목적을 입력해주세요"
            onChange={(e) => onChangePurpose(e.target.value)}
          ></Input>
        </Content>
        <Content>
          <label htmlFor="inputRequest">요청 사항 :</label>
          <Input
            type="text"
            id="inputRequest"
            placeholder="호스트에게 요청할 사항이 있다면 남겨주세요"
            onChange={(e) => onChangeRequest(e.target.value)}
          ></Input>
        </Content>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  margin-bottom: 40px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 4px solid #a8c1e8;
  padding: 20px 0;
`;

const Title = styled.p`
  text-align: left;
  font-size: 2.2rem;
  font-weight: bold;
  margin: 0;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  font-size: 0.9rem;
`;

const Input = styled.input`
  background-color: #f6f6f6;
  border: none;
  padding: 5px;
  width: 70%;

  &:focus {
    outline: red;
  }

  /* 스피너 제거 */
  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  & [type="number"] {
    -moz-appearance: textfield;
  }
`;
