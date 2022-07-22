import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import PostcodePopup from "../../components/admin/PostcodePopup";
import HashTag from "../../components/host/HashTag";
import * as Api from "../../api";
import { set } from "date-fns";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import { RiNotificationBadgeFill } from "react-icons/ri";
import TypeSelector from "../../components/TypeSelector";
export default function HostAddRoom({ mode }) {
  const [imageSrc, setImageSrc] = useState("");
  const [detailImgs, setDatailImgs] = useState([]);
  const [roomId, setRoomId] = useState("");
  let spaceId = "";
  // hashTag state
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);
  const [alert, setAlert] = useState("");
  const [roomInfo, setRoomInfo] = useState({});

  const navigate = useNavigate();

  const params = useParams();
  console.log(params);

  const handleChangeRoomState = (e) => {
    setRoomInfo({
      ...roomInfo,
      [e.target.name]: e.target.value,
    });
  };

  const images = [];

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!roomInfo.capacity || !roomInfo.price) {
      setAlert("값을 입력해 주세요");
    }

    console.log(roomInfo);
    try {
      const roomResponse = await Api.postAuth(`api/rooms/${params.spaceId}`, {
        name: roomInfo.name, //공간명
        capacity: Number(roomInfo.personal), //수용인원
        price: Number(roomInfo.price), //공간타입
        description: roomInfo.description,
      });

      console.log("sdsdsd");
      const roomId = roomResponse.data.data.id;
      console.log(roomId);

      handleImgUpload(roomId);

      const modal = document.querySelector(".modalWrap");
      modal.style.display = "block";
      window.scrollTo(0, 0);
    } catch (err) {
      console.log("er발생");
    }
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
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImgFileInput = (e) => {
    console.log(e.target.files);
    const data = e.target.files;
    console.log(data);
    setSelectedFile(data);

    console.log(selectedFile);
  };

  const handleImgUpload = async (roomId) => {
    let imgData = new FormData();

    Array.from(selectedFile).map((item) => {
      imgData.append("images", item);
      console.log(item.name);
    });
    //d이미지업로드
    const data = await Api.postImgAuth(`api/uploads/room/${roomId}`, imgData);

    console.log(data);
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
            name="name"
            value={roomInfo.roomName}
            onChange={handleChangeRoomState}
          ></StyledInput>
        </InputBox>

        <InputBox>
          <StyledLabel>룸 한줄 소개</StyledLabel>
          <StyledInput
            type="text"
            width="50%"
            name="description"
            value={roomInfo.description}
            onChange={handleChangeRoomState}
          ></StyledInput>
        </InputBox>

        <InputBox>
          <StyledLabel>룸 수용인원</StyledLabel>
          <StyledInput
            onInput={(e) => {
              e.target.value = e.target.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*)\./g, "$1");
            }}
            type="text"
            width="50%"
            name="personal"
            min="1"
            value={roomInfo.personal}
            onChange={handleChangeRoomState}
          ></StyledInput>
          <AlertMsg>{alert}</AlertMsg>
        </InputBox>

        <InputBox>
          <StyledLabel>룸 가격</StyledLabel>
          <StyledInput
            onInput={(e) => {
              e.target.value = e.target.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*)\./g, "$1");
            }}
            type="text"
            width="50%"
            min="0"
            name="price"
            value={roomInfo.price}
            onChange={handleChangeRoomState}
          ></StyledInput>

          <AlertMsg>{alert}</AlertMsg>
        </InputBox>

        <InputBox>
          <StyledLabel>룸 이미지 선택</StyledLabel>
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
            onClick={() => navigate(-1)}
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
            룸추가
          </StyledButton>
        </ButtonBox>
        <ModalWrap className="modalWrap">
          <Modal
            className="updateModal"
            title="룸 추가"
            content="룸이 추가되었습니다."
            clickEvent={() => navigate("/host/spaceList")}
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
const Img = styled.div``;
const ImgName = styled.div``;
const ImgArea = styled.div``;

const AlertMsg = styled.div`
  color: red;
  text-align: left;
`;

const ModalWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 244vh;
  background-color: rgba(90, 90, 90, 0.2);
  display: none;
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
