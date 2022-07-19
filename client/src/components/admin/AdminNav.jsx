import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function AdminNav() {
  return (
    <Nav>
      <Menu to={"/myPage"}>
        <Profile>
          <FaUserCircle size={"2rem"} color="white" />
          <span style={{ marginLeft: "15px" }}>Admin</span>
        </Profile>
      </Menu>
      <Menu to={"/admin/notice?page=1"}>공지사항</Menu>
      <Menu to={"/admin/userList"}>유저 관리</Menu>
      <Menu to={"/admin/bookList?page=1"}>예약 관리</Menu>
    </Nav>
  );
}

const Nav = styled.nav`
  margin: 0 auto;
  padding: 30px 0;
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #8daef2;
`;

const Profile = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Menu = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 1.1rem;
  font-weight: bold;
`;
