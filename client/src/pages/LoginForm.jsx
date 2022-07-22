import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  validateEmail,
  validatePassword,
} from "../assets/utils/UsefulFunction";
import * as Api from "../api";

import styled from "styled-components";
import {
  Container,
  ContentsDiv,
  FormDiv,
  PageTitle,
  UserBtn,
} from "../components/register/UserForm";
import userInfoState from "../atom/userInfoState";

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "") setAlertMsg("아이디를 입력해 주세요.");
    else if (password === "") setAlertMsg("비밀번호를 입력해 주세요.");
    else if (!validateEmail(email))
      setAlertMsg("이메일 형식이 올바르지 않습니다.");
    else {
      //로그인 성공
      try {
        const data = { email, password };
        // "/apiusers/sign-in" 엔드포인트로 post요청함.
        const res = await Api.post("api/users/sign-in", data);
        // JWT 토큰은 유저 정보의 token임.
        const jwtToken = `Bearer ${res.data.accessToken}`;
        // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
        localStorage.setItem("userToken", jwtToken);
        setAlertMsg("");

        try {
          const user = await Api.getAuth(`api/users/info`);
          const { nickname, isAdmin, businessNumber } = user.data.data;

          localStorage.setItem("nickname", nickname);

          if (isAdmin) {
            localStorage.setItem("loginType", "admin");
          } else if (businessNumber) {
            localStorage.setItem("loginType", "host");
          } else {
            localStorage.setItem("loginType", "user");
          }
        } catch (err) {
          console.error(err);
        }

        navigate("/", { replace: true });
      } catch (err) {
        console.log("로그인에 실패하였습니다.", err);
        setAlertMsg(
          "아이디 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요."
        );
      }
    }
  };

  return (
    <Container>
      <FormDiv>
        <ContentsDiv>
          <PageTitle>로그인</PageTitle>
          <LoginDiv className="login-form">
            <LoginInputDiv>
              <input
                type="email"
                className="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <input
                type="password"
                className="password"
                placeholder="패스워드"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </LoginInputDiv>
            <LoginButton onClick={handleLogin}>LOGIN</LoginButton>
          </LoginDiv>
          <AlertMsg>
            <span>{alertMsg}</span>
          </AlertMsg>

          {/* <SocialLoginDiv>
            <SocialLoginBtn className="kakao-login">
              <img src="/images/kakaoLogo.png" alt="KAKAO" />
              <p>카카오 로그인</p>
            </SocialLoginBtn>
            <SocialLoginBtn className="kakao-login">
              <img src="/images/googleLogo.png" alt="GOOGLE"></img>
              <p>구글 로그인</p>
            </SocialLoginBtn>
          </SocialLoginDiv> */}

          <LoginFooterDiv>
            <thead>
              <tr>
                <QuestionTD>회원이 아니신가요?</QuestionTD>
                <LinkTD>
                  <a href="/register">회원가입</a>
                </LinkTD>
              </tr>
              <tr>
                <QuestionTD>비밀번호를 잊으셨나요?</QuestionTD>
                <LinkTD>비밀번호 찾기</LinkTD>
              </tr>
            </thead>
          </LoginFooterDiv>
        </ContentsDiv>
      </FormDiv>
    </Container>
  );
}

const LoginDiv = styled.form`
  display: flex;
  flex-direction: row;
  margin: 0 5rem;

  input {
    width: 11rem;
    padding: 0.6rem;
    margin: 0.6rem 0.4rem;
    border: solid #d9d9d9;
    border-radius: 10px;
  }
`;

const LoginInputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoginButton = styled.button`
  height: 7rem;
  width: 6rem;
  margin: 0.2rem 0.2rem;
  border-radius: 10px;
  background-color: #bbd3f2;
  color: white;
  font-weight: bold;
  border: none;

  :hover {
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
  }
`;

const AlertMsg = styled.div`
  margin: 0 6rem;
  text-align: left;
  span {
    font-size: 0.5rem;
    color: red;
  }
`;

const SocialLoginDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const SocialLoginBtn = styled.button`
  display: flex;
  flex-direction: row;
  height: 3rem;
  width: 10rem;
  background-color: white;
  border: solid #d9d9d9;
  border-radius: 10px;
  font-weight: bold;
  margin: 1.5rem 0.5rem;

  :hover {
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
  }

  img {
    width: 2rem;
    height: 2rem;
    border-radius: 5rem;
    margin: 0.3rem 1rem 0 0;
  }
`;
const LoginFooterDiv = styled.table`
  border: none;
  margin: 1.5rem;
  font-size: 0.8rem;
  border-spacing: 0 10px;
`;

const QuestionTD = styled.td`
  text-align: left;
  color: #909090;
`;
const LinkTD = styled.td`
  text-align: right;
  text-decoration: underline;
`;

export default LoginForm;
