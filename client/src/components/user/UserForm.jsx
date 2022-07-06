import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-item: center;
  top: 10rem;
  position: absolute;
  width: 20rem;
  height: wrap-content;
  border: none;
  border-radius: 10px;
  text-align: center;
`;
export const ContentsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-item: center;
  position: absolute;
  width: 20rem;
  top: 5rem;
  height: wrap-content;
  border: 1px solid #bbd3f2;
  border-top: none;
  border-radius: 10px;
  text-align: center;
`;

export const FormTitle = styled.div`
  color: #bbd3f2;
  font-weight: bold;
  margin: 0.2rem 1rem;
  text-align: left;
  font-size: 2rem;
`;

// 버튼안의 값: props로 value 값(USER / HOST) 넘겨받기
// 클릭된 버튼: 클릭 -> 디렉토리 /user 또는 /host로 -> clicked props 넘겨받기
export const UserBtn = styled.button`
  color: black;
  font-weight: bold;
  height: 3em;
  width: 50%;
  border: none;
  border-radius: 10px;

  value: ${(props) => props.value};
  ${(props) =>
    props.clicked
      ? ` background-color: #BBD3F2; 

    `
      : ` background-color: #D9D9D9;
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
    `}

  :hover {
    box-shadow: none;
  }
`;

export const Line = styled.div`
  height: none;
  margin: 1rem;
  border: solid 0.8px #bbd3f2;
`;
