import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import HostInfo from "../components/book/HostInfo";
import BookInfo from "../components/book/BookInfo";
import PostBookerInfo from "../components/book/PostBookerInfo";
import ToTop from "../components/ToTop";
import Modal from "../components/Modal";
import * as Api from "../api";
import userInfoState from "../atom/userInfoState";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

export default function BookDetail() {
  const [data, setData] = useState("");

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  setUserInfo("HOST");

  const navigate = useNavigate();
  const { bookId } = useParams();
  const link = window.location.pathname;

  useEffect(() => {
    const getData = async (bookId) => {
      try {
        // 나중에 url 해당 BookId 사용해서 API 연결
        const req = await Api.getAuth(`api/reservations/${bookId}`);
        const data = await req.data.data;
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData(bookId);
  }, []);

  // 예약 삭제 함수
  async function deleteBook(bookId) {
    try {
      // 나중에 url 해당 BookId 사용해서 API 연결
      const req = await Api.deleteAuth(`api/reservations/${bookId}`);
      const modal = document.querySelector(".modalWrap");
      modal.style.display = "block";
      window.scrollTo(0, 0);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    data && (
      <FullContainer>
        <BookInfo
          roomTitle={data.room.name}
          date={data.date}
          startTime={data.startTime}
          endTime={data.endTime}
          people={data.personnel}
          totalPrice={data.totalPrice}
        />
        <PostBookerInfo
          name={data.reserveUsername}
          phone={data.reservePhoneNumber}
          email={data.reserveEmail}
          purpose={data.purpose}
          request={data.requirement}
        />
        <HostInfo host={data.user} />
        <Button
          onClick={() => {
            deleteBook(bookId);
          }}
        >
          삭제하기
        </Button>
        <ToTop />
        <ModalWrap className="modalWrap">
          <Modal
            title={"예약 삭제 성공"}
            content={"예약이 삭제 되었습니다."}
            clickEvent={() => {
              link.includes("host")
                ? window.location.replace("/host/bookList")
                : window.location.replace("/admin/bookList?page=1");
            }}
          />
        </ModalWrap>
      </FullContainer>
    )
  );
}

const FullContainer = styled.div`
  max-width: 100%;
  margin: 5% 15%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Button = styled.button`
  width: 30%;
  padding: 5px;
  border-radius: 10px;
  border: none;
  background: #ff8b8b;
  color: #fff;
  position: absolute;
  right: 0;
  bottom: 0;

  &:hover {
    box-shadow: 2px 2px 5px -1px #a6a9b6;
    transition: 0.3s;
  }
`;

const ModalWrap = styled.div`
  width: 100%;
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  vertical-allign: middle;
  display: none;
  background-color: rgba(90, 90, 90, 0.2);
`;
