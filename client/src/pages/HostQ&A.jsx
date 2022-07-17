import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

function submitAnswer(e) {
  // submit answer
}

export default function HostQnA() {
  const [data, setData] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const req = await axios.get("/dummyQnA.json");
        const data = await req.data.data;
        setData(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    data && (
      <QnAContainer>
        {data.map((item, i) => {
          return (
            <QnABox key={i}>
              <Question>{item.content}</Question>
              <Answer placeholder="아직 등록된 답변이 없습니다. 답변을 등록해보세요!">
                {item.reply}
              </Answer>
              <SubmitBtn onClick={(e) => submitAnswer(e.target.value)}>
                답변 등록
              </SubmitBtn>
            </QnABox>
          );
        })}
      </QnAContainer>
    )
  );
}

const QnAContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const QnABox = styled.details`
  width: 100%;
  margin: 10px 0;
  position: relative;
`;

const Question = styled.summary`
  cursor: help;

  &::marker {
    content: "❓";
  }
`;

const Answer = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 10px;
  margin-top: 10px;
  margin-left: 20px;
  border-radius: 10px;
  background-color: #f2f2f2;
  border: none;
`;

const SubmitBtn = styled.button`
  position: absolute;
  right: 0;
  bottom: -30px;
  width: 100px;
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
