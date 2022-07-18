import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

export default function HashTag() {
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    // ['스터디룸', '모임', '강남'] 이런식으로 배열로 들어감.
    console.log(tagList);
  }, [tagList]);

  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === "Enter") {
      addHashTag();
    }
  };

  const addHashTag = () => {
    let updatedTagList = [...tagList];
    updatedTagList.push(tagItem);
    setTagList(updatedTagList);
    setTagItem("");
  };

  const removeHashTag = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tagList.filter(
      (tagItem) => tagItem !== deleteTagItem
    );
    setTagList(filteredTagList);
  };

  return (
    <HashTagContainer>
      <p>HashTag</p>
      <HashTagBox>
        {tagList.map((tagItem, index) => {
          return (
            <HashTagItem key={index}>
              <span>{tagItem}</span>
              <Button onClick={removeHashTag}>X</Button>
            </HashTagItem>
          );
        })}
        <HashTagInput
          type="text"
          placeholder="해시태그를 등록해주세요"
          onChange={(e) => setTagItem(e.target.value)}
          value={tagItem}
          onKeyPress={onKeyPress}
        />
      </HashTagBox>
    </HashTagContainer>
  );
}

const HashTagContainer = styled.div`
  padding: 10px;
  height: 80px;
`;

const HashTagBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 50px;
  margin: 10px 0;
  padding: 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;

  &:focus-within {
    border: 1px solid rgba(0, 0, 0, 0.7);
  }
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
