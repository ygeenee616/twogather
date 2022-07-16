import styled from "styled-components";

function MyProfileInfo({user}) {

  const {nickname, email, socialLogin, gender, birthDate} = user;

  return (
    <div>
      <ProfileInfo>
        <tr> 
          <NicknameTD>{nickname}</NicknameTD>
        </tr>
        <tr />
        <tr>
          <InfoTag>이메일</InfoTag>
          <InfoTD> {email} </InfoTD>
        </tr>
        <tr>
          <InfoTag>소셜 로그인 연동</InfoTag>
          <InfoTD>{socialLogin}</InfoTD>
        </tr>
        <tr>
          <InfoTag>성별</InfoTag>
          <InfoTD>{gender}</InfoTD>
        </tr>
        <tr>
          <InfoTag>생년월일</InfoTag>
          <InfoTD>{birthDate}</InfoTD>
        </tr>
    </ProfileInfo>
    </div>
  )

  
}

const ProfileInfo = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: auto;
  height: 10rem;
  justify-content: center;

  tr {
    width: 100%;
    height: 2rem;
  }
  td {
    overflow: hidden;
  }
`


const NicknameTD = styled.td`
  font-size: 2rem;
  font-weight: bold;
  text-align: left;
  
  span {
    text-decoration: underline;
    cursor: pointer;
    margin-left: 1rem;
    font-size: 0.8rem;
    color: grey;
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

export default MyProfileInfo;