import styled from "styled-components";

const QnaComponent = ({ room, qna }) => {
  // id 는 qna 아이디
  const { id, content, createdTime, reply } = qna;

  const deleteBtnstyle = {
    display: "inline-block",
    height: "2rem",
    width: "3rem",
    border: "solid black 0.1rem",
    margin: "0.1rem",
    backgroundColor: "white",
  };

  return (
    <>
      <tr>
        <td>{room}</td>
        <td>
          {content.length > 30 ? content.slice(0, 30) + `...` : content}
        </td>
        <td>{createdTime.split('T')[0]}</td>
        <td>
          {reply ? "    답변 완료 " : "답변 대기중 "}
          <button style={deleteBtnstyle}>삭제</button>
        </td>
      </tr>
    </>
  );
};

const QnaDetailComponent = ({ qna }) => {
  const { question, questionDate, answer, answerDate } = qna;

  const trStyle = {
    display: "none",
    spanSize: 4,
    textAlign: "left",
    backgroundColor: "#D9D9D9",
  };
  const tdStyle = {
    padding: "0.5rem 2rem 1rem",
    width: "3rem",
  };


  return (
    <>
      <tr style={trStyle} className="detailTr">
        <td colSpan="4" style={tdStyle}>
          <h2>Q. </h2> <span>질문일: {questionDate} </span> <p>{question}</p>
          <h2>A. </h2> <span>답변일: {answerDate} </span> <p>{answer}</p>
        </td>
      </tr>
    </>
  );
};

export default function MyQnaComponent({ qna }) {
  return (
    <>
      <QnaComponent qna={qna} />
      <QnaDetailComponent qna={qna} />
    </>
  );
}
