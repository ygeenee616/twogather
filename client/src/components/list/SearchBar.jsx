import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import searchIcon from "../../assets/images/searchIcon.png";

export default function SearchBar() {
  const searchInput = useRef("");
  const [caution, setCaution] = useState(false);
  const nav = useNavigate();

  const { search } = window.location;
  const params = new URLSearchParams(search);
  const initialSearch = params.get("search");
  const stringParams = params.toString();

  const handleClickSearchButton = () => {
    searchInput.current.length === 0
      ? setCaution(true)
      : nav(`/list?${stringParams}&search=${searchInput.current}`);
  };

  return (
    <SearchWrap>
      <input
        className="searchInput"
        placeholder="공간을 검색해보세요."
        onChange={(e) => (searchInput.current = e.target.value)}
      />
      <button
        type="submit"
        className="searchButton"
        onClick={handleClickSearchButton}
      >
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
  .searchInput {
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
