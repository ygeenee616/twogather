import styled from "styled-components";
import MyProfile from "../components/mypage/MyProfile";
import MyReservation from "../components/mypage/MyReservation";
import MyQnA from "../components/mypage/MyQnA";
import Modal from "../components/Modal";
import { PageTitle } from "../components/register/UserForm";
import { useState, useEffect } from "react";
import partypeople from "../assets/images/partypeople.png";
import * as Api from "../api";

function MyPage() {
  const [user, setUser] = useState({});
  const [reservations, setReservations] = useState([]);
  const [qnas, setQnas] = useState([]);
  const QmodalElem = document.getElementById("deleteMyQModal");

  useEffect(() => {
    // 유저 정보 가져오기
    async function getUser() {
      try {
        const res = await Api.getAuth("api/users/info");
        const data = res.data.data;

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
        setReservations(data.reservations);
        setQnas(data.qnas);
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, []);

  const handleReservationDelete = async (e) => {
    // 모달에서 예약삭제 클릭시
    e.preventDefault();
    try {
      const bookId = document
        .getElementById("deleteMyRModal")
        .getAttribute("target");
      const res = Api.delete(`api/reservations/my/${bookId}`);
      window.location.replace("/mypage");
    } catch (err) {
      console.error(err);
    }
  };

  const handleQnaDelete = async (e) => {
    // 모달에서 질문삭제 클릭시
    e.preventDefault();
    try {
      const qnaId = document
        .getElementById("deleteMyQModal")
        .getAttribute("target");
      const res = await Api.delete(`api/qnas/mypage/${qnaId}`);
      window.location.replace("/mypage");
      QmodalElem.style.display = "none";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <PageTitle>마이페이지</PageTitle>
      {user && <MyProfile userInfo={user}></MyProfile>}
      {reservations && (
        <MyReservation reservations={reservations}></MyReservation>
      )}
      {qnas && <MyQnA qnas={qnas}></MyQnA>}
      <ModalWrap id="deleteMyRModal" target={0}>
        <Modal
          title=" 내 예약내역 삭제"
          content="예약을 취소하시겠습니까?"
          clickEvent={handleReservationDelete}
        />
      </ModalWrap>
      <ModalWrap id="deleteMyQModal" target={0}>
        <Modal
          title=" 내 질문 삭제"
          content="질문을 삭제하시겠습니까?"
          clickEvent={handleQnaDelete}
        />
      </ModalWrap>
    </Container>
  );
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-contents: center;
  top: 5rem;
  margin: 0 15vw;
  ${
    "" /* background-image: url(${partypeople});
  background-repeat: no-repeat; */
  }
`;

const ModalWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 244vh;
  background-color: rgba(90, 90, 90, 0.2);
  display: none;
`;

export default MyPage;
