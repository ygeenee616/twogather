import styled from "styled-components";


function MyProfileInfo({user}) {

  const {nickname, email, socialLogin, gender, birthDate} = user;

  return (
    <div>
      <ProfileInfo>
        <tr> 
          <NicknameTD colSpan={2}>{nickname}</NicknameTD>
        </tr>
        <tr />
        <tr>
          <TagTD>이메일</TagTD>
          <InfoTD> {email} </InfoTD>
        </tr>
        <tr>
          <TagTD>소셜 로그인 연동</TagTD>
          <InfoTD>{socialLogin}</InfoTD>
        </tr>
        <tr>
          <TagTD>성별</TagTD>
          <InfoTD>{gender}</InfoTD>
        </tr>
        <tr>
          <TagTD>생년월일</TagTD>
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
    margin: 0.5rem;
  }

`
const TagTD = styled.td`
  text-align: left;
  font-weight: bold;
  font-size: 0.8rem;
  color: #8daef2;
  width: 8rem;
`;

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
const InfoTD = styled.td`
  font-size: 1rem;
  width: 80%;
  text-align: left;
  height: 1rem;
  
  a {
    text-decoration: underline;
  }
`

export default MyProfileInfo;