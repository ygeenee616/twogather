import styled from "styled-components";
import React, { useState, memo, useRef } from "react";
import { RiEdit2Fill, RiExternalLinkFill } from "react-icons/ri";
import ListItem from "./StripeListItem";
import AdminBookDetail from "../pages/AdminBookDetail";
import UserInfo from "../components/UserInfo";
import { Link, useNavigate } from "react-router-dom";

UserInfo.defaultProps = {
  userName: "김미지",
  commentNum: "1863회",
  reportedNum: "100회",
};

function StripeLayout({ datas, headers, columnTemplete, keys, listName }) {
  const [viewInfo, setViewInfo] = useState(false);
  const [bookInfo, setBookInfo] = useState(false);
  const [userId, setUserId] = useState();
  const clickItem = useRef(0);

  const navigate = useNavigate();

  function handleClick(id) {
    if (listName === "USER") {
      //유저이름을 받아와서 api출력
      setViewInfo(!viewInfo);
      setUserId(id);
    } else if (listName === "BOOK") {
      navigate(`/admin/bookList/bookDetail/${id}`);
    }
  }

  return (
    <>
      <Container>
        <UserContainer>
          <UserBox viewInfo={viewInfo}>
            <UserInfo userId={userId} viewInfo={viewInfo}></UserInfo>
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
              //클릭한 항목의 데이터 받아와서 해당 id에 맞는 user출력하기
              <ListContainer key={idx}>
                <ListItem
                  className="10"
                  item={item}
                  columnTemplete={columnTemplete}
                  keys={keys}
                  listName={listName}
                  id={item.id}
                  value={item.id}
                  handleClick={handleClick}
                  onClick={(e) => {
                    handleClick(e.target.value);
                  }}
                  //"1fr 2fr 1fr 1fr 2fr 1fr 1.2fr"
                ></ListItem>
              </ListContainer>
            );
          })}
        </ReservationForm>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin: 0 auto;
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-bottom: 50px;
`;
const ListContainer = styled.div``;
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
      transform: translate3d(0, -10%, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0%, 0);
    }
  }
`;

const Header = styled.div`
  background-color: white;
  font-size: 1rem;
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

export default StripeLayout;
