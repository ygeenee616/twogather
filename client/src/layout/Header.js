import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logoImg from "../assets/images/logo.png";
import searchIcon from "../assets/images/searchIcon.PNG";

const Logo = () => {
  return (
    <LogoWrap>
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

const LogoWrap = styled.div`
  display: flex;
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
  margin: 4vh 6vw;
`;

export default function Header() {
  return (
    <HeaderWrap>
      <Logo />
      <Search />
    </HeaderWrap>
  );
}
