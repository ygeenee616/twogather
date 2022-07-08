import styled from "styled-components";

function MyProfile() {
  return (
    <ProfileDiv>
      <ProfileImgDiv>
        <image src=""> </image>
        <ProfileImgEditBtn>프로필 수정</ProfileImgEditBtn>
      </ProfileImgDiv>
    </ProfileDiv>
  );
}

const ProfileDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProfileImgDiv = styled.div`
  width: 5rem;
  height: 5rem;
  image {
    border-radius: 20px;
  }
`;

const ProfileImgEditBtn = styled.div`
  
`;
