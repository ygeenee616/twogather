import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addCommas, isFutureDate } from "../../assets/utils/UsefulFunction";

function MyReservedRoom({ reservation }) {
  const navigate = useNavigate();
  // id는 예약번호, name은 공간이름 , 예약자명 ??
  const {
    id,
    personnel,
    requirement,
    review,
    room,
    date,
    startTime,
    endTime,
    totalPrice,
  } = reservation;
  const nickname = localStorage.getItem("nickname");
  const roomName = room ? room.name : "무슨무슨방";

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
        {/* <RoomImg src={image} alt="공간 이미지"></RoomImg> */}
        <InfoText>
          <InfoTag color="bold">
            <a href={`/detail/${room.space.id}`}>
              {room.space.name} {roomName}
            </a>
          </InfoTag>
          <br />
          <InfoTag color="black">
            예약자: {nickname} / {personnel}인
          </InfoTag>
          <InfoTag color="grey">
            예약일시: {date.split("T")[0]} {startTime}시~{endTime}시
          </InfoTag>
          <InfoTag color="grey"> 결제금액: {addCommas(totalPrice)} 원</InfoTag>
          <InfoTag color="italic">"{requirement}"</InfoTag>
        </InfoText>
      </InfoDiv>
      <EditDiv>
        {isFutureDate(date, startTime) ? (
          <span className="deleteReservation" onClick={handleDeleteReservtaion}>
            예약취소
          </span>
        ) : (
          <b className="">이용완료</b>
        )}
        {isFutureDate(date, startTime) ? (
          ""
        ) : (
          <span className="addReview" onClick={handleAddReview}>
            {review ? "리뷰 수정/삭제" : "리뷰 작성"}
          </span>
        )}
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

  b {
    margin-right: 1rem;
  }

  span {
    text-decoration: underline;
    color: black;
    padding: 0;
    margin: 0 0.5rem;
    cursor: pointer;
    margin-right: 1rem;
  }
`;

export default MyReservedRoom;
