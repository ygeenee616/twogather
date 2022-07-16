import styled from "styled-components";
import MyQnaComponent from "./MyQnaComponent.jsx";
import Pagination from "../Pagination";
import { useState } from 'react';


const QNAs = [
  {
    space: '딘 어게인 성수 - 샤워 생일파티',
    nickname: '연진',
    question: '빔프로젝트에 노트북 연결 가능한가요?',
    questionDate: '2022-02-02',
    answer: '네, 가능합니다.',
    replyDate: '2022-02-03',
  },
  {
    space: '파티파티룸',
    nickname: '연진',
    question: '인원 5명에서 6명으로 변경하려고 합니다.',
    questionDate: '2022-02-02',
    answer: '따로 연락주시면 예약확인 후 변경절차 진행해드리겠습니다.',
    replyDate: '2022-02-03',
  },
  {
    space: '파티파티룸22',
    nickname: '연진',
    question: '에어컨 리모콘 못찾겠어요 ㅠㅠ',
    questionDate: '2022-02-02',
    answer: '쇼파 옆 탁자위에 봐보세요.',
    replyDate: '2022-02-03',
  },
]

function MyQnA() {
  const total_elem = QNAs.length;
  const page_limit = 5;
  const [page, setPage] = useState(1);
  const page_limit_elem = (page_limit*page-1 < total_elem) ? page_limit*page-1 : total_elem;


    return(
        <QnADiv>
            <h3>나의 질문</h3>
            <QnATable>
                <QnATableHead>
                    <td className="space"> 공간정보 </td>
                    <td className="description"> 문의내용 </td>
                    <td className="registered-on"> 작성일 </td>
                    <td className="replyed"> 답변유무 </td>
                </QnATableHead>
            {
              QNAs
              .slice(page_limit*(page-1),page_limit_elem)
              .map( (qna, idx )=> <MyQnaComponent qna={qna}></MyQnaComponent> )
            }
            </QnATable>
            <Pagination total={total_elem} limit={page_limit} page={page} setPage={setPage}></Pagination>
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
`

const QnATableHead = styled.thead`
    font-weight: bold;
    background-color: #BBD3F2; 
    opacity: 0.5;

    td {
      padding: 1rem 0;
    }
`

export default MyQnA;