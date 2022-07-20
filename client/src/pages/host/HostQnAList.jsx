import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import * as Api from "../../api";
import HostNav from "../../components/host/HostNav";
import Pagination from "../../components/Pagination";

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
        const req = await Api.get(
          `api/qnas/space/${spaceId}?page=${page}&perPage=5`
        );
        const data = await req.data.data.paginatedQnas;
        setTotalPage(req.data.data.totalPage);
        setData(data);
        console.log(req);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  // 답변 등록 함수
  async function submitAnswer(id) {
    try {
      const req = await Api.patch(`api/qnas/${id}`, {
        reply: answer,
      });
      console.log(req);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <HostNav />
      {data && (
        <QnAContainer>
          {data.map((item, i) => {
            return (
              <QnABox key={i}>
                <Question>{item.content}</Question>
                <Answer
                  placeholder="아직 등록된 답변이 없습니다. 답변을 등록해보세요!"
                  onChange={(e) => setAnswer(e.target.value)}
                >
                  {item.reply}
                </Answer>
                <SubmitBtn onClick={(e) => submitAnswer(item.id)}>
                  답변 등록 및 수정
                </SubmitBtn>
              </QnABox>
            );
          })}
          <Pagination
            total={totalPage}
            url={location.pathname}
            currentPage={page}
          />
        </QnAContainer>
      )}
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

const SubmitBtn = styled.button`
  position: absolute;
  right: 0;
  bottom: -30px;
  width: 150px;
  padding: 5px;
  border-radius: 10px;
  border: none;
  background-color: #646fd4;
  color: #fff;
  transition: all 0.2s;

  &:hover {
    background-color: #ffe69a;
    color: #000;
  }
`;
