import styled from "styled-components";
import QnA from "./QnA";
import Pagination from "../Pagination";
import { useState } from 'react';



function MyQnA() {
    const total_page = qnaList.length;
    const limit_page = 5;
    const page_number = 0 ;
    const posts_per_page = 5; 

    return(
        <QnADiv>
            <h3>Q&A</h3>
            <QnATable>
                <QnATableHead>
                    <td className="space"> 공간정보 </td>
                    <td className="description"> 문의내용 </td>
                    <td className="registered-on"> 작성일 </td>
                    <td className="replyed"> 답변유무 </td>
                </QnATableHead>
                
                
            </QnATable>
            <Pagination total={total_page_page} limit={limit_page} page={page_number} setPage={}></Pagination>
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
    color: #8daef2;
    margin: 0 15vw;
  }
`;



const QnATable = styled.table`
    border-top: 2px;
`

const QnATableHead = styled.thead`
    
`

const QnaTR = () => {
    return (
        <>
            <td>딘 어게인 성수 - 샤워 생일파티</td>
            <td style={{text-overflow: 'ellipsis'}}>개수</td>
        </>
    )
}

const QnaDetail =styled.div`
`

export default MyQnA;