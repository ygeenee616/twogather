import MessagePage from "../components/MessagePage";
import { useLocation } from "react-router-dom";

function RegisterComplete() {
  const location = useLocation();
  const nickname = location.state.nickname;

  return (
    <MessagePage
      title="회원가입이 완료되었습니다."
      content={`${nickname}님, 환영합니다🥳`}
    ></MessagePage>
  );
}

export default RegisterComplete;
