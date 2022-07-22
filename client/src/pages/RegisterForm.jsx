import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  Container,
  ContentsDiv,
  FormDiv,
  PageTitle,
  UserBtn,
  Line,
} from "../components/register/UserForm";
import { gapi } from "gapi-script";
import LoginWithGoogle from "../components/socialLogin/LoginWithGoogle";
import Register from "../components/register/Register";

const CLIENT_ID =
  "356728374824-e4eaoap3tv0cr35gtq8i46qhlpts75nq.apps.googleusercontent.com";

function handleKakaoRegister() {}

function handleGoogleRegister() {}

function RegisterForm() {
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });

  return (
    <Container>
      <FormDiv>
        <ContentsDiv>
          <PageTitle>회원가입</PageTitle>

          <SocialRegisterDiv>
            <a href={`http://localhost:3000/api/users/auth/kakao`}>
              <SocialRegisterBtn
                className="kakao"
                onclick={handleKakaoRegister}
              >
                <img src="/images/kakaoLogo.png" alt="KAKAO" />
                <p>카카오로 시작하기</p>
              </SocialRegisterBtn>
            </a>
          </SocialRegisterDiv>

          <Line />

          <form className="register-form">
            <Register />
          </form>
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

  a {
    text-decoration: none;
    color: black;
  }
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
    if (props.className === "kakao") return `background-color: #FEE500;`;
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

export default RegisterForm;
