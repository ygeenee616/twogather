import { toDate } from "date-fns";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addCommas } from "../../assets/utils/UsefulFunction";
import * as Api from "../../api";

function isFutureDate(date, startTime) {
  // YYYY-MM-DD 형태의 날짜값
  const today = new Date();
  const year = parseInt(date.split("-")[0]);
  const month = parseInt(date.split("-")[1]);
  const day = parseInt(date.split("-")[2]);
  const time = parseInt(startTime);
  console.log(year);

  if (year > parseInt(today.year)) return true;
  else if (year === parseInt(today.year)) {
    if (month > parseInt(today.month)) return true;
    else if (month === parseInt(today.month)) {
      if (day > parseInt(today.day)) return true;
      else if (day === parseInt(today.day) && time > parseInt(today.hours))
        return true;
    }
  }

  return false;
}

function MyReservedRoom({ reservation, setDeleteR }) {
  const navigate = useNavigate();
  // id는 예약번호, name은 공간이름 , 예약자명 ??
  const {
    id,
    image,
    personnel,
    requirement,
    review,
    room,
    date,
    startTime,
    endTime,
  } = reservation;
  const nickname = localStorage.getItem("nickname");
  const roomName = room ? room.name : "무슨무슨방";
  const roomPrice = room ? parseInt(room.price) : 999999;

  const handleAddReview = (e) => {
    navigate(`/myPage/addReview?bookId=${id}`, {
      state: { roomName: roomName ?? "무슨무슨방", review: review },
    });
  };

  const handleDeleteReservtaion = async (e) => {
    e.preventDefault();
    const deleteRModal = document.getElementById("deleteMyRModal");
    deleteRModal.style.display = "block";
    deleteRModal.setAttribute("target", id);
    console.log(deleteRModal.geAttribute("target"));
  };

  return (
    <RoomDiv>
      <InfoDiv>
        <RoomImg src={image} alt="공간 이미지"></RoomImg>
        <InfoText>
          <InfoTag color="bold">
            <a href={`/detail/${id}`}>{roomName ?? "무슨무슨방"}</a>
          </InfoTag>
          <br />
          <InfoTag color="black">
            예약자: {nickname} / {personnel}인
          </InfoTag>
          <InfoTag color="grey">
            예약일시: {date.split("T")[0]} {startTime}시~{endTime}시
          </InfoTag>
          <InfoTag color="grey"> 결제금액: {addCommas(roomPrice)} 원</InfoTag>
          <InfoTag color="italic">"{requirement}"</InfoTag>
        </InfoText>
      </InfoDiv>
      <EditDiv>
        <span className="deleteReservation" onClick={handleDeleteReservtaion}>
          예약취소
        </span>
        <span className="addReview" onClick={handleAddReview}>
          리뷰 작성
        </span>
      </EditDiv>
    </RoomDiv>
  );
}

const RoomDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem 0;
  border-bottom: solid lightgrey;

  @media only screen and (max-width: 1000px) {
    flex-direction: column;
    div + div {
      margin-top: 1rem;
    }
  }
`;

const InfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;
const RoomImg = styled.img`
  width: 10rem;
  height: 6rem;
`;
const InfoText = styled.span`
  text-align: left;
  width: 45vw;
`;
const InfoTag = styled.p`
  font-size: 1rem;
  ${(props) => {
    if (props.color === "bold") return `font-weight: bold;`;
    else if (props.color === "italic")
      return `color: #bbd3f2; font-style: italic;`;
    else return `color: ${props.color};`;
  }}
  margin: 0.5rem 2rem;
  width: 20rem;
  a {
    text-decoration: none;
    color: black;
  }
`;

const EditDiv = styled.div`
  text-algin: left;

  a,
  span {
    text-decoration: underline;
    color: black;
    padding: 0;
    margin: 0 0.5rem;
    cursor: pointer;
  }
`;

export default MyReservedRoom;
