import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Pagination from "../../components/Pagination";
import ProductCard from "../../components/ProductCard";
import exImg1 from "../../assets/images/ex1.png";
import exImg2 from "../../assets/images/ex2.png";
import HostUpdateSpace from "./HostUpdateSpace";
import * as api from "../../api";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import * as Api from "../../api";
import { HiPlusSm } from "react-icons/hi";
import HostNav from "../../components/host/HostNav";
import { Container } from "../MyPage";

HostSpaceList.defaultProps = {
  host: {
    id: "host123",
    name: "호스트",
  },
};

export default function HostSpaceList({ host }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [datas, setDatas] = useState(false);
  const limit = 4;
  const offset = (page - 1) * limit;
  const [dataTrigger, setDataTrigger] = useState(0);
  const imgUrlList = useRef([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await api.getAuth("api/spaces/host");
        const data = res.data.data;
        console.log(data);

        const spacesIdList = data.map((space) => space.id);
        const userInfo = await api.getAuth("api/users/info");
        const userData = userInfo.data.data;
        console.log(userData);
        const userId = userData;
        console.log(userId);
        host.name = userData.name;

        await Promise.all(
          spacesIdList.map(async (spaceId, i) => {
            const imgData = await Api.get(`api/space-images/space/${spaceId}`);
            const imgUrlListElement = await imgData.data.data.map(
              (i) => i.imageUrl
            );
            imgUrlList.current[i] = imgUrlListElement;
          })
        );

        setDatas(data);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [dataTrigger]);

  const openModalDeletePopup = (e) => {
    const modal = document.getElementById(e);

    modal.style.zIndex = "1000000";
    modal.style.display = "block";
    window.scrollTo(0, 0);
  };

  const closeDeleteSpacePopup = async (props) => {
    const spaceId = props;
    console.log(spaceId);
    //확인 누르면 삭제하고 딜리트함
    try {
      const response = await Api.deleteAuth(`api/spaces/host/${spaceId}`);
      console.log(response);
      setDataTrigger(dataTrigger + 1);
    } catch (err) {
      console.log(err);
    }

    const modal = document.querySelector(".modalWrap");
    modal.style.display = "none";
    window.scrollTo(0, 0);
  };

  const renderData = (data) => {
    return data.map((data, i) => (
      <>
        {console.log(data.id)}
        <ProductCard
          key={i}
          src={imgUrlList.current[i]} //아직없음
          hashtags={data.hashtags}
          name={data.name}
          address2={data.address2}
          address3={data.address3}
          price={data.minPrice}
          reviewsLength={data.reviewsLength} //아직없음
          link={`/host/updateSpace/${data.id}`}
        ></ProductCard>

        <SubMenuBar>
          <Menu
            onClick={() => navigate(`/host/updateSpace/${data.id}`)}
            style={{ backgroundColor: "#B2C8DF" }}
          >
            ✏️공간 수정
          </Menu>
          <Menu
            value={data.id}
            onClick={() => {
              openModalDeletePopup(data.id);
            }}
            style={{ backgroundColor: "#6E85B7" }}
          >
            ✂️공간 삭제
          </Menu>
          {/* 공간삭제 */}
          <Menu
            onClick={() => navigate(`/host/addRoom/${data.id}`)}
            style={{ backgroundColor: "#6E85B7" }}
          >
            ➕룸 추가
          </Menu>
          <Menu
            onClick={() => navigate(`/host/roomList/${data.id}`)}
            style={{ backgroundColor: "#B2C8DF" }}
          >
            ⚒️룸 수정 및 삭제
          </Menu>
        </SubMenuBar>
        <ModalWrap className="modalWrap" id={data.id}>
          <Modal
            className="deleteModal"
            title="공간 삭제"
            content="정말 삭제하시겠습니까?
            공간의 룸들도 모두 삭제됩니다."
            clickEvent={() => closeDeleteSpacePopup(data.id)}
          />
        </ModalWrap>
      </>
    ));
  };

  function clickToModSpace() {
    return <HostUpdateSpace></HostUpdateSpace>;
  }

  return (
    <div>
      <HostNav />
      {datas && (
        <>
          <BottomWrap>
            <TitleContanier>
              <MainTitle>{host.name}님</MainTitle>
              <Title>공간내역</Title>
            </TitleContanier>

            <AddSpaceButton
              onClick={() => {
                navigate(`/host/addSpace`);
              }}
            >
              <HiPlusSm size={"2.5rem"} />
            </AddSpaceButton>

            <div onClick={clickToModSpace}>
              <ProductWrap>{renderData(datas)}</ProductWrap>
            </div>
          </BottomWrap>
        </>
      )}
    </div>
  );
}

const SubMenuBar = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Menu = styled.div`
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "S-CoreDream-3Light";
  color: #fff;

  &:hover {
    box-shadow: 3px 3px 7px #d9d9d9;
  }
`;
const BottomWrap = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 50px;
  position: relative;
`;

const TitleContanier = styled.div`
  font-family: "NEXON Lv2 Gothic Light";
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const MainTitle = styled.span`
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
  color: #000;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 700;
  margin-left: 15px;
`;

const ProductWrap = styled.div`
  display: grid;
  margin: 10% auto;
  width: 70%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 2%;
`;

const ModalWrap = styled.div`
  width: 100%;
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  vertical-allign: middle;
  display: none;
  background-color: rgba(90, 90, 90, 0.2);
`;

const AddSpaceButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 50%;
  border: none;
  background-color: #b1bce6;
  cursor: pointer;
  position: absolute;
  right: 0;

  & svg:hover {
    transform: scale(1.1);
    transition: all 0.3s;
  }
`;
