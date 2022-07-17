import styled from "styled-components";
import ReservedRoom from "./MyReservedRoom";
import Pagination from "../Pagination";
import { useEffect, useState } from "react";
import { getCookie, setCookie} from "../../cookie";

const room = {
  image: "/images/partyRoom.png",
  space: "딘어게인 성수 - 브라이덜 샤워 생일파티",
  booker: "홍길동",
  personnel: "4",
  location: "서울 성동구 성덕정 17길 12 4층",
  visitingTime: "2022년 7월 일 11시-2시",
};


const rooms = [];
for (var i = 0; i < 12; i++) rooms.push(room);

console.log(rooms);

function MyReservation() {

  const total_elem = rooms.length;
  const page_limit = 5;
  const [page, setPage] = useState(1);
  console.log('cookie:' + getCookie('page'));

  const page_limit_elem = (page_limit*page-1 < total_elem-1) ? page_limit*page-1 : total_elem-1;

  useEffect(()=>{
    setCookie('page', page);
  }, [page]);

  return (
    <ReservationDiv>
      <h3>나의 예약 정보</h3>
      <Line></Line>
      <Reservations>
        {rooms.slice(page_limit*(page-1),page_limit_elem).map( (room, idx )=> <ReservedRoom room={room} key={idx}/>)}
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
  div {
    border-bottom: #bbd3f2;
  }
`;

export default MyReservation;
