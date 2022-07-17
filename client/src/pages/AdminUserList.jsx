import styled from "styled-components";
import StripeList from "../components/StripeList";
import StripeLayout from "../components/StripeLayout";
import axios from "axios";
import * as api from "../api";
import { useState, useEffect } from "react";
function AdminUserList() {
  const [users, setUsers] = useState("");
  useEffect(() => {
    async function getData() {
      const response = await api.get("api/users");
      const datas = response.data;
      setUsers(datas.data);
    }
    getData();
  }, []);

  const headers = ["닉네임", "E-Mail", "전화번호", "성별", "Role", "가입날짜"];
  const keys = ["nickname", "email", "phoneNumber", "sexs", "role", "date"];
  const mainTitle = "유저정보";
  const columnTemplete = "1fr 2fr 1.5fr 1fr 1fr 1.5fr";
  const title = "";
  return (
    users && (
      <>
        <ReservationHeader>
          <TitleName>
            <MainTitle>{mainTitle}</MainTitle>
            {title ? <Title className="title">{title}</Title> : ""}
          </TitleName>
        </ReservationHeader>

        <StripeLayout
          datas={users}
          headers={headers}
          columnTemplete={columnTemplete}
          keys={keys}
          listName="USER"
        ></StripeLayout>
      </>
    )
  );
}

export default AdminUserList;

const ReservationHeader = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  margin: 10%;
`;
const TitleName = styled.div`
  border-bottom: 2px solid #8daef2;
`;
const Title = styled.span`
  font-size: 1.2rem;
  line-height: 35px;
  margin: 10px;
`;

const MainTitle = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
  color: #8daef2;
`;
