import styled from "styled-components";

// 이용후기 작성, QnA 작성, QnA 답변 과 같은 페이지 타이틀
export const CommentTitle = styled.h1`
  color: #bbd3f2;
`;

// 게시물 정보
export const CommentInfo = ({ spaceName }) => {
  const date = new Date();
  return (
    <CommentInfoContainer>
      <table className="comment-info">
        <tbody>
          <tr>
            <td style={{ fontWeight: "bold" }}> 공간명: </td>
            <td> {spaceName} </td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}> 작성자: </td>
            <td> {localStorage.getItem("nickname")} </td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}> 작성일: </td>
            <td>
              {" "}
              {date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()}{" "}
            </td>
          </tr>
        </tbody>
      </table>
    </CommentInfoContainer>
  );
};

// 입력란
export const StarDiv = () => {
  return (
    <div>
      <span>별점: </span>
    </div>
  );
};

export const CommentTextArea = styled.textarea`
  width: 60vw;
  height: 10rem;
  padding: 1rem;
`;

const CommentInfoContainer = styled.div`
  width: 20rem;
  margin: 3rem;
  background-color: ;
`;

export const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  .cancel {
    background-color: lightgrey;
  }
  .submit {
    background-color: #8daef2;
  }

  button {
    border: none;
    width: 50%;
    height: 2rem;
    margin: 2rem 1rem;

    :hover {
    }
  }
`;
