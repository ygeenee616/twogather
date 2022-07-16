import styled from "styled-components";
import { QnaComponent, QnaDetailComponent } from "./MyQnaComponent.jsx";
import Pagination from "../Pagination";
import { useState } from "react";

const QNAs = [
  {
    registerId: 1,
    space: "딘 어게인 성수 - 샤워 생일파티",
    nickname: "연진",
    question: "빔프로젝트에 노트북 연결 가능한가요?",
    questionDate: "2022-02-02",
    answer: "네, 가능합니다.",
    replyDate: "2022-02-03",
  },
  {
    registerId: 2,
    space: "파티파티룸",
    nickname: "연진",
    question: "인원 5명에서 6명으로 변경하려고 합니다.",
    questionDate: "2022-02-02",
    answer: "따로 연락주시면 예약확인 후 변경절차 진행해드리겠습니다.",
    replyDate: "2022-02-03",
  },
  {
    registerId: 3,
    space: "파티파티룸22",
    nickname: "연진",
    question: "에어컨 리모콘 못찾겠어요 ㅠㅠ",
    questionDate: "2022-02-02",
    answer: "쇼파 옆 탁자위에 봐보세요.",
    replyDate: "2022-02-03",
  },
  {
    registerId: 4,
    space: "룸룸",
    nickname: "연진",
    question:
      "11시~6시이면 1시간 추가이고,  현재 11명이면 최종 가격이 어떻게 되는지도 궁금합니다 !! 추가 해서 더 오게 되면 추후에 1인당 비용 결제를 하면 되나요? 혹시 결제시 할인이 되는 것도 있는지 궁금합니다 ! 인원이 많은편이라 냉방이 빵빵하게 나오고 창문 열면 시원한지도 매우 궁금합니다 화장실도 내부에 있나요?",
    questionDate: "2022-02-02",
    answer: "",
    replyDate: "",
  },
];

function MyQnA() {
  const total_elem = QNAs.length;
  const page_limit = 5;
  const [page, setPage] = useState(1);
  const page_limit_elem =
    page_limit * page - 1 < total_elem ? page_limit * page - 1 : total_elem;
  const [clickedQna, setClickedQna] = useState(-1);

  const handleQnaClick = (idx) => {
    console.log('click');
  };

  return (
    <QnADiv>
      <h3>나의 질문</h3>
      <QnATable>
        <QnATableHead>
          <td className="space"> 공간정보 </td>
          <td className="description"> 문의내용 </td>
          <td className="registered-on"> 작성일 </td>
          <td className="replyed"> 답변유무 </td>
        </QnATableHead>
        {QNAs.slice(page_limit * (page - 1), page_limit_elem).map(
          (qna, idx) => {
            return (
              <QnaComponent qna={qna} onClick={() => handleQnaClick(idx)} />
            );
          }
        )}
      </QnATable>
      <Pagination
        total={total_elem}
        limit={page_limit}
        page={page}
        setPage={setPage}
      ></Pagination>
    </QnADiv>
  );
}

const QnADiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: wrap-content;
  border: none;
  text-align: center;
  margin: 3rem 0;

  h3 {
    text-align: left;
    font-size: 1.5rem;
  }
`;

const QnATable = styled.table`
  border-top: 2px;
`;

const QnATableHead = styled.thead`
  font-weight: bold;
  background-color: #bbd3f2;
  opacity: 0.5;

  td {
    padding: 1rem 0;
  }
`;

export default MyQnA;
