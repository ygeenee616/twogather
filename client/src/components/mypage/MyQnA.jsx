import styled from "styled-components";
import QnA from "./QnA";


function MyQnA() {


    return(
        <QnADiv>
            <h3>Q&A</h3>
            <QnATable>
                <QnA></QnA>
            </QnATable>
        </QnADiv>       
    );
}

const QnADiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: wrap-content;
  border: none;
  text-align: center;
  margin: 3rem 0;

  h3 {
      text-align: left;
      font-size: 1.5rem;
      color: #8daef2;
      margin: 0 15vw;
  }
`;



const QnATable = styled.table`

`


export default MyQnA;