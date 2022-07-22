import MessagePage from "../components/MessagePage";

function LoginExpired() {
  localStorage.clear();

  return (
    <MessagePage
      title="로그인이 필요합니다."
      content="로그인이 만료되었거나, 권한이 없습니다."
    ></MessagePage>
  );
}

export default LoginExpired;
