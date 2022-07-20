import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StripeLayout from "../../components/StripeLayout";
import * as Api from "../../api";
import AdminNav from "../../components/admin/AdminNav";

export default function AdminUser() {
  const [users, setUsers] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await Api.get("api/users");
      const data = response.data.data;
      setData(data);
    }
    getData();
  }, []);

  const headers = ["닉네임", "E-Mail", "전화번호", "성별", "Role", "가입날짜"];
  const keys = ["nickname", "email", "phoneNumber", "sexs", "role", "date"];
  const mainTitle = "유저정보";
  const columnTemplete = "1fr 2fr 1.5fr 1fr 1fr 1.5fr";
  const title = "";
  return (
    data && (
      <>
        <AdminNav />
        <ReservationHeader>
          <TitleName>
            <MainTitle>{mainTitle}</MainTitle>
            {title ? <Title className="title">{title}</Title> : ""}
          </TitleName>
        </ReservationHeader>

        <StripeLayout
          datas={data}
          headers={headers}
          columnTemplete={columnTemplete}
          keys={keys}
          listName="USER"
        ></StripeLayout>
      </>
    )
  );
}

const ReservationHeader = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;
const TitleName = styled.div`
  border-bottom: 2px solid #8daef2;
  margin-top: 30px;
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
