import {
  CommentTitle,
  CommentInfo,
  CommentTextArea,
  BtnContainer,
} from "../components/addComment/CommentForm";
import styled from "styled-components";
import * as api from "../api";

function AddQnaComment() {
  // const postQnA = (spaceId, data)  => {
  //     const data = {
  //         contents: contents
  //     }
  //     const res = await api.post(`api/qnas/${spaceId}`, data);
  // }

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
        />
        <BtnContainer>
          <button className="cancel">취소</button>
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
