import styled from "styled-components";


export const FormTitle = styled.h1`
    top: 10em;
    color: #BBD3F2;
    font-weight: bold;

`

// 버튼안의 값: props로 value 값(USER / HOST) 넘겨받기
// 클릭된 버튼: 클릭 -> 디렉토리 /user 또는 /host로 -> clicked props 넘겨받기
export const UserBtn = styled.button`
    color: black;
    font-weight: bold;
    height: 3em;
    width: 50%;
    border: none;
    border-radius: 10px;

    value: ${props => props.value};
    ${props => props.clicked ? 
    ` background-color: #BBD3F2; 

    `
    :
    ` background-color: #D9D9D9;
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
    `

    }

    :hover {
      box-shadow: none;
    }
    
`
