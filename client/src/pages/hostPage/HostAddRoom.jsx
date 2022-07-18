import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import PostcodePopup from "../../components/admin/PostcodePopup";
import HashTag from "../../components/host/HashTag";
import * as Api from "../../api";

export default function HostSpaceForm({ mode }) {
  const [imageSrc, setImageSrc] = useState("");
  const [detailImgs, setDatailImgs] = useState([]);
  // hashTag state
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);

  const [roomInfo, setRoomInfo] = useState({
    roomName: "",
    roomType: "",
    personal: "",
    price: "",
    images: { image: [] },
    // spaceId: null,
  });

  const params = useParams();
  const subViewInput = useRef();

  const handleChangeRoomState = (e) => {
    setRoomInfo({
      ...roomInfo,
      [e.target.name]: e.target.value,
    });
  };

  const images = [];

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const roomResponse = await Api.post(`api/rooms/${params.id}`, {
      name: roomInfo.roomName, //공간명
      capacity: Number(roomInfo.personal), //수용인원
      price: Number(roomInfo.price), //공간타입
      description: roomInfo.roomType,
      spaceId: Number(params.id),
      images: [
        "https://t1.daumcdn.net/cfile/tistory/99C6A83359857E0609",
        "https://pbs.twimg.com/media/B5eTRPKCIAAtXtK?format=jpg&name=small",
      ],
      //imgaes: [roomInfo.images],
    });

    console.log(roomResponse);
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

  const getPreviewImg = () => {
    if (images === null || images.length === 0) {
      return (
        <ImgAreaContainer>
          <ImgArea>
            <Img
              src="https://k-startup.go.kr/images/homepage/prototype/noimage.gif"
              alt="dd"
            />
          </ImgArea>
          <ImgName>등록된 이미지가 없습니다.</ImgName>
        </ImgAreaContainer>
      );
    } else {
      return images.map((el, index) => {
        return (
          <ImgAreaContainer key={index}>
            <ImgArea>
              <Img src={images[index]} />
            </ImgArea>

            {/* <DeleteButton onClick={deleteImg}>❌</DeleteButton> */}
          </ImgAreaContainer>
        );
      });
    }
  };

  return (
    <Main>
      <SpaceForm>
        <InputBox>
          <Title>
            룸 정보를 입력해주세요
            <Hr></Hr>
          </Title>
        </InputBox>
        <InputBox>
          <StyledLabel>룸 이름</StyledLabel>
          <StyledInput
            type="text"
            width="50%"
            name="roomName"
            value={roomInfo.roomName}
            onChange={handleChangeRoomState}
          ></StyledInput>
        </InputBox>

        <InputBox>
          <StyledLabel>룸 타입</StyledLabel>
          <StyledInput
            type="text"
            width="50%"
            name="roomType"
            value={roomInfo.roomType}
            onChange={handleChangeRoomState}
          ></StyledInput>
        </InputBox>

        <InputBox>
          <StyledLabel>룸 수용인원</StyledLabel>
          <StyledInput
            type="text"
            width="50%"
            name="personal"
            value={roomInfo.personal}
            onChange={handleChangeRoomState}
          ></StyledInput>
        </InputBox>

        <InputBox>
          <StyledLabel>룸 가격</StyledLabel>
          <StyledInput
            type="text"
            width="50%"
            name="price"
            value={roomInfo.price}
            onChange={handleChangeRoomState}
          ></StyledInput>
        </InputBox>

        <InputBox>
          <StyledLabel>룸 이미지 선택</StyledLabel>
          <ImageView name="images" readonly>
            {imageSrc && <img src={imageSrc} alt="preview" readonly />}
          </ImageView>
          {getPreviewImg()}

          <ImageInput
            name="roomInfo.images.image"
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              encodeFileToBase64(e.target.files[0]);
            }}
          />
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
            onClick={(e) => handleUpdateSubmit(e)}
            color="white"
            backGroundColor="#8daef2"
            name="register"
            className="register"
            type="submit"
            value="submit"
          >
            {mode === "UPDATE" ? "룸수정" : mode === "ADD" ? "룸등록" : ""}
          </StyledButton>
        </ButtonBox>
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
    background-color: black;
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

const ImgAreaContainer = styled.div``;
const ImgArea = styled.div``;
const Img = styled.img``;
const DeleteButton = styled.div``;
const ImgName = styled.div;
