import styled from "styled-components";



function MyReservedRoom({room, idx}) {

  const {image, booker, space, personnel, location, visitingTime} = room;

  const handleCancelReservation = () => {

  }
  
  let reviewId= 1;

  return (
    <RoomDiv>
      <InfoDiv>
        <RoomImg src={image} alt="공간 이미지"></RoomImg>
        <InfoText>
          <InfoTag color="black"><a href={`http://localhost:5001/detail/${idx}`}>{space} {idx}</a></InfoTag> <br/>
          <InfoTag color="light-grey">예약자: {booker} / {personnel}인</InfoTag>
          <InfoTag color="grey">장소: {location}></InfoTag>
          <InfoTag color="grey">예약일시:{visitingTime}</InfoTag>
        </InfoText>
      </InfoDiv>
      <EditDiv>
        <span onClick={handleCancelReservation}> 예약취소 </span>
        <a href={`/myPage/addReview?reviewId=${reviewId}`}> 리뷰작성</a>
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
`
const InfoTag = styled.p`
  font-size: 1rem;
  ${props => 
    (props.color ==='black') ? `font-weight: bold;` :`color: ${props.color};`
  }
  margin: 0.5rem 2rem;

  a {
    text-decoration: none;
    color: black;
  }
`;

const EditDiv =styled.div`
  text-algin: left;
  a, span {
    text-decoration: underline;
    color: black;
    padding: 0;
    margin: 0 0.5rem;
  }
  
`

export default MyReservedRoom;
