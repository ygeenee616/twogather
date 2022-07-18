import styled from "styled-components";
import { TagTD, InputTD, AlertTR, RegisterBtn } from "../register/Register";
import { useEffect, useState } from "react";
import { validatePassword} from "../../assets/utils/UsefulFunction";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";

function MyProfileEdit({ user, handleEditUserDone }) {

  const navigate = useNavigate();

  const { nickname, name, sex, phoneNumber } = user;
  const [newNickname, setNewNickname] = useState(nickname || "");
  const [newName, setNewName] = useState(name || "");
  const [newSex, setNewSex] = useState(sex || "");
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber || "");
  const [newPassword , setNewPassword] = useState("");
  const isNicknameValid = (newNickname) => { return newNickname.length >= 2 && newNickname.length <= 10};
  const isPasswordValid = (newPassword) => { return validatePassword(newPassword) || newPassword!==""};
  const isFormValid = isNicknameValid && isPasswordValid;

  const handleDoneEdit = async (e) => {
    e.preventDefault();
    const newUser = {};
    if (nickname !== newNickname) newUser.nickname = newNickname;
    if (name !== "") newUser.name = newName;
    if (newPassword !== "" && isPasswordValid) newUser.password = newPassword;
    if (sex !== newSex || newSex !== "") newUser.sex = newSex;
    if (phoneNumber !== newPhoneNumber || newPhoneNumber !== "")
      newUser.phoneNumber = newPhoneNumber;

    console.log(newUser); 
    
    handleEditUserDone();
    
    if (isFormValid && newUser !== null) {
      try {
        const res = Api.patch("api/users", newUser);
        handleEditUserDone();
      } catch (err) {
        console.log(err);
      }
    }

  };

  return (
    <Container>
      <form>
        <EditProfileTable>
          <tbody>
            <tr>
              <TagTD>닉네임</TagTD>
              <InputTD>
                <input
                  type="text"
                  value={newNickname}
                  onChange={(e) => setNewNickname(e.target.value)}
                ></input>
              </InputTD>
            </tr>
            {!isNicknameValid(newNickname) && (
              <AlertTR>
                <td colSpan="2">2~10자로 입력해주세요.</td>
              </AlertTR>
            )}
            <tr>
              <TagTD>이름</TagTD>
              <InputTD>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="홍길동"
                />
              </InputTD>
            </tr>
            <tr>
              <TagTD>비밀번호</TagTD>
              <InputTD>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="새 비밀번호를 입력하세요."
                />
              </InputTD>
            </tr>
            {!isPasswordValid(newPassword) && (
              <AlertTR>
                <td colSpan="2">8~16자 영어, 숫자, 특수문자를 사용하세요.</td>
              </AlertTR>
            )}
            <tr>
              <TagTD>성별</TagTD>
              <td>
                <input
                  type="radio"
                  name="gender"
                  checked={newSex === "남"}
                  onChange={() => {
                    setNewSex("남");
                  }}
                />
                <label htmlFor="m">남 </label> &nbsp;
                <input
                  type="radio"
                  name="gender"
                  checked={newSex === "여"}
                  onChange={() => {
                    setNewSex("여");
                  }}
                />
                <label htmlFor="w">여 </label>
              </td>
            </tr>
            <tr>
              <TagTD>전화번호</TagTD>
              <InputTD>
                <input
                  type="tel"
                  name="phoneNumber"
                  pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                  value={newPhoneNumber}
                  onChange={(e) => setNewPhoneNumber(e.target.value)}
                  placeholder="010-1234-5678"
                />
              </InputTD>
            </tr>
          </tbody>
        </EditProfileTable>
        <RegisterBtn onClick={()=> handleDoneEdit() }>수정 완료</RegisterBtn>
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

const EditProfileTable = styled.table`
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
