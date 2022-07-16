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
  const path = useRef(window.location.pathname);

  useEffect(() => {
    console.log(window.location.pathname);
    path.current = window.location.pathname;

    if (path.current !== "/list") {
      document.querySelector(".searchInput").value = "";
    }
  }, [window.location.href]);

  //search 중복 방지
  params.get("search") ? params.delete("search") : console.log("");
  const stringParams = params.toString();

  //search 기능
  const handleClickSearchButton = (e) => {
    searchInput.current.length === 0
      ? setCaution(true)
      : stringParams.length === 0
      ? nav(`/list?search=${searchInput.current}`)
      : nav(`/list?${stringParams}&search=${searchInput.current}`);
  };

  //enter button을 누를시에도 search할수있게함
  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      handleClickSearchButton();
    }
  };

  return (
    <SearchWrap>
      <input
        className="searchInput"
        placeholder="공간을 검색해보세요."
        onKeyDown={onCheckEnter}
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
