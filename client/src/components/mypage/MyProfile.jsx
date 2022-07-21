import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  validateEmail,
  validatePassword,
} from "../../assets/utils/UsefulFunction";
import MyProfileInfo from "./MyProfileInfo";
import MyProfileEdit from "./MyProfileEdit";
import defaultProfile from "../../assets/images/defaultProfile.png";
import * as Api from "../../api";
import axios from "axios";

// form 타입 multitype / formdata // name -> images

function MyProfile({ userInfo }) {
  const [editUser, setEditUser] = useState(false);
  const [imageSrc, setImageSrc] = useState(
    userInfo.profileImage || defaultProfile
  );
  const [alertMsg, setAlertMsg] = useState(false);
  const userId = userInfo.userId;

  function handleEditUser() {
    setEditUser(true);
  }

  function handleEditUserDone() {
    setEditUser(false);
  }

  useEffect(() => {
    setEditUser(false);
  }, []);

  const encodeFileToBase64 = (fileBlob) => {
    // 로컬에 변경된 이미지 띄우기
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      if (file) {
        formData.append("images", file);
        encodeFileToBase64(file);
        // 프로필 사진 변경
        await Api.postImg(`api/uploads/profile/${userId}`, formData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProfileDiv>
      <ProfileImgDiv>
        {imageSrc && <img src={imageSrc} alt="내 프로필 사진" />}
        <EditBtnDiv>
          <form>
            <label htmlFor="imgUpload" name="profileImage">
              <div id="img_upload">프로필 사진 변경</div>
            </label>
            <input
              type="file"
              accept="image/*"
              id="imgUpload"
              onChange={handleImageUpload}
              name="images"
            />
            <input
              type="submit"
              value="유저 정보 수정"
              onClick={handleEditUser}
            />
          </form>
        </EditBtnDiv>
      </ProfileImgDiv>
      <ProfileContents>
        {editUser ? (
          <MyProfileEdit user={userInfo} />
        ) : (
          <MyProfileInfo
            user={userInfo}
            editUser={editUser}
            handleEditUserDone={handleEditUserDone}
          />
        )}
      </ProfileContents>
    </ProfileDiv>
  );
}

const ProfileDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: wrap-content;
  text-align: center;
  border: none;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const ProfileContents = styled.div`
  width: 80%;
`;

const ProfileImgDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px 10vw;
  width: 20vw;

  img {
    width: 200px;
    height: 200px;
    border-radius: 200px;
    margin-bottom: 1rem;
  }

  button {
    margin: 2rem 0;
  }
`;

const EditBtnDiv = styled.div`
  input[type="file"] {
    display: none;
  }

  label,
  input[type="submit"] {
    display: inline-block;
    background-color: white;
    color: #bbd3f2;
    width: 8rem;
    height: 2.5rem;
    margin: 0.5rem;
    border: solid #bbd3f2;
    border-radius: 10px;
    font-weight: bold;
    font-size: 0.8rem;

    #img_upload {
      padding: 0.6rem;
    }

    :hover {
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
    }
  }
`;

const AlertMsg = styled.div`
  margin: 0 6rem;
  text-align: left;
  span {
    font-size: 0.5rem;
    color: red;
  }
`;

export default MyProfile;
