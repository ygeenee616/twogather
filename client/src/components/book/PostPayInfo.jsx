import React from "react";
import styled from "styled-components";

PostPayInfo.defaultProps = {
  date: "2022-07-08",
  startTime: 4,
  endTime: 8,
  personnel: 4,
  pay: 2000,
}

export default function PostPayInfo({
  date,
  startTime,
  endTime,
  personnel,
  pay
}) {
  const useTime = endTime - startTime;
  const totalPay = pay * personnel * useTime;

  return (
    <Container>
      <Header>결제 예정 금액</Header>
      <Content>
      <InfoContainer>
        <Info>
          <div>예약 날짜</div>
          <div>{date}</div>
        </Info>
        <Info>
          <div>예약 시간</div>
          <div>{startTime}시 ~ {endTime}시</div>
        </Info>
        <Info>
          <div>예약 인원</div>
          <div>{personnel}명</div>
        </Info>
      </InfoContainer>
      <ToTalPay>
        {totalPay} ₩
      </ToTalPay>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  margin-top: 40px;
  border-top: 4px solid #5155A6;
  border-bottom: 4px solid #5155A6;
`

const Header = styled.div`
  width: 100%;
  border-bottom: 2px solid #5155A6;
  padding: 20px 0;
  text-align: left;
  font-size: 2.2rem;
  font-weight: bold;
  margin: 0;
`

const Content = styled.div`
  width: 100%;
  display: flex;
`

const InfoContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
`

const Info = styled.div`
  width: 100%;
  display: flex;
  text-align: left;
  padding: 10px 0;
  font-size: 0.9rem;

  &+& {
    border-top: 1px solid #F2F2F2;
  }

  & div {
    width: 50%;
  }
`

const ToTalPay = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 2.2rem;
`