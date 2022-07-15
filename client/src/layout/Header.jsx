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

const Notice = () => {
  const navigate = useNavigate();
  const handleNoticeClick = () => {
    navigate("/notice");
  };
  return (
    <TextWrap onClick={handleNoticeClick}>
      <div>공지사항</div>
    </TextWrap>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    if (localStorage.getItem("userToken") === "") {
      navigate("/login");
    } else {
      localStorage.setItem("userToken", "");
      navigate("/");
    }
  };
  return (
    <TextWrap onClick={handleLoginClick}>
      <div>
        {!localStorage.getItem("userToken") === "" ? `로그아웃` : "로그인"}
      </div>
    </TextWrap>
  );
};

export default function Header() {
  return (
    <HeaderWrap>
      <Logo className="headerLogo" />
      <SearchBar />
      <RightWrap>
        <Notice />
        <Login />
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
