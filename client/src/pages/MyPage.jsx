import styled from "styled-components";
import MyProfile from "../components/mypage/MyProfile";
import MyReservation from "../components/mypage/MyReservation";
import MyQnA from "../components/mypage/MyQnA";
import { PageTitle } from "../components/register/UserForm";
import { useState, useEffect } from "react";
import * as Api from "../api";
import { id } from "date-fns/locale";

function MyPage() {
  const [user, setUser] = useState({});
  const [reservations, setReservations] = useState([]);
  const [qnas, setQnas] = useState([]);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await Api.get("api/users/info");
        const data = res.data.data;

        console.log(data);

        setUser({
          userId: data.id,
          email: data.email,
          name: data.name,
          nickname: data.nickname,
          sex: data.sex,
          phoneNumber: data.phoneNumber,
          profileImage: data.profileImage,
        });

        // data.reservation 과 data.rooms 합치기
        const reservs = data.reservations;
        const spaces = data.spaces;
        const books = [];
        for (var i = 0; i < reservs.length; i++) {
          if(reservs[i] && spaces[i]){
            books.push(Object.assign(reservs[i], spaces[i]));
          }
        }
        setReservations(books);
        
        setQnas(data.qnas);
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, []);

  return (
    <Container>
      <PageTitle>마이페이지</PageTitle>
      {user && <MyProfile userInfo={user}></MyProfile>}
      {reservations && (
        <MyReservation reservations={reservations}></MyReservation>
      )}
      {qnas && <MyQnA qnas={qnas}></MyQnA>}
    </Container>
  );
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-contents: center;
  top: 5rem;
  margin: 0 15vw;
`;

export default MyPage;
