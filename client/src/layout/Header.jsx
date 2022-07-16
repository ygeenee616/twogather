import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logoImg from "../assets/images/logo.png";
import searchIcon from "../assets/images/searchIcon.png";

export const Logo = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <LogoWrap onClick={handleClick}>
      <img className="logoImg" src={logoImg} alt="logo" />
      <div className="logoTitle">TWOGATHER</div>
    </LogoWrap>
  );
};

const Search = () => {
  return (
    <SearchWrap>
      <input className="searchInput" />
      <button className="searchButton">
        <img src={searchIcon} />
      </button>
    </SearchWrap>
  );
};

const HostPage = () => {
  return (
    <TextWrap>
      <div>공간등록 및 관리</div>
    </TextWrap>
  );
};


const HeaderTag = ({name, target}) => {
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


const Login = ({setIsLogin}) => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    if(localStorage.getItem('userToken')===''){ // 토큰 없으면 login 창으로 이동
      navigate("/login");

    }
    else {
      localStorage.setItem('userToken', '');
      navigate("/");
    }
  };
  if(localStorage.getItem('userToken')==='') setIsLogin(false);
  else setIsLogin(true);

  return (
    <TextWrap onClick={handleLoginClick}>
      <div>{localStorage.getItem('userToken')===''?`로그인`:'로그아웃'}</div>
    </TextWrap>
  );
};


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
    width: 2vw;
  }
  .logoTitle {
    font-size: 2vw;
  }
`;

const SearchWrap = styled.div`
  display: flex;
  width: 30vw;
  margin: 0 1vw;
  border: 2px solid #8daef2;
  border-radius: 10px;
  input {
    all: unset;
    margin: 0 1vw;
    flex-grow: 1;
  }
  button {
    all: unset;
    cursor: pointer;
  }
  button img {
    width: 1.5vw;
    margin: 0 0.5vw;
    flex-shrink: 0;
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

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  console.log(localStorage.getItem('userToken')!=='');

  return (
    <HeaderWrap>
      <Logo className="headerLogo" />
      <Search />
      <RightWrap>
        {isLogin ? <HeaderTag name="호스트등록하기" target="/addHost" /> : `` }
        {isLogin ? <HeaderTag name="마이페이지" target="/mypage" /> : `` }
        <HeaderTag name="공지사항" target="/notice" />
        <Login className="login-out" setIsLogin={setIsLogin} />

      </RightWrap>
    </HeaderWrap>
  );
}
