import { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";
import UserBlockButtonBox from "./UserBlockButtonBox";
import * as Api from "../api";
export default function UserInfo({
  userName,
  commentNum,
  reportedNum,
  viewInfo,
  userId,
}) {
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    async function getData() {
      const response = await Api.getAuth(`api/users/${userId}`);
      setUserInfo(response.data.data);
    }
    getData();
  }, [userId]);

  return (
    userInfo && (
      <UserProfile viewInfo={viewInfo}>
        <FaUserCircle size={"40%"} color="lightgrey"></FaUserCircle>
        <UserName>{userInfo.name ? userInfo.name : "유저2"}</UserName>
        <UserBlockButtonBox></UserBlockButtonBox>

        <div className="userName">
          예약횟수 : {userInfo.reserbations ? userInfo.reserbations.length : 0}
          회
        </div>
      </UserProfile>
    )
  );
}

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
      transform: translate3d(0, 0%, 0);
    }
  }
`;

const UserName = styled.div`
  font-size: 1.5rem;
  color: #8daef2;
  text-align: center;
  width: 50%;
  margin-top: 10%;
  border-bottom: 2px solid #8daef2;
  margin-bottom: 1%;
`;
