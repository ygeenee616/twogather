import styled from "styled-components";


function MyQnaComponent({qna}) {

  const {space, nickname, question, questionDate, answer, replyDate} = qna;

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
        <td>{space}</td>
        <td style={{ textOverflow: "ellipsis" }}>
          {question}
        </td>
        <td>{questionDate}</td>
        <td>
          {answer ? '답변완료 ' : '답변대기중 '}
          <button style={deleteBtnstyle}>삭제</button>
        </td>
      </tr>
      <QnaTR>
        <td colspan="4">
          <h2>Q. </h2> <p>{question}</p>
          <h2>A. </h2> <p>{answer}</p>
        </td>
      </QnaTR>
    </>
  );
}

const QnaTR = styled.tr`
  span-size: 4;
  text-align: left;
  background-color: #D9D9D9;
  td {padding: 0.5rem 2rem 1rem;}
`;

export default MyQnaComponent;
