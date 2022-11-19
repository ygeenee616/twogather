import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logoImg from "../assets/images/logo.png";
import SearchBar from "../components/list/SearchBar";
import { deleteCookie, getCookie } from "../useful-function";

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
  const loginType = localStorage.getItem("loginType");
  const navigate = useNavigate();
  const handleLoginClick = () => {
    if (localStorage.getItem("userToken") === null) {
      setIsLogin(true);
      navigate("/login");
    } else {
      localStorage.clear();
      deleteCookie("access_token");
      setIsLogin(false);
      navigate("/");
    }
  };

  useEffect(() => {
    // jwtToken 요청 다시
    if (localStorage.getItem("userToken") === null) {
      if (getCookie("access_token")) {
        localStorage.setItem(
          "userToken",
          `Bearer ${getCookie("access_token")}`,
        );
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    } else {
      setIsLogin(true);
    }
  });
  return (
    <HeaderWrap>
      <Logo className="headerLogo" />
      <SearchBar />
      <RightWrap>
        {loginType === "admin" ? (
          <HeaderTag name="관리자 페이지" target="/admin/notice?page=1" />
        ) : loginType === "host" ? (
          <HeaderTag name="공간등록 및 관리" target="/host/spaceList" />
        ) : isLogin ? (
          <HeaderTag name="호스트 등록하기" target="/host/addHost" />
        ) : (
          ``
        )}
        <HeaderTag name="공지사항" target="/notice?page=1" />
        {isLogin ? <HeaderTag name="마이페이지" target="/mypage" /> : ``}
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
  font-family: "S-CoreDream-8Heavy";
  display: flex;
  cursor: pointer;
  align-items: center;
  .logoImg {
    margin-right: 10px;
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
  font-family: "S-CoreDream-3Light";
  display: flex;
  align-items: center;
  margin-left: auto;
`;
