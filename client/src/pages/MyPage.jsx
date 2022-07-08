import styled from "styled-components";
import MyProfile from "../components/user/MyProfile";

function MyPage() {
  return (
    <Container>
      <MyProfile></MyProfile>
    </Container>
  );
}


export const Container = styled.div`
  display: flex;
  felx-direction: column;
  justify-content: center;
  
`;

const PageTitle = styled.div`
  color: #a8c1e8;
`;

export default MyPage;