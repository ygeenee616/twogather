import React, { useState, useRef, useEffect } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostcodePopup from "../../components/admin/PostcodePopup";
import Modal from "../../components/Modal";
import HashTag from "../../components/host/HashTag";
import * as Api from "../../api";

export default function HostAddSpace({ mode }) {
  const nav = useNavigate();

  const [imageSrc, setImageSrc] = useState("");
  const [detailImgs, setDatailImgs] = useState([]);

  // hashTag state
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);

  //address가 object로 바뀌어야할듯
  const [addressState, setAddressState] = useState({
    myFullAddress: "",
    myPersonalAddress: "",
    myZoneCode: "",
  });
  const [spaceInfo, setSpaceInfo] = useState({
    name: "", //공간명
    type: "", //공간타입
    intro: "", //공간소개
    hashTags: [], //태그
    Images: "귀여운탱구사진",
    notice: "", //주의사항
    address1: "",
    address2: "",
    address3: "", //실주소
  });

  //주소창 handlechange
  const handleChangeAddressState = (e) => {
    setAddressState({
      ...addressState,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setSpaceInfo({
      ...spaceInfo,
      address1: addressState.myFullAddress,
      address2: addressState.myPersonalAddress,
      address3: addressState.myZoneCode,
    });
  }, [addressState]);

  const subViewInput = useRef();

  //input값이 바뀔시 해당 value 바뀜
  const handleChangeState = (e) => {
    setSpaceInfo({
      ...spaceInfo,
      [e.target.name]: e.target.value,
    });
  };

  //공간수정 버튼 누를 시 patch 요청
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const response = await Api.post(`api/spaces`, {
      name: spaceInfo.name, //공간명
      address1: spaceInfo.address1,
      address2: spaceInfo.address2,
      address3: spaceInfo.address3,
      type: spaceInfo.type, //공간타입
      notice: spaceInfo.notice, //주의사항
      intro: spaceInfo.intro, //공간소개
      //hashtags: spaceInfo.tagList,
      //   images:
      //     "https://z-images.s3.amazonaws.com/5/51/%EC%9D%BC%EC%96%B4%EB%82%98_%EC%BD%94%EB%94%A9%ED%95%B4%EC%95%BC%EC%A7%80.jpg",
    });
    const data = response.data.data;
    const spaceId = data.id;
    let responseTag = "";

    for (let i = 0; i < tagList.length; i++) {
      responseTag = await Api.post(`api/hashtags/${spaceId}`, tagList[i]);
      console.log(responseTag);
    }

    const modal = document.querySelector(".modalWrap");
    modal.style.display = "block";
    window.scrollTo(0, 0);
  };

  const loadDetailImage = (e) => {
    for (let i = 0; i < detailImgs.length(); i++) {
      <img src={detailImgs[i]} multiple alt="preview" />;
    }
  };

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

  // hashTag  컴포넌트 함수
  useEffect(() => {
    // ['스터디룸', '모임', '강남'] 이런식으로 배열로 들어감
    console.log(tagList);
  }, [tagList]);

  // 엔터 누르면 추가
  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && window.event.keyCode === 13) {
      addHashTag();
      console.log("Asdasdasdasdasdsaadsadad");
    }
  };

  // hashTag 추가 함수
  const addHashTag = () => {
    let updatedTagList = [...tagList];

    let a = { tag: `#${tagItem}` };

    updatedTagList.push(a);

    setTagList(updatedTagList);
    console.log(updatedTagList);
    setTagItem("");
    console.log(tagItem);
  };

  useEffect(() => {
    setSpaceInfo({
      ...spaceInfo,
    });
  }, []);

  // hashTag 삭제
  const removeHashTag = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tagList.filter(
      (tagItem) => tagItem.tag !== deleteTagItem
    );

    setTagList(filteredTagList);
  };

  //주소창 관련 함수
  //다음 api에서 우편번호, fulladdress불러옴
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let zoneCode = data.zonecode;
    console.log(data);

    // if (data.addressType === "R") {
    //   if (data.bname !== "") {
    //     extraAddress += data.bname;
    //   }
    //   if (data.buildingName !== "") {
    //     extraAddress +=
    //       extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
    //   }
    //   fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    // }
    const newItem = {
      ...addressState,
      myFullAddress: fullAddress,
      myZoneCode: zoneCode,
    };
    console.log(newItem);
    setAddressState(newItem);
    console.log("addressState:", addressState); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  //다음 주소 api
  const open = useDaumPostcodePopup();

  const handleClick = () => {
    open({ onComplete: handleComplete });
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
            type="text"
            width="50%"
            name="name"
            value={spaceInfo.name}
            onChange={(e) => handleChangeState(e)}
          ></StyledInput>
        </InputBox>

        <InputBox>
          <StyledLabel>공간 소개</StyledLabel>
          <StyledTextArea
            type="text"
            rows={"10"}
            name="intro"
            value={spaceInfo.intro}
            onChange={(e) => handleChangeState(e)}
          ></StyledTextArea>
        </InputBox>

        <HashTag
          tagItem={tagItem}
          setTagItem={setTagItem}
          tagList={tagList}
          setTagList={setTagList}
          onKeyPress={onKeyPress}
          addHashTag={addHashTag}
          removeHashTag={removeHashTag}
        />

        <InputBox>
          <StyledLabel>예약 시 주의사항</StyledLabel>
          <StyledTextArea
            type="text"
            name="notice"
            value={spaceInfo.notice}
            onChange={(e) => handleChangeState(e)}
          ></StyledTextArea>
        </InputBox>

        <InputBox>
          <StyledLabel>주소지 입력</StyledLabel>
          <PostcodePopup
            name="address"
            value={addressState}
            state={addressState}
            onChange={handleChangeAddressState}
            handleClick={handleClick}
          ></PostcodePopup>
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
            취소
          </StyledButton>
          <StyledButton
            onClick={handleUpdateSubmit}
            color="white"
            backGroundColor="#8daef2"
            name="register"
            className="register"
            type="submit"
            value="submit"
          >
            공간등록
          </StyledButton>
        </ButtonBox>
        <ModalWrap className="modalWrap">
          <Modal
            className="addModal"
            title="공간 등록"
            content="공간 등록이 완료되었습니다."
            clickEvent={() => nav("/host/spaceList")}
          />
        </ModalWrap>
      </SpaceForm>
    </Main>
  );
}

