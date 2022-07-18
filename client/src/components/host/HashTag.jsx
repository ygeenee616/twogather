import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

export default function HashTag({
  tagItem,
  setTagItem,
  tagList,
  setTagList,
  onKeyPress,
  addHashTag,
  removeHashTag,
}) {
  return (
    <HashTagContainer>
      <p>해시태그</p>
      <HashTagBox>
        {tagList.map((tagItem, index) => {
          return (
            <HashTagItem key={index}>
              <span>{tagItem}</span>
              <Button onClick={(e) => removeHashTag(e)}>X</Button>
            </HashTagItem>
          );
        })}
        <HashTagInput
          type="text"
          placeholder="해시태그를 등록해주세요"
          onChange={(e) => setTagItem(e.target.value)}
          value={tagItem}
          onKeyDown={(e) => onKeyPress(e)}
        />
      </HashTagBox>
    </HashTagContainer>
  );
}

const HashTagContainer = styled.div`
  width: 100%;
  height: 80px;
  color: #8daef2;
`;

const HashTagBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 50px;
  margin: 10px 0;
  padding: 0 10px;
  border: 1px solid lightgrey;
  border-radius: 5px;
`;

const HashTagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 5px 10px;
  background-color: #9ba3eb;
  border-radius: 25px;
  color: white;
  font-size: 0.8rem;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  margin-left: 5px;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  color: #fff;
`;

const HashTagInput = styled.input`
  display: inline-flex;
  min-width: 100px;
  max-width: 100%;
  background: transparent;
  border: none;
  outline: none;
  cursor: text;
`;
