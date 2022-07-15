import { Container, Line } from "../components/register/UserForm";
import { useSelector } from "react-redux";
import logoImg from "../assets/images/logo.png";
import styled from "styled-components";
function RegisterComplete() {


    return (
        <Container>
            <LogoDiv>
                <img className="logoImg" src={logoImg} alt="logo" />
                <div className="logoTitle">TWOGATHER</div>
            </LogoDiv>
            <h2>회원가입이 <bold>완료</bold> 되었습니다.</h2>
            <Line />
            <BtnDiv>
                <button>홈으로</button>
                <button>로그인</button>
            </BtnDiv>
        </Container>
    );
}
const LogoDiv = styled.div`

`
const NicknameSpan = styled.span`

`
const BtnDiv = styled.div`

`
export default RegisterComplete;
