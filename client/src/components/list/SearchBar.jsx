import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import searchIcon from "../../assets/images/searchIcon.png";

export default function SearchBar() {
  return (
    <SearchWrap>
      <input className="searchInput" />
      <button className="searchButton">
        <img src={searchIcon} />
      </button>
    </SearchWrap>
  );
}

const SearchWrap = styled.div`
  display: flex;
  width: 30vw;
  height: 35px;
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
