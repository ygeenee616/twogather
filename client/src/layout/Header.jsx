import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logoImg from "../assets/images/logo.png";
import SearchBar from "../components/list/SearchBar";

export const Logo = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <LogoWrap onClick={handleClick}>
      <img className="logoImg" src={logoImg} alt="logo" />
      <div className="logoTitle">TWO</div>
      <div className="logoTitle">GATHER</div>
    </LogoWrap>
  );
};

const HostPage = () => {
  return (
    <TextWrap>
      <div>공간등록 및 관리</div>
    </TextWrap>
  );
};

const HeaderTag = ({ name, target }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(target);
  };
  return (
    <TextWrap onClick={handleClick}>
      <div>{name}</div>
    </TextWrap>
  );
};

const Login = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    if (localStorage.getItem("userToken") === "") {
      navigate("/login");
    } else {
      localStorage.setItem("userToken", "");
      navigate("/");
    }
  };
  if (localStorage.getItem("userToken") === "") setIsLogin(false);
  else setIsLogin(true);

  return (
    <TextWrap onClick={handleLoginClick}>
      <div>
        {localStorage.getItem("userToken") === "" ? `로그인` : "로그아웃"}
      </div>
    </TextWrap>
  );
};

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  console.log(localStorage.getItem("userToken") !== "");

  return (
    <HeaderWrap>
      <Logo className="headerLogo" />
      <SearchBar />
      <RightWrap>
        {isLogin ? <HeaderTag name="호스트등록하기" target="/addHost" /> : ``}
        {isLogin ? <HeaderTag name="마이페이지" target="/mypage" /> : ``}
        <HeaderTag name="공지사항" target="/notice" />
        <Login className="login-out" setIsLogin={setIsLogin} />
      </RightWrap>
    </HeaderWrap>
  );
}

const TextWrap = styled.div`
  margin-left: 2vw;
  div {
    color: black;
    font-size: 1.5vw;
    font-weight: bold;
    cursor: pointer;
  }
`;

const LogoWrap = styled.div`
  display: flex;
  cursor: pointer;
  .logoImg {
    margin: auto 1%;
    width: 2vw;
    height: 2vw;
  }
  .logoTitle {
    margin: auto 0;
    font-weight: 600;
    font-size: 2vw;
  }
  div: nth-child(2) {
    color: #5155a6;
  }
  div: nth-child(3) {
    color: #8daef2;
  }
`;

const HeaderWrap = styled.div`
  display: flex;
  max-width: 100%;
  padding: 3% 6%;
`;

const RightWrap = styled.div`
  display: flex;
  margin-left: auto;
`;
