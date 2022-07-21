import React from "react";
import styled from "styled-components";

export default function BookInfo({
  roomId,
  roomName,
  date,
  startTime,
  endTime,
  people,
  totalPay,
}) {
  // 출력용 날짜 포맷팅
  function dateToString(date) {
    console.log(date);
    const fullDate = String(date);
    const year = fullDate.substring(0, 4);
    const month = fullDate.substring(4, 6);
    const day = fullDate.substring(6, 8);

    return `${year}년 ${month}월 ${day}일`;
  }

  return (
    <Container>
      <Header>예약 정보</Header>
      <div>
        <Info>
          <div>예약 룸</div>
          <div>{roomName}</div>
        </Info>
        <Info>
          <div>예약 날짜</div>
          <div>{dateToString(date)}</div>
        </Info>
        <Info>
          <div>예약 시간</div>
          <div>
            {startTime}시 ~ {endTime}시
          </div>
        </Info>
        <Info>
          <div>예약 인원</div>
          <div>{people}명</div>
        </Info>
        <Info>
          <div>결제 금액</div>
          <div className="pay">{totalPay} ₩</div>
        </Info>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  margin-top: 40px;
  border-top: 4px solid #5155a6;
  border-bottom: 4px solid #5155a6;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

const Header = styled.div`
  border-bottom: 2px solid #5155a6;
  padding: 20px 0;
  text-align: left;
  font-size: 2.2rem;
  font-weight: bold;
  margin: 0;
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 15px 0;
  font-size: 0.9rem;

  & div:first-child {
    width: 30%;
  }

  & + & {
    border-top: 1px solid #f2f2f2;
  }

  & .pay {
    font-weight: bold;
    color: #5155a6;
  }
`;
