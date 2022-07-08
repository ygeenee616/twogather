import styled from "styled-components";
import ReservedRoom from "./ReservedRoom";


function MyReservation() {


    return(
        <ReservationDiv>
            <h3>나의 예약 정보</h3>
            <ReservationTable>
                <ReservedRoom></ReservedRoom>
            </ReservationTable>
        
        </ReservationDiv>       
    );
}

const ReservationDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: wrap-content;
  border: none;
  text-align: center;
  margin: 3rem 0;

  h3 {
      text-align: left;
      font-size: 1.5rem;
      color: #8daef2;
      margin: 0 15vw;
  }
`;



const ReservationTable = styled.table`

`


export default MyReservation;