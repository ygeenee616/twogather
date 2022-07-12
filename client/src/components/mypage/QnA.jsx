import styled from "styled-components";

function QnaTR() {
    return (
        <>
            <td>딘 어게인 성수 - 샤워 생일파티</td>
            <td style={{textOverflow: 'ellipsis'}}>빔프로젝틍에 노트북 연결...</td>
            <td>2020-02-02</td>
            <td>답변 대기중 <deleteQnaBtn>삭제</deleteQnaBtn></td>
        </>
    )
}


const deleteQnaBtn = styled.button`
    height: 1rem;
    width: 1rem;
    border: solid black;
    margin: 0.1rem;
`


export default QnaTR;