import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import * as Api from "../api";

export default function Notice({ url }) {
  const [data, setData] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [totalPage, setTotalPage] = useState(1);

  const nav = useNavigate();
  const { search } = window.location;
  const params = new URLSearchParams(search);
  const page = Number(params.get("page"));

  const [clickedNumber, setClickedNumber] = useState(0);

  //클릭된 line의 content만 보이도록 하는 함수
  const handleClickToNoticeDetail = (e) => {
    const stringClass = e.target.className;
    const numberClass =
      typeof stringClass === "object"
        ? Number(stringClass.baseVal)
        : Number(stringClass.replace(/[^0-9]/g, ""));
    numberClass === clickedNumber
      ? setClickedNumber(0)
      : setClickedNumber(numberClass);
  };

  //수정버튼 클릭시 수정페이지로 이동
  const handleClickUpdateButton = (e) => {
    const clickedId = e.target.id;
    nav(`/updateNotice/${clickedId}`);
  };

  //삭제버튼 클릭시 삭제
  const handleClickDeleteButton = async (e) => {
    const clickedId = e.target.id.replace(/[^0-9]/g, "");
    const req = await Api.deleteAuth(`api/notices/${clickedId}`);

    const modal = document.querySelector(".modalWrap");
    modal.style.display = "block";
    window.scrollTo(0, 0);
  };

  //데이터, 유저role 불러옴, admin계정일경우 추가, 수정, 삭제버튼 보임
  useEffect(() => {
    async function getData() {
      const res = await Api.getAuth(`api/notices?page=${page}&perPage=10`);
      const datas = res.data.data.paginatedNotices;
      setTotalPage(res.data.data.totlaPage);
      setData(datas);
    }
    getData();

    async function getUser() {
      const response = await Api.getAuth("api/users/info");
      setIsAdmin(response.data.data.isAdmin);
    }
    getUser();
  }, []);

  //불러온 데이터 렌더링
  const renderData = (data) => {
    return data.map((cur, i) => {
      return (
        <Item key={i} className={cur.id} onClick={handleClickToNoticeDetail}>
          <Line className={cur.id}>
            <div className={cur.id}>공지사항</div>
            <div className={cur.id}>{cur.title}</div>
            <div className={cur.id}>{cur.writtenDate}</div>
            <div
              className={"updateDeleteButton"}
              style={isAdmin ? { display: "block" } : { display: "none" }}
            >
              <NoticeUpdateButton
                id={cur.id}
                onClick={(e) => handleClickUpdateButton(e)}
              >
                수정
              </NoticeUpdateButton>
              <NoticeDeleteButton
                id={`d${cur.id}`}
                onClick={(e) => handleClickDeleteButton(e)}
              >
                삭제
              </NoticeDeleteButton>
            </div>
            <div>
              <IoIosArrowDown className={cur.id} />
            </div>
          </Line>
          <Content className={`content${cur.id}`}>{cur.content}</Content>
        </Item>
      );
    });
  };

  return (
    data && (
      <div>
        <NoticeWrap>
          <NoticeTitle>공지사항</NoticeTitle>
          <ButtonGoToAddNotice
            id="addButton"
            style={isAdmin ? { display: "flex" } : { display: "none" }}
            onClick={() => nav("/addNotice")}
          >
            <AiOutlinePlus />
            <div>공지사항 추가</div>
          </ButtonGoToAddNotice>
          <NoticeTable clickedNumber={clickedNumber}>
            {renderData(data)}
          </NoticeTable>
        </NoticeWrap>
        <Pagination
          total={totalPage}
          currentPage={page}
          url={url ?? "/notice"}
        />
        <ModalWrap className="modalWrap">
          <Modal
            className="deleteNoticeModal"
            title=""
            content="공지사항이 삭제되었습니다."
            clickEvent={() =>
              window.location.replace(
                url ? `${url}?page=${page}` : `/notice?page=${page}`
              )
            }
          />
        </ModalWrap>
      </div>
    )
  );
}

const Item = styled.div`
  display: flex;
  flex-direction: column;
`;

const Line = styled.div`
  display: flex;
  border-bottom: 1px solid #8daef2;
  font-size: 1.1rem;
  font-weight: 400;
  padding: 10px 0;
  cursor: pointer;
  div {
    flex-grow: 1;
    margin-left: 2.5vw;
    display: flex;
    align-items: center;
  }
  svg {
    margin-right: 2.5vw;
    color: #8daef2;
  }
  div:nth-child(2) {
    flex: 20 1 0;
  }
  &:hover {
    svg {
      color: #5155a6;
    }
    background-color: #f2f2f2;
  }
`;

const Content = styled.div`
  font-size: 1.1rem;
  font-weight: 400;
  padding: 3vh 12.6vw;
  border: 1px solid #8daef2;
  border-top: none;
  display: none;
  white-space: pre-wrap;
`;

const NoticeWrap = styled.div`
  font-family: "NEXON Lv2 Gothic Light";
  margin: 0 auto 10vh auto;
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const NoticeTitle = styled.span`
  font-size: 2.2rem;
  font-weight: 700;
  text-align: center;
  margin: 8vh 0;
`;

const NoticeTable = styled.div`
  margin: 0 auto;
  border-top: 2px solid #8daef2;
  border-bottom: 2px solid #8daef2;

  width: 100%;
  height: 100%;
  padding-bottom: 0;
  .content${({ clickedNumber }) => clickedNumber} {
    display: block;
  }
`;

const ButtonGoToAddNotice = styled.button`
  background-color: white;
  border: 2px solid #8daef2;
  font-size: 20px;
  border-radius: 10px;
  width: 11rem;
  height: 40px;
  font-weight: 600;
  color: #8daef2;
  cursor: pointer;
  margin-left: auto;
  margin: 0 0 1% auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoticeUpdateButton = styled.button`
  all: unset;
  font-size: 11px;
  color: #8daef2;
  background-color: rgba(141, 175, 242, 0.1);
  padding: 4px;
  border: 2px solid #8daef2;
  border-radius: 6px;
`;

const NoticeDeleteButton = styled.button`
  all: unset;
  font-size: 11px;
  color: #d80907;
  background-color: rgba(216, 10, 7, 0.1);
  padding: 4px;
  margin-left: 5px;
  border: 2px solid #d80907;
  border-radius: 6px;
`;

const ModalWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 244vh;
  background-color: rgba(90, 90, 90, 0.2);
  display: none;
`;
