import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { FormTitle, UserBtn} from "./UserForm";
import { validateEmail } from '../../assets/utils/usefulFunction'

function LoginForm() {
  

    return (
        <Container>
           <FormTitle>로그인</FormTitle>
           <FormDiv>
                <div>
                    <UserBtn value="USER" clicked>USER</UserBtn>
                    <UserBtn value="HOST">HOST</UserBtn>
                </div>
                

                <LoginDiv>
                        <LoginInput>
                            <input className="email" placeholder="이메일"></input>
                            <input className="password" placeholder="패스워드"></input>
                        </LoginInput>
                        <LoginButton >LOGIN</LoginButton>
                </LoginDiv>


                <SocialLoginDiv>
                    <SocialLoginBtn className="kakao-login">
                        <img src="/images/kakaoLogo.png" alt="KAKAO" />
                        <p>카카오 로그인</p>
                    </SocialLoginBtn>
                    <SocialLoginBtn className="kakao-login">
                        <img src="/images/googleLogo.png" alt="GOOGLE"></img>
                        <p>구글 로그인</p>
                    </SocialLoginBtn>
                </SocialLoginDiv>
                
                <LoginFooterDiv>
                    <tr>
                        <QuestionTD>회원이 아니신가요?</QuestionTD>
                        <LinkTD>회원가입</LinkTD>
                    </tr>
                    <tr>
                        <QuestionTD>비밀번호를 잊으셨나요?</QuestionTD>
                        <LinkTD>비밀번호 찾기</LinkTD>
                    </tr>
                </LoginFooterDiv>
           </FormDiv>
        </Container>
    );

}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const FormDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-item: center;
    top: 10rem;
    position:absolute;
    width: 20rem;
    height: wrap-content;
    border: 1px solid #BBD3F2;
    border-top: none;
    border-radius: 10px;
    text-align: center;
`

const LoginDiv= styled.form`
    display: flex;
    flex-direction: row;
    margin: 1rem;
    height: 8rem;
`

const LoginInput = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1.5rem 0.5rem;
    
    input {
        width: 10rem;
        padding: 0.6rem;
        border: solid #D9D9D9;
        border-radius: 10px;
        + input {
            margin: 1.5rem 0 ;
        }
    }
`

const LoginButton = styled.button`
    padding: 2.5rem 0.5rem;
    background-color: #BBD3F2;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    width: 6em;
    height: 7rem;
    margin: 1.2rem 0.5rem;
    :hover {
        box-shadow: none;
    }
`

const SocialLoginDiv =styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const SocialLoginBtn = styled.button`
    display: flex;
    flex-direction: row;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
    height: 3rem;
    width: 8rem;
    background-color:white;
    border: solid #D9D9D9;
    border-radius: 10px;
    font-weight: bold;
    margin: 1.5rem 0.5rem;
    
    :hover {
        box-shadow: none;
    }

    img {
        width: 2rem;
        height: 2rem;
        border-radius: 5rem;
        margin: 0.3rem 0.2rem 0 0;
    }

`
const LoginFooterDiv = styled.table`
    border: none;
    margin: 1.5rem;

    border-spacing: 0 10px;
`

const QuestionTD = styled.td`
    text-align: left;
    color: #D9D9D9;
`
const LinkTD = styled.td`
    text-align: right;
    text-decoration: underline;
`


export default LoginForm;