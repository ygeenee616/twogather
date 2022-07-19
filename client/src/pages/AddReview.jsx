import {
  CommentTitle,
  CommentInfo,
  CommentInput,
  AddCommentBtnDiv,
} from "../components/addComment/CommentForm";
import styled from "styled-components";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Api from "../api";

function AddReview() {
  const params = useParams();

  useEffect(() => {
    async function getReservationData() {
      try {
        const res = await Api.get(`api/reservations/${params.reservationId}`);
      } catch (err) {
        console.log(err);
      }
    }
    console.log(params);

    getReservationData();

  }, []);

  const registerReview = () => {};

  return (
    <ReviewContainer>
      <CommentTitle> 이용후기 등록 </CommentTitle>
      <CommentInfo></CommentInfo>
      <form>
        <CommentInput
          commentType="이용후기 등록"
          placeholder="이용후기를 작성해주세요. (200자 이내)"
        ></CommentInput>
        <AddCommentBtnDiv></AddCommentBtnDiv>
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
