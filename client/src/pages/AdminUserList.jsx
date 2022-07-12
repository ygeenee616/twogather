import styled from "styled-components";
import StripeList from "../components/StripeList";
import StripeLayout from "../components/StripeLayout";

function AdminUserList() {
  const data = [
    {
      nickname: "강예정",
      email: "파티파티룸",
      phoneNumber: "010-3000-2000",
      sns: "5000",
      role: "admin",
      date: "1월18일",
    },
    {
      nickname: "강예정",
      email: "파티파티룸",
      phoneNumber: "010-3000-2000",
      sns: "5000",
      role: "admin",
      date: "1월18일",
    },
    {
      nickname: "강예정",
      email: "aa@aaa.com",
      phoneNumber: "010-3000-2000",
      sns: "5000",
      role: "admin",
      date: "1월18일",
    },
  ];
  const headers = ["닉네임", "E-Mail", "전화번호", "SNS", "Role", "가입날짜"];
  const keys = ["nickname", "email", "phoneNumber", "sns", "role", "date"];
  const mainTitle = "유저정보";
  const columnTemplete = "1fr 2fr 1.5fr 1fr 1fr 2fr";

  return (
    <>
      <StripeLayout
        datas={data}
        headers={headers}
        mainTitle={mainTitle}
        columnTemplete={columnTemplete}
        keys={keys}
      ></StripeLayout>
    </>
  );
}

export default AdminUserList;
