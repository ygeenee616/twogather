import {
  CommentTitle,
  CommentInfo,
  CommentTextArea,
  BtnContainer,
} from "../components/addComment/CommentForm";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import * as Api from "../api";

function AddQnA() {
  const location = useLocation();
  const contentTextarea = useRef(null); // 작성란
  const spaceId = location.state.spaceId;
  const spaceName = location.state.spaceName;

  const registerReview = async (e) => {
    e.preventDefault();
    try {
      const data = {
        content: contentTextarea.current,
      };
      const res = await Api.post(`api/qnas/63`, data);

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <QnAContainer>
      <CommentTitle> QnA 등록 </CommentTitle>
      <CommentInfo spaceName={spaceName} />
      <form type="post">
        <h4 style={{ color: "#BBD3F2" }}>QnA 등록</h4>
        <CommentTextArea
          name="contents"
          placeholder="공간에 대해 문의할 내용을 작성해주세요. (200자 이내)"
          ref={contentTextarea}
        />
        <BtnContainer>
          <button className="cancel">취소</button>
          <button type="submit" className="submit">
            작성 완료
          </button>
        </BtnContainer>
      </form>
    </QnAContainer>
  );
}

const QnAContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5vw 15vw;
  align-items: center;
`;

export default AddQnA;
