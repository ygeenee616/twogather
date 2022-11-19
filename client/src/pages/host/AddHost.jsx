import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Postcode from "../../components/admin/Postcode";
import PostcodePopup from "../../components/admin/PostcodePopup";
import * as Api from "../../api";
import HostNav from "../../components/host/HostNav";
import { Container } from "../MyPage";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";

export default function AddHost() {
  const [imageSrc, setImageSrc] = useState("");
  const [detailImgs, setDatailImgs] = useState([]);
  const [datas, setData] = useState({ accountNumber: "" });
  const [hostInfo, setHostInfo] = useState({});
  const [bankInfo, setBankInfo] = useState({});

  const navigate = useNavigate();
  const handleChangeState = (e) => {
    setHostInfo({
      ...hostInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeBankState = (e) => {
    setBankInfo({
      ...bankInfo,
      [e.target.name]: e.target.value,
    });
  };

  const openConfirmModal = () => {
    const modal = document.querySelector(".modalWrap");
    modal.style.display = "block";
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //포스트 요청시 데이터 새로 넘겨주기 합성해서
    const account = `${bankInfo.bankName} ${bankInfo.bankAccount} ${bankInfo.name}`;

    setHostInfo({ ...hostInfo, accountNumber: account });

    const response = await Api.patchAuth("api/users", hostInfo);
    const res = await Api.patchAuth("api/users", {
      accountNumber: account,
    });
    console.log(response);

    console.log(res);
    openConfirmModal();
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const userDatas = await Api.getAuth("api/users/info");
        const userData = userDatas.data.data;
        const accountData = userData.accountNumber;
        let accountNumbers = "";
        if (accountData != null) {
          accountNumbers = await userData.accountNumber.split(" ");
        }
        setBankInfo({
          bankName: accountNumbers[0],
          bankAccount: accountNumbers[1],
          name: accountNumbers[2],
        });

        console.log(bankInfo);

        setHostInfo({
          businessAddress: userData.businessAddress, //주th
          businessName: userData.businessName, // 상호명
          name: userData.name, //이름
          businessNumber: userData.businessNumber, //사업자번호
          phoneNumber: userData.phoneNumber, //전화번호
        });
        console.log(accountNumbers);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  //1. 로그인안했으면 -> 로그인하도록 리다이렉트

  //2. host등록 되어있으면 -> 호스트 정보가 미리 보이도록

  //3. 없으면 빈칸으로

  //TODO

  return (
    <div>
      <HostNav />
      <Main>
        <SpaceForm onSubmit={handleSubmit}>
          <InputBox className="title">
            <Title>
              Host에 대한 정보를 입력해주세요
              <Hr></Hr>
            </Title>
          </InputBox>
          <InputBox>
            <StyledLabel>상호명</StyledLabel>
            <StyledInput
              required
              type="text"
              width={"40%"}
              name="businessName"
              value={hostInfo.businessName}
              onChange={handleChangeState}
              required={"required"}
            ></StyledInput>
          </InputBox>

          <InputBox>
            <StyledLabel>대표자 명</StyledLabel>
            <StyledInput
              required
              type="text"
              name="name"
              width={"40%"}
              value={hostInfo.name}
              onChange={handleChangeState}
              required
            ></StyledInput>
          </InputBox>

          <InputBox>
            <StyledLabel>사업자번호</StyledLabel>
            <StyledInput
              type="text"
              width={"40%"}
              name="businessNumber"
              value={hostInfo.businessNumber}
              onChange={handleChangeState}
              required
            ></StyledInput>
          </InputBox>

          <InputBox>
            <StyledLabel>연락처</StyledLabel>
            <StyledInput
              width={"40%"}
              type="tel"
              name="phoneNumber"
              placeholder="숫자만 입력해 주세요"
              value={hostInfo.phoneNumber}
              onChange={handleChangeState}
              required
            ></StyledInput>
          </InputBox>
          <InputBox>
            <StyledLabel>계좌번호</StyledLabel>
            <div className="hostAccount">
              <StyledInput
                className="account"
                width={"20%"}
                type="text"
                name="bankName"
                placeholder="은행"
                value={bankInfo.bankName}
                onChange={handleChangeBankState}
                required
              ></StyledInput>
              <StyledInput
                className="account"
                type="text"
                placeholder="계좌번호"
                width={"40%"}
                name="bankAccount"
                value={bankInfo.bankAccount}
                onChange={handleChangeBankState}
                required
              ></StyledInput>
              <StyledInput
                className="account"
                width={"20%"}
                placeholder="소유주"
                type="text"
                name="name"
                value={bankInfo.name}
                onChange={handleChangeBankState}
                required
              ></StyledInput>
            </div>
          </InputBox>

          <ButtonBox>
            <StyledButton
              name="cancel"
              className="cancle"
              backGroundColor="#8daef2"
              color="white"
            >
              등록 취소
            </StyledButton>
            {/* /*네비게이트 설정하기 */}
            <StyledButton
              color="white"
              backGroundColor="#8daef2"
              name="register"
              className="register"
              type="submit"
              value="submit"
            >
              Host 등록
            </StyledButton>
            {/* {포스트 요청하기 } */}
          </ButtonBox>
          <ModalWrap className="modalWrap">
            <Modal
              className="updateModal"
              title="Host"
              content="정보가 갱신되었습니다."
              clickEvent={() => navigate("/host/spaceList")}
            />
          </ModalWrap>
        </SpaceForm>
      </Main>
    </div>
  );
}

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const SpaceForm = styled.form`
  margin-top: 100px;
  margin: 0 10%;
  width: 100%;
  height: 100%;
  font-family: "NEXON Lv2 Gothic Light";
`;

const StyledLabel = styled.div`
  color: #8daef2;
  text-align: start;
  font-family: system-ui;
  margin-bottom: 10px;
  font-size: 1rem;
  font-style: bold;
  font-family: "NEXON Lv2 Gothic Light";
`;

const StyledInput = styled.input`
  width: ${(props) => props.width};
  height: 25px;
  padding: 5px;
  border: 1px solid lightgrey;
  outline-color: #8daef2;
  border-radius: 4px;
  font-family: "NEXON Lv2 Gothic Light";

  & + & {
    margin-left: 3%;
  }
`;

const InputBox = styled.div`
  display: flex;
  font-family: "NEXON Lv2 Gothic Light";

  align-items: start;
  text-align: start;
  flex-direction: column;
  width: 100%;
  margin: 40px auto;

  :nth-child(2) {
    margin-top: 0;
  }

  &.title {
    margin-bottom: 0px;
  }

  .hostAccount {
    width: 100%;
  }
`;

const StyledButton = styled.button`
  width: 48%;
  height: 40px;
  line-height: 40px;
  font-family: "NEXON Lv2 Gothic Light";

  border: none;
  border-radius: 10px;
  font-size: 1rem;

  background-color: ${(props) => props.backGroundColor};
  color: ${(props) => props.color};

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition-duration: 0.3s;

  :hover {
    background-color: black;
  }
  & + & {
    margin-left: 20px;
  }
`;

const Title = styled.h1`
  color: #8daef2;
  width: 100%;
  text-align: left;
  font-family: "S-CoreDream-6Bold";
`;

const ButtonBox = styled.div`
  margin: 0 auto;
  margin-top: 80px;
  margin-bottom: 80px;

  width: 100%;
  display: flex;
`;

const Hr = styled.hr`
  border: 2px #8daef2 solid;
`;

const ModalWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 244vh;
  background-color: rgba(90, 90, 90, 0.2);
  display: none;
`;
