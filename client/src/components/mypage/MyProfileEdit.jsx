import styled from "styled-components";
import { TagTD, InputTD, AlertTR, RegisterBtn } from "../register/Register";
import { useState } from "react";

function MyProfileEdit({oldNickname, oldGender, oldBirthDate}) {

  const [nickname, setNickname] = useState(oldNickname);
  const [gender, setGender] = useState(oldGender);
  const isNicknameValid = nickname.length >= 2 && nickname.length <= 10;


  return (
    <Container>
      <form>
        <EditProfileTable>
          <tr>
            <TagTD>닉네임</TagTD>
            <InputTD>
              <input value={nickname} onChange={(e)=>setNickname(e.target.value)}></input>
            </InputTD>
          </tr>
          {!isNicknameValid && <AlertTR><td /><td>2~10자로 입력해주세요.</td></AlertTR>}
          <tr>
            <TagTD>비밀번호</TagTD>
            <InputTD>
              <input type="password" placeholder="기존 비밀번호"/>
              <input type="password" placeholder="새 비밀번호"/>
              <input type="password" placeholder="새 비밀번호 확인"/>
            </InputTD>
          </tr>
          <tr>
            <TagTD>성별</TagTD>
            <td>
              <div>
                <input type="radio" name="gender" checked={gender==='남'} onClick={()=>{setGender('남')}}/>
                <label for="m">남 </label> &nbsp;
                <input type="radio" name="gender" checked={gender==='여'} onClick={()=>{setGender('여')}}/>
                <label for="w">여 </label>
              </div>
            </td>   
          </tr>
          <tr>
            <TagTD>생년월일</TagTD>
            <InputTD>
              <input type="date" />
            </InputTD>
          </tr>
        </EditProfileTable>
        <RegisterBtn>수정 완료</RegisterBtn>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-item: center;
  height: wrap-content;
  border-radius: 10px;
  text-align: center;
  width: 20rem;
`;

const EditProfileTable = styled.div`
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: auto;
  justify-content: center;

  tr {
    width: 100%;
    height: 2rem;
  }

  td {
    width: 5rem;
    padding: 0.5rem;
    text-align: left;
  }
`;

export default MyProfileEdit;