///////////////////////////layout///////////////
//중앙정렬

const Main = styled.div`
  margin: 0 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const SpaceForm = styled.div`
  margin-top: 100px;
  margin: 0 10%;
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
  width: ${(props) => props.width};
  height: 25px;
  padding: 5px;
  border: 1px solid lightgrey;
  outline-color: #8daef2;
  border-radius: 4px;

  & + & {
    margin-left: 3%;
  }
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
  display: flex;
  align-items: start;
  text-align: start;
  flex-direction: column;
  margin: 40px auto;
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
  width: 48%;
  height: 40px;
  line-height: 40px;

  border: none;
  border-radius: 10px;
  font-size: 1rem;

  background-color: ${(props) => props.backGroundColor};
  color: ${(props) => props.color};

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition-duration: 0.3s;

  :hover {
    background-color: #5155a6;
  }
  & + & {
    margin-left: 20px;
  }
`;

const Title = styled.h1`
  color: #8daef2;
  text-align: center;
`;

const ButtonBox = styled.div`
  margin: 0 auto;
  margin-top: 10%;

  width: 100%;
  display: flex;
`;

const Hr = styled.hr`
  border: 2px #8daef2 solid;
`;

const ModalWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 244vh;
  background-color: rgba(90, 90, 90, 0.2);
  display: none;
`;
