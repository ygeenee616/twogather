import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import Pagination from "../components/Pagination";

const exData = [
  {
    id: 1,
    title: "1번째 공지사항",
    writtenDate: "2022-07-11",
    content: "입니다.",
  },
  {
    id: 2,
    title: "2번째 공지사항",
    writtenDate: "2022-07-11",
    content: "입니다.",
  },
  {
    id: 3,
    title: "3번째 공지사항",
    writtenDate: "2022-07-11",
    content: "입니다.",
  },
  {
    id: 4,
    title: "4번째 공지사항",
    writtenDate: "2022-07-11",
    content: "입니다.",
  },
  {
    id: 5,
    title: "5번째 공지사항",
    writtenDate: "2022-07-11",
    content: "입니다.",
  },
  {
    id: 6,
    title: "6번째 공지사항",
    writtenDate: "2022-07-11",
    content: "입니다.",
  },
  {
    id: 7,
    title: "7번째 공지사항",
    writtenDate: "2022-07-11",
    content: "입니다.",
  },
  {
    id: 8,
    title: "8번째 공지사항",
    writtenDate: "2022-07-11",
    content: "입니다.",
  },
  {
    id: 9,
    title: "9번째 공지사항",
    writtenDate: "2022-07-11",
    content: "입니다.",
  },
  {
    id: 10,
    title: "10번째 공지사항",
    writtenDate: "2022-07-11",
    content: "입니다.",
  },
  {
    id: 11,
    title: "11번째 공지사항",
    writtenDate: "2022-07-11",
    content: "입니다.",
  },
  {
    id: 12,
    title: "12번째 공지사항",
    writtenDate: "2022-07-11",
    content: "입니다.",
  },
  {
    id: 13,
    title: "13번째 공지사항",
    writtenDate: "2022-07-11",
    content: "입니다.",
  },
  {
    id: 14,
    title: "14번째 공지사항",
    writtenDate: "2022-07-11",
    content: "입니다.",
  },
  {
    id: 15,
    title: "15번째 공지사항",
    writtenDate: "2022-07-11",
    content: "입니다.",
  },
  {
    id: 16,
    title: "16번째 공지사항",
    writtenDate: "2022-07-11",
    content: "입니다.",
  },
];

const reversedData = exData.reverse();

export default function Notice() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;
  const nav = useNavigate();
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
  const handleClickDeleteButton = (e) => {
    const clickedId = e.target.id.replace(/[^0-9]/g, "");
    //console.log(clickedId);
  };

  const renderData = ({ offset, limit }) => {
    return reversedData.slice(offset, offset + limit).map((cur, i) => {
      return (
        <Item key={i} className={cur.id} onClick={handleClickToNoticeDetail}>
          <Line className={cur.id}>
            <div className={cur.id}>공지사항</div>
            <div className={cur.id}>{cur.title}</div>
            <div className={cur.id}>{cur.writtenDate}</div>
            <div className={cur.id}>
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
            <IoIosArrowDown className={cur.id} />
          </Line>
          <Content className={`content${cur.id}`}>{cur.content}</Content>
        </Item>
      );
    });
  };

  return (
    <div>
      <NoticeWrap>
        <NoticeTitle>공지사항</NoticeTitle>
        <ButtonGoToAddNotice onClick={() => nav("/addNotice")}>
          <AiOutlinePlus />
          <div>공지사항 추가</div>
        </ButtonGoToAddNotice>
        <NoticeTable clickedNumber={clickedNumber}>
          {renderData({ offset, limit })}
        </NoticeTable>
      </NoticeWrap>
      <Pagination
        total={exData.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}

const Item = styled.div`
  display: flex;
  flex-direction: column;
`;

const Line = styled.div`
  display: flex;
  border-bottom: 1px solid #8daef2;
  font-size: 1.2rem;
  font-weight: 400;
  padding: 10px 0;
  cursor: pointer;
  div {
    flex-grow: 1;
    margin-left: 2.5vw;
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
  font-size: 1.2rem;
  font-weight: 400;
  padding: 3vh 12.6vw;
  border: 1px solid #8daef2;
  border-top: none;
  display: none;
`;

const NoticeWrap = styled.div`
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
  display: flex;
  background-color: white;
  border: 2px solid #8daef2;
  font-size: 20px;
  border-radius: 10px;
  width: 150px;
  height: 40px;
  padding-top: 7px;
  font-weight: 600;
  color: #8daef2;
  cursor: pointer;
  margin-left: auto;
  margin: 0 0 1% auto;
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
