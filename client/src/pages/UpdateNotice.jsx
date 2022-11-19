import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Modal from "../components/Modal";
import * as Api from "../api";

export default function UpdateNotice() {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [data, setData] = useState({});
  const [newData, setNewData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const res = await Api.getAuth(`api/notices/${id}`);
      const datas = res.data.data;
      setData(datas);
    };
    getData();
  }, []);

  useEffect(() => {
    setTitle(data.title);
    setContent(data.content);
  }, [data]);

  useEffect(() => {
    setNewData({ title: title, content: content });
  }, [title, content]);

  const handleClickUpdateNoticeButton = async () => {
    const req = await Api.patchAuth(`api/notices/${id}`, newData);
    const modal = document.querySelector(".modalWrap");
    modal.style.display = "block";
    window.scrollTo(0, 0);
  };

  return (
    data && (
      <div>
        <AddNoticeWrap>
          <Title>공지사항 수정</Title>
          <SubTitle>제목</SubTitle>
          <NoticeTitleInput
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
          />
          <SubTitle style={{ marginTop: "2%" }}>내용</SubTitle>
          <NoticeContentInput
            value={content || ""}
            onChange={(e) => setContent(e.target.value)}
          />
          <ButtonWrap>
            <Button color={"#f2f2f2"} onClick={() => nav(-1)}>
              취소
            </Button>
            <Button
              color={"#8DAEF2"}
              style={{ color: "white" }}
              onClick={handleClickUpdateNoticeButton}
            >
              수정
            </Button>
          </ButtonWrap>
          <ModalWrap className="modalWrap">
            <Modal
              className="updateNoticeModal"
              title=""
              content="공지사항수정이 완료되었습니다."
              clickEvent={() => nav(-1)}
            />
          </ModalWrap>
        </AddNoticeWrap>
      </div>
    )
  );
}

const AddNoticeWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto 10vh auto;
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 2.2rem;
  font-weight: 700;
  text-align: center;
  margin: 8vh 0;
`;

const SubTitle = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  color: #8daef2;
  margin: 0 0 0 17%;
`;

const NoticeTitleInput = styled.input`
  width: 60%;
  height: 5vh;
  border: 2px solid #8daef2;
  border-radius: 10px;
  padding: 0 3%;
  margin: 0 auto;
`;

const NoticeContentInput = styled.textarea`
  width: 60%;
  height: 30vh;
  border: 2px solid #8daef2;
  border-radius: 10px;
  padding: 1% 3%;
  margin: 0 auto;
`;

const ButtonWrap = styled.div`
  display: flex;
  width: 70%;
  margin: 2% auto;
`;

const Button = styled.button`
  background-color: ${(props) => props.color};
  border: none;
  border-radius: 10px;
  width: 50%;
  height: 6vh;
  margin: 0 2%;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
`;

const ModalWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 244vh;
  background-color: rgba(90, 90, 90, 0.2);
  display: none;
`;
