import React, { useState, useRef, useEffect } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostcodePopup from "../../components/admin/PostcodePopup";
import Modal from "../../components/Modal";
import HashTag from "../../components/host/HashTag";
import * as Api from "../../api";
import { FiPrinter } from "react-icons/fi";
import axios from "axios";
import TypeSelector from "../../components/TypeSelector";
import ImgToS3 from "../../components/register/ImgToS3";

export default function HostAddSpace({ mode }) {
  const nav = useNavigate();
  const [select, setSelect] = useState({
    items: ["파티룸", "스터디룸", "회의실", "연습실", "스튜디오"],
    selectItem: "",
  });

  let spaceId = "";

  //imgState
  const [detailImgs, setDatailImgs] = useState(null);

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
    imageUrl: "",
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
      type: select.selectItem, //공간타입
      notice: spaceInfo.notice, //주의사항
      intro: spaceInfo.intro, //공간소개
      address1: addressState.myZoneCode, //실주소
      address2: addressState.myFullAddress,
      address3: addressState.myPersonalAddress,
      images: detailImgs,
    });

    const data = response.data.data;
    spaceId = data.id;
    let responseTag = "";

    //해쉬테그 등록 api
    for (let i = 0; i < tagList.length; i++) {
      responseTag = await Api.post(`api/hashtags/${spaceId}`, tagList[i]);
      console.log(responseTag);
    }

    handleImgUpload(e);

    const modal = document.querySelector(".modalWrap");
    modal.style.display = "block";
    window.scrollTo(0, 0);
  };

  /******************* hashTag  컴포넌트 함수*******/
  useEffect(() => {
    console.log(tagList);
  }, [tagList]);

  // 엔터 누르면 추가
  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && window.event.keyCode === 13) {
      addHashTag();
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
    //let zoneCode = data.myPersonalAddress;
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
        console.log("미지미지");
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
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImgFileInput = (e) => {
    console.log(e.target.files);
    const data = e.target.files;
    console.log(data);
    setSelectedFile(data);

    console.log(selectedFile);
  };

  const handleImgUpload = async () => {
    let imgData = new FormData();

    Array.from(selectedFile).map((item) => {
      imgData.append("images", item);
      console.log(item.name);
    });

    const data = await Api.postImg(`api/uploads/space/${spaceId}`, imgData);

    console.log(data);
    console.log(imgData);
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
            onChange={loadDetailImage}
          ></SubImageView>
          <ImageInput
            name="images"
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
          <Label for="imgs" id="imgs" type="file">
            사진선택
          </Label>
          {/* <input type="file" name="uploadfile" id="img" style="display:none;" />{" "}
    <label for="img">Click me to upload image</label> */}
        </InputBox>

        <ButtonBox>
          <StyledButton
            name="cancel"
            className="cancle"
            backGroundColor="#8daef2"
            color="white"
            onClick={() => {
              nav(-1);
            }}
          >
            취소
          </StyledButton>
          <StyledButton
            onClick={(e) => {
              handleUpdateSubmit(e);
              handleImgUpload(e);
            }}
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
            clickEvent={() => {
              nav("/host/spaceList");
            }}
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
