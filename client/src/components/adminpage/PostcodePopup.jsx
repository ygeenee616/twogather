import React, { useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import styled from "styled-components";
const PostcodePopup = () => {
  const open = useDaumPostcodePopup();
  
  const [state, setState] = useState({
    myFullAddress: "",
    myPersonalAddress: "",
    myZoneCode: "",
  });

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    let zoneCode = data.zonecode;

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    const newItem = {
      ...state,
      myFullAddress: fullAddress,
      myZoneCode: zoneCode,
    };

    setState(newItem);
    console.log(state);
    // console.log(state); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <>
      <StyledInput
        className="postNum"
        placeholder={state.myZoneCode}
      ></StyledInput>
      <StyledInput placeholder={state.myFullAddress}></StyledInput>
      <StyledInput
        onChange={(e) => {
          setState({
            ...state,
            myPersonalAddress: e.target.value,
          });
        }}
        placeholder={state.myExtraAddress}
      ></StyledInput>
      <ButtonContainer>
        <SmallButton
          type="button"
          backGroundColor="#8daef2"
          color="white"
          onClick={handleClick}
        >
          주소찾기
        </SmallButton>
      </ButtonContainer>
    </>
  );
};

const ButtonContainer = styled.div`
  margin: 0 
  width: 100%;
  display: flex;
  justify-content: right;
`;
const SmallButton = styled.button`
  margin: 0 0;
  width: 200px;
  height: 50px;
  padding: 10px;
  background-color: ${(props) => props.backGroundColor};
  color: ${(props) => props.color};
  cursor: pointer;
  border-radius: 10px;
  border: none;
  :hover {
    background-color: black;
  }
`;

const InputBox = styled.div`
  margin: 10px 0px 10px 0;
  width: 100%;
`;
const StyledInput = styled.input`
  maxlength: 100;
  width: 100%;
  height: 25px;
  padding: 10px;
  border: 1px solid lightgrey;
  margin-bottom: 8px;
  outline-color: #8daef2;
  border-radius: 4px;

  &.postNum {
    width: 50%;
  }
`;
export default PostcodePopup;
