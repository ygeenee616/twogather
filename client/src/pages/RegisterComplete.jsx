import { Container, Line } from "../components/register/UserForm";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import logoImg from "../assets/images/logo.png";
import styled from "styled-components";
function RegisterComplete() {

    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Container>
            <LogoDiv>
                <img className="logoImg" src={logoImg} alt="logo" />
                <div className="logoTitle">TWOGATHER</div>
            </LogoDiv>
            <h2>회원가입이 완료 되었습니다.</h2>
            <NicknameSpan>{location.state.nickname}</NicknameSpan>
            <Line />
            <BtnDiv>
                <button className="home-btn" onClick={()=>navigate('/')}>홈으로</button>
                <button className="login-btn">로그인</button>
            </BtnDiv>
        </Container>
    );
}
const LogoDiv = styled.div`
    width: 5rem;
    height: 5rem;
`
const NicknameSpan = styled.span`
    font-weight: bold;
`
const BtnDiv = styled.div`
    button{
        width: 10rem;
        height: 3rem;
        border: none;
    }
    .home-btn {
        background-color: white;
    }

    .login-btn {
        background-color: #BBD3F2
    }
    
`
export default RegisterComplete;
