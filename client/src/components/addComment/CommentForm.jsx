import styled from "styled-components"

export const CommentTitle = styled.h1`
    color: #BBD3F2;
`

export const CommentInfo = () => {
    return (<CommentInfoContainer>
        <table className="comment-info">
            <tr>
                <td style={{fontWeight: 'bold'}}> 공간명: </td>
                <td> 딘어게인성수 - 브라이덜 샤워 생일파티 </td>
            </tr>
            <tr>
                <td style={{fontWeight: 'bold'}}> 작성자: </td>
                <td> 닉네임 </td>
            </tr>
            <tr>
                <td style={{fontWeight: 'bold'}}> 작성일 </td>
                <td> 2022-02-02 </td>
            </tr>
        </table>
    </CommentInfoContainer>)
}

export const CommentInput = ({commentType, placeholder}) => {
    return <div>
        <h4 style={{color: '#BBD3F2'}}>{commentType}</h4>
        <CommentTextArea placeholder={placeholder}></CommentTextArea>
    </div>
}

export const StarDiv = () => {

}

export const AddCommentBtnDiv = () => {
    return (
        <BtnContainer>
            <button>취소</button>
            <button style={{backgroundColor: '#8DAEF2'}}>작성 완료</button>
        </BtnContainer>
    )
}

const CommentInfoContainer = styled.div`
    width: 20rem;
    margin: 3rem;
    background-color: ;
`
const CommentTextArea = styled.textarea`
    width: 40rem;
    height: 10rem;
    placeholder: {props => props.value}
    padding: 1rem;
`
const BtnContainer = styled.div`
    display: flex;
    flex-direction: row;

    button {
        border: none;
        width: 20rem;
        height: 2rem;
        margin: 2rem 1rem;

        :hover {

        }
    }
`

