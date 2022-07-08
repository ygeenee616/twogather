import React, { useState, useRef } from "react";
import "../assets/styles/adminPage.css";
import styled from "styled-components";
import Postcode from "../components/adminComponents/Postcode";
import PostcodePopup from "../components/adminComponents/PostcodePopup";

function AdminPage() {
  const [imageSrc, setImageSrc] = useState("");
  const [detailImgs, setDatailImgs] = useState([]);

  const [spaceState, setSpaceState] = useState({
    spaceName: "", //공간명
    spaceType: "", //공간타입
    spaceShortIntro: "", //공간한줄소개
    spaceIntro: "", //공간소개
    spaceTag: "", //태그
    spaceSubImages: "",
    caution: "", //주의사항
    webAddress: "", //웹주소
    realAddress: "", //실주소
  });

  const subViewInput = useRef();

  const handleChangeState = (e) => {
    setSpaceState({
      ...spaceState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(spaceState);
  };

  const loadDetailImage = (e) => {
    for (let i = 0; i < detailImgs.length(); i++) {
      <img src={detailImgs[i]} multiple alt="preview" />;
    }
  };
  //TODO
  //데이터들 STATE객체화 시켜서 받기
  //onClick 이벤트 만들기
  //주소 api 따와서 주소불러오기
  //이미지 그리드로 보여주기
  // - 동적으로 생성해야됨

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        console.log(imageSrc);
        resolve();
      };
    });
  };

  const handleImageUpload = (e) => {
    const fileArr = e.target.files;

    let fileURLs = [];

    let file;
    let filesLength = fileArr.length > 5 ? 5 : fileArr.length;

    for (let i = 0; i < filesLength; i++) {
      file = fileArr[i];

      let reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
        fileURLs[i] = reader.result;
        setDatailImgs([...fileURLs]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Main>
      <SpaceForm>
        <InputBox>
          <Title>
            공간 정보를 입력해주세요
            <Hr></Hr>
          </Title>
        </InputBox>
        <InputBox>
          <StyledLabel>공간명</StyledLabel>
          <StyledInput
            name="spaceName"
            value={spaceState.spaceName}
            onChange={handleChangeState}
          ></StyledInput>
        </InputBox>

        <InputBox>
          <StyledLabel>메인 이미지</StyledLabel>
          <ImageView name="spaceMainImage" readonly>
            {imageSrc && <img src={imageSrc} alt="preview" readonly />}
          </ImageView>
          <ImageInput
            name="spaceMainImage"
            type={"file"}
            accept="image/*"
            onChange={(e) => {
              encodeFileToBase64(e.target.files[0]);
            }}
          />
        </InputBox>

        <InputBox>
          <StyledLabel>공간 한 줄 소개</StyledLabel>
          <StyledInput
            name="spaceShortIntro"
            value={spaceState.spaceShortIntro}
            onChange={handleChangeState}
          ></StyledInput>
        </InputBox>

        <InputBox>
          <StyledLabel>공간 소개</StyledLabel>
          <StyledTextArea
            rows={"10"}
            name="spaceIntro"
            value={spaceState.spaceIntro}
            onChange={handleChangeState}
          ></StyledTextArea>
        </InputBox>

        <InputBox>
          <StyledLabel>예약 시 주의사항</StyledLabel>
          <StyledTextArea
            name="caution"
            value={spaceState.caution}
            onChange={handleChangeState}
          ></StyledTextArea>
        </InputBox>

        <InputBox>
          <StyledLabel>웹사이트 주소</StyledLabel>
          <StyledInput
            name="webAddress"
            value={spaceState.webAddress}
            onChange={handleChangeState}
          ></StyledInput>
        </InputBox>

        <InputBox>
          <StyledLabel>주소지 입력</StyledLabel>
          <PostcodePopup></PostcodePopup>
        </InputBox>

        <InputBox>
          <StyledLabel>공간 이미지 선택</StyledLabel>
          <SubImageView
            name="spaceSubImages"
            ref={subViewInput}
            onChange={loadDetailImage}
          ></SubImageView>
          <ImageInput
            name="spaceImages"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          ></ImageInput>
        </InputBox>
        <ButtonBox>
          <StyledButton
            name="cancel"
            className="cancle"
            backGroundColor="#8daef2"
            color="white"
          >
            등록취소
          </StyledButton>
          <StyledButton
            className="inc"
            onClick={handleSubmit}
            color="white"
            backGroundColor="#8daef2"
            name="register"
            className="register"
          >
            공간등록
          </StyledButton>
        </ButtonBox>
      </SpaceForm>
    </Main>
  );
}

///////////////////////////layout///////////////
//중앙정렬

const Main = styled.div`
  margin: 0 auto;
  width: 80%;
  height: 100%;
  display: flex;

  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const SpaceForm = styled.form`
  margin-top: 100px;
  width: 100%;
  height: 100%;
`;

//////////////////////////////////////////////////
const StyledLabel = styled.div`
  color: #8daef2;
  text-align: start;
  font-family: system-ui;
  margin-bottom: 10px;
  font-size: 1rem;
  font-style: bold;
`;

const StyledInput = styled.input`
  maxlength: 100;
  width: 100%;
  height: 25px;
  padding: 10px;
  border: 1px solid lightgrey;
  outline-color: #8daef2;
  border-radius: 4px;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  resize: none;
  border-radius: 4px;
  padding: 10px;
  border: 1px solid lightgrey;
  outline-color: #8daef2;
  height: 100px;
`;

const InputBox = styled.div`
  padding: 10px;

  text-align: start;
  width: 80%;
  margin: 0 auto;
`;

const ImageInput = styled.input``;

const ImageView = styled.div`
  border: 1px solid lightgrey;
  outline-color: #8daef2;
  height: 300px;
  margin: 10px 0;
  padding: 5px;
  width: 100%;
  overflow: auto;
  border-radius: 4px;
`;

const SubImageView = styled.div`
  border: 1px solid lightgrey;
  outline-color: #8daef2;
  height: 300px;
  margin: 10px 0;
  padding: 5px;
  width: 100%;
  overflow: auto;
  border-radius: 4px;
`;

const StyledButton = styled.button`
  margin: 0 auto;
  width: 48%;
  height: 50px;
  line-height: 50px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  background-color: ${(props) => props.backGroundColor};
  color: ${(props) => props.color};
  display: flex;
  justify-content: space-evenly;
  cursor: pointer;

  :hover {
    background-color: black;
  }
`;

const Title = styled.h1`
  color: #8daef2;
  text-align: center;

  
`;

const ButtonBox = styled.div`
  margin: 0 auto;
  margin-top: 30px;
  padding: 10px;
  width: 80%;
  display: flex;
`;

const Hr = styled.hr`
  border: 2px #8daef2 solid;
`;
export default AdminPage;
