import styled from "styled-components";
import MyProfile from "../components/user/MyProfile";
import MyReservation from "../components/user/MyReservation"

function MyPage() {
  return (
    <Container>
      <MyProfile></MyProfile>
      <MyReservation></MyReservation>
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