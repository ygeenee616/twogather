import styled from "styled-components";
import React, { useState, memo } from "react";
import { RiEdit2Fill, RiExternalLinkFill } from "react-icons/ri";
import ListItem from "./StripeListItem";
import { FaUserCircle } from "react-icons/fa";
import AdminBookDetail from "../pages/AdminBookDetail";
UserInfo.defaultProps = {
  userName: "김미지",
  commentNum: "1863회",
  reportedNum: "100회",
};

function StripeLayout({ datas, headers, columnTemplete, keys, listName }) {
  const [viewInfo, setViewInfo] = useState(false);
  const [bookInfo, setBookInfo] = useState(false);

  function handleClick() {
    if (listName === "USER") {
      //유저이름을 받아와서 api출력
      setViewInfo(!viewInfo);
    }
  }

  return (
    <>
      <Container>
        <UserContainer>
          <UserBox viewInfo={viewInfo}>
            <UserInfo viewInfo={viewInfo}></UserInfo>
          </UserBox>
        </UserContainer>
        <ReservationForm viewInfo={viewInfo}>
          <List templete={columnTemplete}>
            {headers.map((name) => {
              return <Header>{name}</Header>;
            })}
          </List>
          {datas.map((item, idx) => {
            return (
              <div onClick={handleClick}>
                <ListItem
                  item={item}
                  columnTemplete={columnTemplete}
                  keys={keys}
                  listName={listName}
                  //"1fr 2fr 1fr 1fr 2fr 1fr 1.2fr"
                ></ListItem>
              </div>
            );
          })}
        </ReservationForm>
      </Container>
    </>
  );
}

function UserInfo({ userName, commentNum, reportedNum, viewInfo }) {
  return (
    <UserProfile viewInfo={viewInfo}>
      <FaUserCircle size={"40%"} color="lightgrey"></FaUserCircle>
      <UserName>{userName}</UserName>
      <div className="userName">댓글 횟수 : {commentNum}</div>
      <div className="userInfo">신고 횟수 : {reportedNum}</div>
    </UserProfile>
  );
}

const Container = styled.div`
  margin: 0 auto;
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const ReservationForm = styled.div`
  margin: 0 auto;
  padding: 10px 0;
  border-top: 2px solid #8daef2;
  width: 100%;
  height: 100%;

  animation-duration: 0.5s;
  animation-name: ${(props) => (props.viewInfo ? "fadeInDown;" : "none;")}
    @keyframes fadeInDown {
    0% {
      opacity: 1;
      transform: translate3d(0, 10%, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0%, 0);
    }
  }
`;

const Header = styled.div`
  background-color: white;
  font-size: 1.2rem;
  line-height: 2.4rem;
  text-align: center;
  height: 3rem;
  font-weight: bold;

  margin: 0;

  &:last-child {
    border-right: none;
  }
`;
const UserContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const List = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.templete};
  border-bottom: 2px solid #8daef2;
  column-gap: 3px;
`;

const UserProfile = styled.div`

  display: ${(props) => (props.viewInfo ? "flex;" : "none;")}
  justify-content: center;
  align-items: center;
  flex-direction: column;

  animation-duration: 0.5s;
  animation-name: fadeInDown;

  @keyframes fadeInDown {
    0% {
      height: 0%;
      opacity: 0;
      transform: translate3d(0, -10%, 0);
    }
    to {
      height: 100%;
      opacity: 1;
      transform: translate3d(0, -0%, 0);
    }
  }
`;

const UserBox = styled.div`
  margin-bottom: 10%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
    animation: fadeInDown ease-in 0.3s ;

    @keyframes fadeInDown {
      0% {
          opacity: 0;
          transform: translate3d(0, -10%, 0);
      }
      100% {
          opacity: 1;
          transform: translate3d(0,0%,0);
      }
  }

    }
`;

const UserName = styled.div`
  font-size: 1.5rem;
  color: #8daef2;
  text-align: center;
  width: 100%
  margin-top: 10%;
  border-bottom: 2px solid #8daef2;
  margin-bottom: 1%;
`;

export default StripeLayout;
