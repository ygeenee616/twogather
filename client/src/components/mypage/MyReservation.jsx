import styled from "styled-components";
import ReservedRoom from "./MyReservedRoom";
import { PaginationInLocal } from "../Pagination";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "../../cookie";
import * as Api from "../../api";

function MyReservation({ reservations, setDeleteR }) {
  const total_elem = reservations.length;
  const page_limit = 3;
  const [page, setPage] = useState(1);
  const page_limit_elem =
    page_limit * page < total_elem ? page_limit * page : total_elem;
  return (
    <ReservationDiv>
      <h3>나의 예약 정보</h3>

      {reservations.length === 0 ? (
        <EmptyReservation>
          <p> 예약내역이 없습니다. </p>
        </EmptyReservation>
      ) : (
        <>
          <Line />
          <Reservations setDeleteR={setDeleteR}>
            {reservations
              .slice(page_limit * (page - 1), page_limit_elem)
              .map((reservation, idx) => (
                <ReservedRoom
                  reservation={reservation}
                  key={idx}
                  className="reservedRoom"
                />
              ))}
          </Reservations>
          <PaginationInLocal
            total={total_elem}
            limit={page_limit}
            page={page}
            setPage={setPage}
          ></PaginationInLocal>
        </>
      )}
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

const EmptyReservation = styled.div`
  width: 100%;
  height: 15rem;
  border: solid 3px #bbd3f2;
  font-size: 1rem;
  text-align: center;
  color: #bbd3f2;
`;

export default MyReservation;
