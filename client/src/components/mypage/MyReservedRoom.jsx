import styled from "styled-components";
import * as Api from "../../api";

function MyReservedRoom({ reservation, idx }) {
  // id는 예약번호, name은 공간이름 , 예약자명 ??
  const {
    id,
    image,
    address,
    personnel,
    requirement,
    totalPrice,
    date,
    startTime,
    endTime,
  } = reservation;

  ///// reservation room 없을 경우. 추후 api 수정후 삭제 ////
  let room;
  if (!reservation.hasOwnProperty(room)) room = "무슨무슨방";

  const handleCancelReservation = async () => {
    try {
      if (window.confirm("예약을 취소하시겠습니까?")) {
        Api.delete(`api/reservations/${id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <RoomDiv>
      <InfoDiv>
        <RoomImg src={image} alt="공간 이미지"></RoomImg>
        <InfoText>
          <InfoTag color="bold">
            <a href={`http://localhost:5001/detail/${id}`}>
              {room} {id}
            </a>
          </InfoTag>{" "}
          <br />
          <InfoTag color="black">예약자: !나! / {personnel}인</InfoTag>
          <InfoTag color="grey">장소: {address}</InfoTag>
          <InfoTag color="grey">
            예약일시:{date} {startTime}시~{endTime}시 (가격: {totalPrice} 원)
          </InfoTag>
          <InfoTag color="italic">"{requirement}"</InfoTag>
        </InfoText>
      </InfoDiv>
      <EditDiv>
        <span onClick={(e) => handleCancelReservation(id)}> 예약취소 </span>
        <a
          href={`/myPage/addReview?bookId=${id}&spaceName=${
            room || "무슨무슨룸"
          }`}
        >
          {" "}
          리뷰작성
        </a>
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
  width: 60vw;

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
  }
`;

export default MyReservedRoom;
