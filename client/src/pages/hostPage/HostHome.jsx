import React, { useState, memo } from "react";
import styled from "styled-components";
import Chart from "../../components/Chart";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import userLogo from "../../assets/images/user.png";
import AdminPage from "../AddHostPage";
import { Test, Home, Hom } from "../test";
import HostBookList from "./HostBookListPage";

const name = "강예정";
function HostHome() {
  const [content, setContent] = useState("Greetings");

  function menuClick(props) {
    console.log(props);
    setContent(props);
  }

  return (
    <>
      <Container>
        <ManageNav>
          <NavItem onClick={() => menuClick("Greetings")}>차트보기</NavItem>
          <NavItem onClick={() => menuClick("manageBooked")}>예약관리</NavItem>
          <NavItem onClick={() => menuClick("manageSpace")}>공간관리</NavItem>
          <NavItem onClick={() => menuClick("manageNotice")}>공지사항</NavItem>
          <NavItem onClick={() => menuClick("manageQA")}>Q & A관리</NavItem>
        </ManageNav>
        <Header>예약관리</Header>
        <Content>
          {content === "Greetings" ? (
            <Greetings></Greetings>
          ) : content === "manageBooked" ? (
            <HB></HB>
          ) : (
            <AdminPage></AdminPage>
          )}
        </Content>
      </Container>
    </>
  );
}

function Greetings() {
  return (
    <>
      <Greeting>
        <Label>{`어서오세요! `}</Label>
        <Label className="username">{name}</Label>
        <Label>님!</Label>
      </Greeting>
      <Chart></Chart>
    </>
  );
}

function HB() {
  return (
    <>
      <HostBookList></HostBookList>
    </>
  );
}

const NavItem = styled.div`
  border-bottom: #8daef2;
`;

const Container = styled.div`
  margin: 0 auto;
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const ManageNav = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Header = styled.div`
  font-size: 2rem;
  font-style: bold;
  color: #8daef2;
  margin: 10%;
  text-decoration: underline;
  text-underline-position: under;
`;

const Content = styled.div`
  background-color: #f2f2f2;
  padding: 3%;
 
  margin: 0 auto;
  width: 60vw;
  height: 70vh;
  border-radius: 20px;
`;

const Label = styled.span`
  font-size: 2rem;
  margin-right: 20px;
  &.username {
    font-size: 2.2rem;
    color: blue;
  }
`;

const Greeting = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default HostHome;
