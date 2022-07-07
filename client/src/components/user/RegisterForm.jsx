import { useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Container, ContentsDiv, FormDiv, FormTitle, UserBtn, Line } from "./UserForm";
import { validateEmail } from "../../assets/utils/usefulFunction";

function RegisterForm() {

  const navigate = useNavigate();
  const params = useParams();

  return (
    <Container>
      <FormDiv>
        <FormTitle>회원가입</FormTitle>
        <div>
          <UserBtn value="USER" onClick={()=> navigate('/register/user')} clicked={params.userType === 'user'}>
            USER
          </UserBtn>
          <UserBtn value="HOST" onClick={()=> navigate('/register/host')} clicked={params.userType === 'host'}>HOST</UserBtn>
        </div>
        <ContentsDiv>
          <SocialRegisterDiv>
            <SocialRegisterBtn className="kakao">
              <img src="/images/kakaoLogo.png" alt="KAKAO" />
              <p>카카오로 가입하기</p>
            </SocialRegisterBtn>
            <SocialRegisterBtn className="google">
              <img src="/images/googleLogo.png" alt="GOOGLE"></img>
              <p>구글로 가입하기</p>
            </SocialRegisterBtn>
          </SocialRegisterDiv>

          <Line />

          <RegisterDiv className="register-form">
            <RegisterInput>
              <tr className="nickname-input">
                <TagTD>닉네임</TagTD>
                <InputTD>
                  <input type="email"></input>
                </InputTD>
              </tr>
              <tr className="email-input">
                <TagTD>이메일</TagTD>
                <InputTD>
                  <input type="email"></input>
                </InputTD>
              </tr>
              <tr className="email-input">
                <TagTD>비밀번호</TagTD>
                <InputTD>
                  <input type="password"></input>
                </InputTD>
              </tr>
              <tr className="password-confirm-input">
                <TagTD>비밀번호 확인</TagTD>
                <InputTD>
                  <input type="password"></input>
                </InputTD>
              </tr>
            </RegisterInput>

            <AgreementDiv></AgreementDiv>

            <RegisterBtn>가입하기</RegisterBtn>
          </RegisterDiv>
        </ContentsDiv>
      </FormDiv>
    </Container>
  );
}

const SocialRegisterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.5rem 0 0.5rem;
`;

const SocialRegisterBtn = styled.button`
  display: flex;
  flex-direction: row;
  height: 2rem;
  width: 13rem;
  border-radius: 10px;
  font-weight: bold;
  margin: 0.5rem;
  border: solid 0.1em #d9d9d9;

  ${(props) => {
    if (props.className == "kakao") return `background-color: #F9E000;`;
    else return ` background-color:white;`;
  }}
  :hover {
    box-shadow: none;
  }

  img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 5rem;
    margin: 0.1rem 0.5rem 0 1.5rem;
  }
  p {
    margin: 0.4rem;
  }
`;

const RegisterDiv = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RegisterInput = styled.table`
  border-spacing: 1rem 0.5rem;
`;
const TagTD = styled.td`
  text-align: right;
  font-weight: bold;
  font-size: 0.8rem;
  color: #8daef2;
`;

const InputTD = styled.td`
  input {
    width: 10rem;
    padding: 0.4rem;
    border: solid #d9d9d9;
    border-radius: 10px;
  }
`;
const AlertTD = styled.td`
  color: #eb5e28;
`;

const AgreementDiv = styled.div``;

// 동의 여부 처리 (전체 동의 시 => )

const RegisterBtn = styled.button`
  height: 2rem;
  width: 15rem;
  margin: 1.5rem;
  border-radius: 10px;
  background-color: #8daef2;
  color: white;
  font-weight: bold;
  border: none;

  :hover {
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  }
`;

export default RegisterForm;
