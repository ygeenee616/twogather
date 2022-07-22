import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import * as Api from "../../api";
import HostNav from "../../components/host/HostNav";
import Pagination from "../../components/Pagination";
import Modal from "../../components/Modal";

export default function HostQnA() {
  const [data, setData] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [answer, setAnswer] = useState("");

  const { spaceId } = useParams();

  let location = useLocation();
  const params = new URLSearchParams(location.search);
  const page = Number(params.get("page"));

  useEffect(() => {
    const getData = async () => {
      try {
        const req = await Api.getAuth(
          `api/qnas/space/${spaceId}?page=${page}&perPage=5`
        );
        const data = await req.data.data.paginatedQnas;
        setTotalPage(req.data.data.totalPage);
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  // 답변 등록 함수
  async function submitAnswer(id) {
    try {
      const req = await Api.patchAuth(`api/qnas/${id}`, {
        reply: answer,
      });
      const modal = document.querySelector(".successModalWrap");
      modal.style.display = "block";
      window.scrollTo(0, 0);
    } catch (err) {
      console.log(err);
    }
  }

  // Q&A 삭제 함수
  async function DeleteQnA(id) {
    try {
      const req = await Api.deleteAuth(`api/qnas/${id}`);
      const modal = document.querySelector(".deleteModalWrap");
      modal.style.display = "block";
      window.scrollTo(0, 0);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <HostNav />
      {data && (
        <QnAContainer>
          {data.length === 0 ? (
            <div>아직 등록된 Q&A가 없습니다. </div>
          ) : (
            data.map((item, i) => {
              return (
                <QnABox key={i}>
                  <Question>{item.content}</Question>
                  <Answer
                    placeholder="아직 등록된 답변이 없습니다. 답변을 등록해보세요!"
                    onChange={(e) => setAnswer(e.target.value)}
                  >
                    {item.reply}
                  </Answer>
                  <BtnBox>
                    <SubmitBtn onClick={(e) => submitAnswer(item.id)}>
                      답변 등록 및 수정
                    </SubmitBtn>
                    <DeleteBtn onClick={(e) => DeleteQnA(item.id)}>
                      삭제
                    </DeleteBtn>
                  </BtnBox>
                </QnABox>
              );
            })
          )}
          <Pagination
            total={totalPage}
            url={location.pathname}
            currentPage={page}
          />
        </QnAContainer>
      )}
      <ModalWrap className="successModalWrap">
        <Modal
          title={"답변 등록 성공"}
          content={"Q&A 답변 등록이 성공되었습니다."}
          clickEvent={() => window.location.replace("/host/qna")}
        />
      </ModalWrap>
      <ModalWrap className="deleteModalWrap">
        <Modal
          title={"Q&A 삭제 성공"}
          content={"Q&A 삭제가 성공되었습니다."}
          clickEvent={() => window.location.replace("/host/qna")}
        />
      </ModalWrap>
    </div>
  );
}

const QnAContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 80px;
  margin-bottom: 80px;
  display: flex;
  flex-direction: column;
`;

const QnABox = styled.details`
  width: 100%;
  margin: 10px 0;
  position: relative;
`;

const Question = styled.summary`
  cursor: pointer;

  &::marker {
    content: "❓";
  }
`;

const Answer = styled.textarea`
  width: 95%;
  height: 80px;
  padding: 10px;
  margin-top: 10px;
  margin-left: 3%;
  border-radius: 10px;
  background-color: #f2f2f2;
  border: none;
`;

const BtnBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const SubmitBtn = styled.button`
  width: 150px;
  padding: 5px;
  border-radius: 10px;
  border: none;
  background-color: #b2a4ff;
  color: #fff;
  transition: all 0.2s;

  &:hover {
    background-color: #ffdeb4;
    color: #000;
  }
`;

const DeleteBtn = styled.button`
  width: 150px;
  padding: 5px;
  border-radius: 10px;
  border: none;
  background-color: #ffb4b4;
  color: #fff;
  transition: all 0.2s;
  margin-left: 10px;

  &:hover {
    background-color: #ffdeb4;
    color: #000;
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
