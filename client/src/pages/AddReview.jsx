import {
  CommentTitle,
  CommentInfo,
  CommentTextArea,
  BtnContainer,
} from "../components/addComment/CommentForm";
import styled from "styled-components";
import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Api from "../api";

function AddReview() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const contentTextarea = useRef(null); // 작성란
  const bookId = params.get("bookId");
  const { roomName, review } = location.state;
  const content = review ? review.content : "";
  const [reviewTextarea, setReviewTextarea] = useState(content);

  const registerReview = async (e) => {
    e.preventDefault();
    try {
      const data = {
        content: contentTextarea.current.value,
      };

      if (review === null) await Api.postAuth(`api/reviews/${bookId}`, data);
      else await Api.patchAuth(`api/reviews/mypage/${review.id}`, data);
      navigate("/mypage", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteReview = async (e) => {
    e.preventDefault();

    try {
      await Api.deleteAuth(`api/reviews/mypage/${review.id}`);
      navigate("/mypage");
    } catch (err) {
      console.error(err);
    }
  };
  // 401

  return (
    <ReviewContainer>
      <CommentTitle> 이용후기 등록 </CommentTitle>
      <CommentInfo spaceName={roomName} />
      <form>
        <h4 style={{ color: "#BBD3F2" }}>이용후기 등록</h4>
        <CommentTextArea
          CommentTextAreaname="contents"
          placeholder="이용후기를 작성해주세요. (200자 이내)"
          value={reviewTextarea}
          ref={contentTextarea}
          onChange={(e) => setReviewTextarea(e.target.value)}
        />
        <BtnContainer>
          <button className="cancel" onClick={() => navigate("/mypage")}>
            취소
          </button>
          {review && (
            <button className="delete" onClick={deleteReview}>
              삭제
            </button>
          )}
          <button type="submit" className="submit" onClick={registerReview}>
            {review ? "수정 완료" : "작성 완료"}
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

export default AddReview;
