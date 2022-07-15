import styled from "styled-components";
import { useSelector } from 'react-redux';
import { useState } from "react"


function MyProfile() {
  const user = {
    nickname: "연두부",
    email: "dubu@kakao.com",
    password: "******",
    socialLogin: "카카오"
  }
  const [editNickname, setEditNickname] = useState(true);
  const [nickname, setNickname] = useState(user.nickname)

  const handleEditNickname = (e) => {
    e.preventDefault();
    setEditNickname(!editNickname);
  }
  // 로그인이 안되어 있을 경우
  return (

    <ProfileDiv>
      <ProfileImgDiv>
        <img src="/images/duck.png" alt="프로필 사진" />
        <ProfileImgEditBtn>프로필 수정 </ProfileImgEditBtn>
      </ProfileImgDiv>
      <ProfileInfo>
        <tr> 
          <Nickname colSpan='2'> 
          {editNickname 
            ? nickname 
            : <input value={nickname} onChange={(e)=>setNickname(e.target.value)} placeholder="닉네임을 입력하세요"/>} 
           
            { editNickname ? <span className="edit" onClick={handleEditNickname}> 수정 </span>: <button className="doneEditBtn">수정 완료</button> }
          </Nickname>  
        </tr>
        <tr>

          <InfoTag>이메일</InfoTag>
          <InfoTD> {user.email} </InfoTD>
        </tr>
        <tr>
          <InfoTag>비밀번호</InfoTag>
          <InfoTD><span>비밀번호 변경</span></InfoTD>
        </tr>
        <tr>
          <InfoTag>소셜 로그인 연동</InfoTag>
          <InfoTD>{user.socialLogin}</InfoTD>
        </tr>
      </ProfileInfo>
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
`;

const ProfileImgDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 10rem;
    height: 10rem;
    border-radius: 10rem;
    padding: 2rem;
  }
`;

const ProfileImgEditBtn = styled.div`
  border: solid #505050;
  width: 7rem;
  padding: 0.2rem;
  font-size: 0.8rem;
`;


const ProfileInfo = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  margin-left: 3rem;

  tr {
    width: 100%;
    height: 1rem;
  }
`

const Nickname = styled.td`
  font-size: 2rem;
  font-weight: bold;
  text-align: left;
  .edit {
    margin-left: 1rem;
    font-size: 0.8rem;
    color: grey;
    text-decoration: underline;
    cursor: pointer;
  }
  input {
    height: 2rem;
    padding: 0 0.5rem;
  }

  .doneEditBtn {
    background-color: light-grey;
    width: 5rem;
    height: 2.5rem;
    padding: 0.5rem;
    margin: 0 1rem;
    border: solid;
    font-weight: bold;

    :hover {
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
    }
  }
`

const InfoTag = styled.td`
  font-size: 1rem;
  color: #505050;
  width: 10rem;
  text-align: left;
`

const InfoTD = styled.td`
  font-size: 1rem;
  width: 20rem;
  text-align: left;
  height: 1rem;
  
  a {
    text-decoration: underline;
  }
`

export default MyProfile;