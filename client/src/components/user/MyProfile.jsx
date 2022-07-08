import styled from "styled-components";

function MyProfile() {
  return (

    <ProfileDiv>
      <ProfileImgDiv>
        <img src="/images/duck.png" alt="프로필 사진" />
        <ProfileImgEditBtn>프로필 수정</ProfileImgEditBtn>
      </ProfileImgDiv>
      <ProfileInfo>
        <tr><Nickname> 닉네임 </Nickname></tr>
        <tr>
          <InfoTag>이메일</InfoTag>
          <InfoTD>duck@naver.com</InfoTD>
        </tr>
        <tr>
          <InfoTag>비밀번호</InfoTag>
          <InfoTD><a>비밀번호 변경</a></InfoTD>
        </tr>
        <tr>
          <InfoTag>소셜 로그인 연동</InfoTag>
          <InfoTD>카카오</InfoTD>
        </tr>
        <tr>
          <InfoTag>생년월일</InfoTag>
          <InfoTD>2000.02.02</InfoTD>
        </tr>
        <tr>
          <InfoTag>성별</InfoTag>
          <InfoTD>여</InfoTD>
        </tr>
      </ProfileInfo>
    </ProfileDiv>

  );
}



const ProfileDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
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

  tr {
    height: 1rem;
  }
`

const Nickname = styled.span`
  font-size: 2rem;
  font-weight: bold;

`

const InfoTag = styled.td`
  color: #505050;
  width: 8rem;
  text-align: left;
`

const InfoTD = styled.td`
  width: 20rem;
  text-align: left;
  height: 1rem;

`

export default MyProfile;