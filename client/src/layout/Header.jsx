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

//nana@naver.com
//@nana1234

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const handleLoginClick = () => {
    if (localStorage.getItem("userToken") === null) {
      setIsLogin(true);
      navigate("/login");
    } else {
      localStorage.removeItem("userToken");
      setIsLogin(false);
      navigate("/");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userToken") === null) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  });

  return (
    <HeaderWrap>
      <Logo className="headerLogo" />
      <SearchBar />
      <RightWrap>
        {isLogin ? (
          <HeaderTag name="호스트등록하기" target="/host/addHost" />
        ) : (
          ``
        )}
        {isLogin ? <HeaderTag name="마이페이지" target="/mypage" /> : ``}
        <HeaderTag name="공지사항" target="/notice" />
        <TextWrap onClick={handleLoginClick}>
          {localStorage.getItem("userToken") === null ? `로그인` : `로그아웃`}
        </TextWrap>
      </RightWrap>
    </HeaderWrap>
  );
}

const TextWrap = styled.div`
  margin-left: 2vw;
  color: black;
  font-size: 1.5vw;
  font-weight: bold;
  cursor: pointer;
`;

const LogoWrap = styled.div`
  display: flex;
  cursor: pointer;
  .logoImg {
    margin: autㅐ;
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
