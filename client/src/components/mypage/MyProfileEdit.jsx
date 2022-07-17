import styled from "styled-components";
import { TagTD, InputTD, AlertTR, RegisterBtn } from "../register/Register";
import { useState } from "react";

function MyProfileEdit({ user }) {
  const { nickname, sex, phoneNumber } = user;
  console.log(user);
  const [newNickname, setNewNickname] = useState(nickname);
  const [newSex, setNewSex] = useState(sex);
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);
  const isNicknameValid = newNickname.length >= 2 && newNickname.length <= 10;

  const handleDoneEdit = async (e) => {
    e.preventDefault();
    
  }

  return (
    <Container>
      <form onSubmit={handleDoneEdit}>
        <EditProfileTable>
          <tr>
            <TagTD>닉네임</TagTD>
            <InputTD>
              <input
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
              ></input>
            </InputTD>
          </tr>
          {!isNicknameValid && (
            <AlertTR>
              <td />
              <td>2~10자로 입력해주세요.</td>
            </AlertTR>
          )}
          <tr>
            <TagTD>비밀번호</TagTD>
            <InputTD>
              <input type="password" placeholder="기존 비밀번호" />
              <input type="password" placeholder="새 비밀번호" />
              <input type="password" placeholder="새 비밀번호 확인" />
            </InputTD>
          </tr>
          <tr>
            <TagTD>성별</TagTD>
            <td>
              <input
                type="radio"
                name="gender"
                checked={newSex === "남"}
                onClick={() => {
                  setNewSex("남");
                }}
              />
              <label for="m">남 </label> &nbsp;
              <input
                type="radio"
                name="gender"
                checked={newSex === "여"}
                onClick={() => {
                  setNewSex("여");
                }}
              />
              <label for="w">여 </label>
            </td>
          </tr>
          <tr>
            <TagTD>전화번호</TagTD>
            <InputTD>
              <input
                type="tel"
                name="phoneNumber"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                value={newPhoneNumber}
                onChange={(e) => setNewPhoneNumber(e.target.value)}
              />
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
