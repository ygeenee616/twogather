import React, { useState, memo } from "react";
import styled from "styled-components";
import Chart from "../../components/chart";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import userLogo from "../assets/images/user.png";
import AdminPage from "./addHostPage";
import { Test, Home, Hom } from "../test";
import HostBookList from "./hostBookListPage";

const name = "강예정";
function HostHome({ match, location, history }) {
  return (
    <Container>
      <SubContainer>
        <ManagerProfile>
          <ProfileImg>
            <img src={userLogo} width={"100px"} height={"100px"}></img>
          </ProfileImg>
          <Label>Admin</Label>
        </ManagerProfile>
        <ManagerNav>
          <div className="subMenuButton" backGroundColor="#8DAEF2">
            <Link to={"/host/greetings"}>test</Link>
          </div>
          <div className="subMenuButton" backGroundColor="#8FD6A3">
            <Link to={"/host/space"}>공간관리</Link>
          </div>
          <div className="subMenuButton" backGroundColor="#F9B6FF">
            공지사항
          </div>
        </ManagerNav>
      </SubContainer>
      <ManagerMenu>
        <Routes>
          <Route path="/space" element={<HB />} />;
          <Route path="/greetings" element={<Greetings />} />;
        </Routes>
        {/* 
        <Greeting>
          <Label>{`어서오세요! `}</Label>
          <Label className="username">{name}</Label>
          <Label>님!</Label>
        </Greeting>
        <Chart></Chart> */}
      </ManagerMenu>
    </Container>
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

const Container = styled.div`
  background-color: #f2f2f2;
  box-shadow: 10px 10px 20px #bbd3f2;
  display: grid;
  height: 800px;
  wdith: 1000px;
  border-radius: 30px;
  margin: 5%;
  grid-template-columns: 1fr 2.5fr;
`;

const SubContainer = styled.div`
  display: grid;
  grid-template-rows: 2fr 2fr;

  padding: 5%;
  box-shadow: 0px 3px 10px #9796f0;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
`;

const ProfileImg = styled.div`
  display: flex;

  width: 100%;
  margin-bottom: 10%;
  justify-content: center;
  align-items: center;
`;

const Label = styled.span`
  margin-top: 20%;
  font-size: 2rem;
  margin-right: 20px;
  &.username {
    font-size: 2.2rem;
    color: blue;
  }
`;

const ManagerProfile = styled.div`
  display: flex;

  width: 100%;
  margin-bottom: 10%;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .profileImg {
    margin: 0 auto;

    width: 60%;
    height: 500px;
    background-color: blue;
  }

  .role {
    font-size: 1.2rem;
    font-weight: 700;
  }
`;

const ManagerNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .subMenuButton {
    width: 100%;
    height: 20%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      transform: scale(1.2);
    }
  }
`;

const ManagerMenu = styled.div`
  width: 70%;
  padding: 5% 0;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Greeting = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default HostHome;
