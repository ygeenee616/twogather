import {
  CommentTitle,
  CommentInfo,
  CommentTextArea,
  BtnContainer,
} from "../components/addComment/CommentForm";
import styled from "styled-components";
import { useState } from "react";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";
import * as Api from "../api";

function AddQnaComment() {
  // 답글달기로 넘어갈 때

  const [reply, setReply] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const postQnA = async (reviewId) => {
    const data = {
      reply: reply,
    };
    const res = await Api.patchAuth(`api/qnas/${reviewId}`, data);
  };

  const reviewId = location.state.reviewId;

  return (
    <ReviewContainer>
      <CommentTitle> 이용후기 등록 </CommentTitle>
      <CommentInfo></CommentInfo>
      <form method="post">
        <input type="hidden" name="spaceId"></input>
        <h4 style={{ color: "#BBD3F2" }}>QnA 답변 등록</h4>
        <CommentTextArea
          name="contents"
          placeholder="답변을 작성해주세요. (200자 이내)"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
        <BtnContainer>
          <button className="cancel" onClick={(e) => navigate(`/host/`)}>
            취소
          </button>
          <button type="submit" className="submit">
            작성 완료
          </button>
        </BtnContainer>
      </form>
    </ReviewContainer>
  );
}

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5vw 15vw;
  align-items: center;
`;

export default AddQnaComment;
