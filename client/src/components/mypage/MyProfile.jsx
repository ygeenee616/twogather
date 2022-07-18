import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  validateEmail,
  validatePassword,
} from "../../assets/utils/UsefulFunction";
import MyProfileInfo from "./MyProfileInfo";
import MyProfileEdit from "./MyProfileEdit";
import * as Api from "../../api";

function MyProfile({userInfo}) {
  const [editUser, setEditUser] = useState(false);
  function  handleEditUser() {
    setEditUser(true);
  };

  function handleEditUserDone() {
    setEditUser(false);
  };

  useEffect(()=>{
    setEditUser(false);
 
  },[])

  return (
    <ProfileDiv>
      <ProfileImgDiv>
        <img src="/images/duck.png" alt="프로필 사진" />
        <EditBtnDiv>
          <label htmlFor="imgUpload">
            <div id="img_upload">프로필 사진 변경</div>
          </label>
          <input type="file" accept="image/*" id="imgUpload" />
          <input
            type="button"
            value="유저 정보 수정"
            onClick={handleEditUser}
          />
        </EditBtnDiv>
      </ProfileImgDiv>
      <ProfileContents>
        {editUser ? (
          <MyProfileEdit user={userInfo} />
        ) : (
          <MyProfileInfo user={userInfo} handleEditUserDone={handleEditUserDone}/>
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
    width: 10rem;
    height: 10rem;
    border-radius: 10rem;
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
  input[type="button"] {
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
