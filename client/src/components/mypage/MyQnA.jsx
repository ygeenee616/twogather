import styled from "styled-components";
import MyQnaComponent from "./MyQnaComponent.jsx";
import Pagination from "../Pagination";
import { useState } from "react";

function MyQnA({ qnas }) {
  // const {}
  const total_elem = qnas.length;
  const page_limit = 5;
  const [page, setPage] = useState(1);
  const page_limit_elem =
    page_limit * page < total_elem ? page_limit * page : total_elem;
  const [targetDetailTr, setTargetDetailTr] = useState("");

  const handleToggle = (e) => {
    e.preventDefault();
    let target = e.target.closest("tr");
    let detailTr = target.nextElementSibling;
    if (!detailTr) return;
    if (target.className === "detailTr") return; // detail tr이면 클릭 무시
    // 기존 detail tr 숨기기
    if (targetDetailTr !== "")
      targetDetailTr.style.setProperty("display", "none");

    // 타겟 detail tr 변경하고 보이기
    setTargetDetailTr(detailTr);
    detailTr.style.setProperty("display", "table-row");
  };

  return (
    <QnADiv>
      <h3>나의 질문</h3>
      {qnas.length === 0 ? (
        <EmptyQna><p>질문 내역이 없습니다.</p></EmptyQna>
      ) : (
        <>
          <QnATable onClick={handleToggle}>
            <QnATableHead>
              <tr>
                <th className="space"> 공간정보 </th>
                <th className="description"> 문의내용 </th>
                <th className="registered-on"> 작성일 </th>
                <th className="replyed"> 답변유무 </th>
              </tr>
            </QnATableHead>
            <tbody>
              {qnas
                .slice(page_limit * (page - 1), page_limit_elem)
                .map((qna, idx) => (
                  <MyQnaComponent qna={qna} key={idx} />
                ))}
            </tbody>
          </QnATable>
          <Pagination
            total={total_elem}
            limit={page_limit}
            page={page}
            setPage={setPage}
          ></Pagination>
        </>
      )}
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

const EmptyQna = styled.div`
  width: 100%;
  height: 15rem;
  border: solid 3px #bbd3f2;
  font-size: 1rem;
  text-align: center;
  color: #bbd3f2;
`;

export default MyQnA;
