import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FcSettings } from "react-icons/fc";

export default function BookList({ data, endpoint }) {
  console.log(data);

  return (
    data && (
      <Container>
        <Title>예약 관리</Title>
        <table>
          <caption>예약 내역</caption>
          <colgroup>
            <col width={"20%"} />
            <col width={"20%"} />
            <col width={"10%"} />
            <col width={"10%"} />
            <col width={"30%"} />
            <col width={"10%"} />
          </colgroup>
          <thead>
            <tr align="center">
              <th>예약자</th>
              <th>날짜</th>
              <th>인원</th>
              <th>금액</th>
              <th>연락처</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr align="center">
                <td colSpan="7">아직 등록된 예약 내역이 없습니다.</td>
              </tr>
            ) : (
              data.map((item, i) => {
                return (
                  <tr align="center" key={i}>
                    <td>{item.reserveUsername}</td>
                    <td>{item.date}</td>
                    <td>{item.personnel}</td>
                    <td>{item.totalPrice}</td>
                    <td>{item.reservePhoneNumber}</td>
                    <td>
                      <Link to={`${endpoint}${item.id}`}>
                        <FcSettings className="icon" size={"1.5rem"} />
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </Container>
    )
  );
}

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 50px;
  font-family: "NEXON Lv2 Gothic Light";

  & table {
    width: 100%;
    border: 1px solid #6e85b7;
    border-collapse: collapse;
    table-layout: fixed;
  }

  & caption {
    background-color: #6e85b7;
    color: #fff;
    padding: 15px;
  }

  & th {
    color: #577bc1;
    padding: 10px;
  }

  & tr {
    border-bottom: 1px solid #6e85b7;
  }

  & td {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding: 5px;
    color: #000;
    text-decoration: none;
  }

  & .icon:hover {
    transform: scale(1.1);
    transition: 0.3s;
  }
`;

const Title = styled.div`
  font-family: "NEXON Lv2 Gothic Light";
  font-size: 2.2rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 50px;
`;
