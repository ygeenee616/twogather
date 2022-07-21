import MessagePage from "../components/MessagePage";

function LoginExpired() {
  localStorage.clear();

  return <MessagePage content="로그인이 만료되었습니다."></MessagePage>;
}

export default LoginExpired;
