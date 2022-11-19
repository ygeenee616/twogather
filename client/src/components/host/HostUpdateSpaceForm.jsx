import React, { useState, useRef, useEffect } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import PostcodePopup from "../admin/PostcodePopup";
import Modal from "../Modal";
import HashTag from "./HashTag";
import * as Api from "../../api";
import TypeSelector from "../TypeSelector";

export default function HostSpaceForm({ data }) {
  const nav = useNavigate();
  const [imageSrc, setImageSrc] = useState("");
  const [detailImgs, setDatailImgs] = useState(null);
  const [select, setSelect] = useState({
    items: ["파티룸", "스터디룸", "회의실", "연습실", "스튜디오"],
    selectItem: "",
  });
  useEffect(() => {
    setSelect({ ...select, selectItem: data.type });
  }, []);

  const { spaceId } = useParams();

  // hashTag state
  const tagIdList = data.hashtags.map((item) => item.id);
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState(
    data.hashtags.map((item) => {
      return { tag: item.tag };
    })
  );

  //address state
  const [addressState, setAddressState] = useState({
    myFullAddress: data.address2,
    myPersonalAddress: data.address3,
    myZoneCode: data.address1,
  });

  const [spaceInfo, setSpaceInfo] = useState({
    name: data.name, //공간명
    type: data.type, //공간타입
    intro: data.intro, //공간소개
    notice: data.notice, //주의사항
    address1: addressState.myZoneCode,
    address2: addressState.myFullAddress,
    address3: addressState.myPersonalAddress,
  });
  console.log(spaceInfo);

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
      type: select.selectItem,
      address1: addressState.myZoneCode,
      address2: addressState.myFullAddress,
      address3: addressState.myPersonalAddress,
    });
  }, [addressState, select.selectItem]);

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
    await Api.patchAuth(`api/spaces/host/${spaceId}`, spaceInfo);

    tagIdList.map(async (id, i) => {
      return await Api.deleteAuth(`api/hashtags/${id}`);
    });
    tagList.map(async (item, i) => {
      return await Api.postAuth(`api/hashtags/${spaceId}`, item);
    });

    handleImgUpload(e);

    const modal = document.querySelector(".modalWrap");
    modal.style.display = "block";
    window.scrollTo(0, 0);
  };

  // hashTag  컴포넌트 함수
  // 엔터 누르면 추가
  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && window.event.keyCode === 13) {
      addHashTag();
    }
  };

  // hashTag 추가 함수
  const addHashTag = () => {
    let updatedTagList = [...tagList];
    updatedTagList.push({ tag: `#${tagItem}` });
    setTagList(updatedTagList);
    setTagItem("");
  };

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
    setAddressState(newItem);
    //console.log("addressState:", addressState); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  //다음 주소 api
  const open = useDaumPostcodePopup();

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  //**************************이미지 처리 api***********************/

  const loadDetailImage = (e) => {
    setDatailImgs(e.target.files);

    const fileArr = Array.from(e.target.files);

    const imgBox = document.querySelector(".imgBox");
    fileArr.forEach((file, index) => {
      const reader = new FileReader();

      //이미지 박스와 이미지 생성
      const imgDiv = document.createElement("div");
      const img = document.createElement("img");

      img.classList.add("image"); //이미지에 이미지 태그 붙이기
      imgDiv.classList.add("imgDiv");

      imgDiv.addEventListener("click", (e) => {
        fileArr.splice(index, 1);
        setDatailImgs(fileArr);
        e.target.remove();
        imgDiv.remove();
      });

      imgDiv.appendChild(img);

      reader.onload = () => {
        img.src = reader.result;
      }; //end on load

      imgBox.appendChild(imgDiv);
      reader.readAsDataURL(file);
    });
  };

  //이미지를 s3에 저장
  const selectedFile = useRef(null);

  const handleImgFileInput = (e) => {
    console.log(e.target.files);
    const data = e.target.files;
    console.log(data);
    selectedFile.current = data;

    console.log(selectedFile.current);
  };

  const handleImgUpload = async () => {
    let imgData = new FormData();

    Array.from(selectedFile.current).map((item) => {
      imgData.append("images", item);
      console.log(imgData);
    });

    console.log(imgData);

    const data = await Api.patchImgAuth(
      `api/uploads/space/${spaceId}`,
      imgData
    );
    console.log(data);
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

        <InputBox className="selectBox">
          <StyledLabel>공간 타입</StyledLabel>
          <NewSelector state={select} setState={setSelect}></NewSelector>
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
            className="imgBox"
            name="spaceSubImages"
            ref={subViewInput}
            onChange={loadDetailImage}
          ></SubImageView>
          <ImageInput
            name="spaceImages"
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              loadDetailImage(e);
              handleImgFileInput(e);
            }}
            id="imgs"
            style={{ display: "none" }}
          ></ImageInput>
          <Label htmlFor="imgs" id="imgs" type="file">
            사진선택
          </Label>
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
            공간수정
          </StyledButton>
        </ButtonBox>
        <ModalWrap className="modalWrap">
          <Modal
            className="updateModal"
            title=""
            content="수정이 완료되었습니다."
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  .image {
    width: 100%;
    display: block;
  }
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
const NewSelector = styled(TypeSelector)`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Label = styled.label`
  width: 48%;
  height: 40px;
  line-height: 40px;

  border: none;
  border-radius: 10px;
  font-size: 1rem;

  background-color: #8daef2;
  color: white;

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
