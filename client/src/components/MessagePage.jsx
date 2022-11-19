import { Container, FormDiv, Line } from "./register/UserForm";
import { useLocation, useNavigate } from "react-router-dom";
import logoImg from "../assets/images/logo.png";
import styled from "styled-components";
function MessagePage({ title, content }) {
  const location = useLocation();
  const navigate = useNavigate();
  //   const nickname = location.state.nickname ?? '';

  return (
    <Container>
      <FormDiv>
        <LogoDiv>
          <img className="logoImg" src={logoImg} alt="logo" />
          <div className="logoTitle">TWOGATHER</div>
        </LogoDiv>
        <MessageDiv>
          <h2>{title}</h2>
          <h4>{content}</h4>
        </MessageDiv>

        <Line />
        <BtnDiv>
          <button className="home-btn" onClick={() => navigate("/")}>
            홈으로
          </button>
          <button className="login-btn" onClick={() => navigate("/login")}>
            로그인
          </button>
        </BtnDiv>
      </FormDiv>
    </Container>
  );
}
const LogoDiv = styled.div`
  margin: 2rem;
  img {
    width: 5rem;
    height: 5rem;
  }
`;

const MessageDiv = styled.div`
  margin: 3rem 0;

  h4 {
    color: grey;
  }
`;

const BtnDiv = styled.div`
  button {
    width: 10rem;
    height: 3rem;
    border: none;
    margin: 1rem;
  }
  .home-btn {
    background-color: light-grey;
  }

  .login-btn {
    background-color: #bbd3f2;
  }
`;
export default MessagePage;
