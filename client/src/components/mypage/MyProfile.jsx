import styled from "styled-components";
import { useSelector } from 'react-redux';
import { useState } from "react"
import { validatePassword } from "../../assets/utils/UsefulFunction";
import MyProfileInfo from "./MyProfileInfo";
import MyProfileEdit from "./MyProfileEdit";

const user = {
  nickname: "연두부",
  email: "dubu@kakao.com",
  password: "******",
  socialLogin: "카카오",
  gender: "여",
  birthDate: "1999.06.16"
}

function MyProfile() {

  const [editUser, setEditUser] = useState(false);

  const handleUploadImage = () => {
    
  }
  const handleEditUser = () => {
    setEditUser(true);
  }
  // 로그인이 안되어 있을 경우
  return (
    <ProfileDiv>
      <ProfileImgDiv>
        <img src="/images/duck.png" alt="프로필 사진" />
        <EditBtnDiv>
          {/* <input type="file" accept="image/*" value="프로필 사진 변경"/>  */}
          <input type="button" value="유저 정보 수정" onClick={handleEditUser} />
        </EditBtnDiv>   
      </ProfileImgDiv>
    {
      editUser ?
      <MyProfileEdit 
        oldNickname={user.nickname} 
        oldGender={user.gender} 
        oldBirthDate={user.birthDate} /> :
      <MyProfileInfo user={user}/> 
    }
      
    </ProfileDiv>

  );
}



const ProfileDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  height: wrap-content;
  border: none;
  text-align: center;

  @media only screen and (max-width: 1200px) {
    flex-direction: column;

  }
`;

const ProfileImgDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
  margin-right: 5rem;

  img {
    width: 10rem;
    height: 10rem;
    border-radius: 10rem;
    padding: 2rem;
  }

  button + button {
    margin-top: 0.5rem;
  }
`;

const EditBtnDiv = styled.div`
  input {
    background-color: white;
    color: #bbd3f2;
    width: 8rem;
    height: 2.5rem;
    padding: 0.5rem;
    margin: 0.5rem;
    border: solid #bbd3f2;
    border-radius: 10px;
    font-weight: bold;

    :hover {
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
    }

  }
`

const AlertMsg = styled.div`
  margin: 0 6rem;
  text-align: left;
  span {
    font-size: 0.5rem;
    color: red;
  }
`



export default MyProfile;