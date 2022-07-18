import styled from "styled-components";
import ReservedRoom from "./MyReservedRoom";
import Pagination from "../Pagination";
import { useEffect, useState } from "react";
import { getCookie, setCookie} from "../../cookie";
import * as Api from '../../api';

function MyReservation({reservations}) {

  const total_elem = reservations.length;
  const page_limit = 5;
  const [page, setPage] = useState(1);
  const page_limit_elem = (page_limit*page-1 < total_elem-1) ? page_limit*page-1 : total_elem-1;


  return (
    <ReservationDiv>
      <h3>나의 예약 정보</h3>
      <Line></Line>
      <Reservations>
        {
          reservations
          .slice(page_limit*(page-1),page_limit_elem)
          .map( (reservation, idx )=> <ReservedRoom reservation={reservation} key={idx} className="reservedRoom"/>)
        }
      </Reservations>
      <Pagination
        total={total_elem}
        limit={page_limit}
        page={page}
        setPage={setPage}
      ></Pagination>
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
  }
`;

const Line = styled.div`
  height: none;
  border: solid 1.5px #bbd3f2;
  background-color: #bbd3f2;
`;

const Reservations = styled.div`
  display: flex;
  flex-direction: column;
  .reservedRoom {
    border-bottom: #bbd3f2;
  }
`;

export default MyReservation;
