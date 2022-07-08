import styled from "styled-components";
import MyProfile from "../components/mypage/MyProfile";
import MyReservation from "../components/mypage/MyReservation"
import MyQnA from "../components/mypage/MyQnA";

function MyPage() {
  return (
    <Container>
      <MyProfile></MyProfile>
      <MyReservation></MyReservation>
      <MyQnA></MyQnA>
    </Container>
  );
}


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative; 
  top: 5rem;
`;


export default MyPage;