import MessagePage from "../components/MessagePage";

function PwMailSent() {
  return (
    <MessagePage
      title="메일이 전송완료되었습니다."
      content="메일로 전송된 임시 비밀번호를 확인해주세요"
    ></MessagePage>
  );
}

export default PwMailSent;
