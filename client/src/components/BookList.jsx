import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FcSettings } from "react-icons/fc";

export default function BookList({ data, endpoint }) {
  console.log(data);

  return (
    data && (
      <Container>
        <table>
          <caption>예약 내역</caption>
          <colgroup>
            <col width={"10%"} />
            <col width={"15%"} />
            <col width={"20%"} />
            <col width={"10%"} />
            <col width={"10%"} />
            <col width={"25%"} />
            <col width={"10%"} />
          </colgroup>
          <thead>
            <tr align="center">
              <th>예약자</th>
              <th>룸</th>
              <th>날짜</th>
              <th>인원</th>
              <th>금액</th>
              <th>연락처</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => {
              return (
                <tr align="center" key={i}>
                  <td>{item.user.name}</td>
                  {/* <td>{item.room.id}</td> */}
                  <td>파티룸</td>
                  <td>{item.date}</td>
                  <td>{item.personnel}</td>
                  <td>{item.totalPrice}</td>
                  <td>{item.user.phoneNumber}</td>
                  <td>
                    <Link to={`${endpoint}${item.id}`}>
                      <FcSettings className="icon" size={"1.5rem"} />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Container>
    )
  );
}

const Container = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 80px;
  margin-bottom: 80px;

  & table {
    width: 100%;
    border: 1px solid #577bc1;
    border-collapse: collapse;
    table-layout: fixed;
  }

  & caption {
    background-color: #577bc1;
    color: #fff;
    padding: 10px;
  }

  & th {
    color: #577bc1;
    padding: 10px;
  }

  & tr {
    border-bottom: 1px solid #577bc1;
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
