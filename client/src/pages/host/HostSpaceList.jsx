import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Pagination from "../../components/Pagination";
import ProductCard from "../../components/ProductCard";
import exImg1 from "../../assets/images/ex1.png";
import exImg2 from "../../assets/images/ex2.png";
import HostUpdateSpace from "./HostUpdateSpace";
import * as api from "../../api";
import { useNavigate } from "react-router-dom";
import { Container } from "../../components/register/UserForm";

import Modal from "../../components/Modal";
import * as Api from "../../api";

import HostNav from "../../components/host/HostNav";

HostSpaceList.defaultProps = {
  host: {
    id: "host123",
    name: "김민수",
  },
};

export default function HostSpaceList({ host }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [datas, setDatas] = useState(false);
  const limit = 4;
  const offset = (page - 1) * limit;
  const [dataTrigger, setDataTrigger] = useState(0);

  useEffect(() => {
    async function getData() {
      try {
        const res = await api.get("api/spaces/host");
        const data = res.data.data;
        setDatas(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [dataTrigger]);

  const openModalDeletePopup = async () => {
    const modal = document.querySelector(".modalWrap");
    modal.style.display = "block";
    window.scrollTo(0, 0);
  };

  const closeDeleteSpacePopup = async (props) => {
    const spaceId = props;
    //확인 누르면 삭제하고 딜리트함
    try {
      setDataTrigger(dataTrigger + 1);
      const response = await Api.delete(`api/spaces/host/${spaceId}`);
      console.log(response);
      document.querySelector(".deleteModal").content = "삭제되었습니다.";
    } catch (err) {
      console.log("err");
    }

    const modal = document.querySelector(".modalWrap");
    modal.style.display = "none";
    window.scrollTo(0, 0);
  };

  const renderData = (offset, limit, data) => {
    return data.slice(offset, offset + limit).map((data, i) => (
      <>
        <ProductCard
          key={i}
          src={[exImg1, exImg2]} //아직없음
          hashtags={data.hashtags}
          name={data.name}
          address2={data.address2}
          address3={data.address3}
          price={15000}
          review={13} //아직없음
          link={`/host/updateSpace/${data.id}`}
        ></ProductCard>
        <SubMenuBar>
          <Menu onClick={() => navigate(`/host/updateSpace/${data.id}`)}>
            1.공간수정
          </Menu>
          <Menu onClick={() => openModalDeletePopup(data.id)}>2.공간삭제</Menu>
          {/* 공간삭제 */}
          <Menu onClick={() => navigate(`/host/addRoom/${data.id}`)}>
            3.룸추가
          </Menu>
          <Menu onClick={() => navigate(`/host/updateRoom/${data.id}`)}>
            4.룸수정
          </Menu>
          {/* 룸수정에서 삭제하기? */}
          <Menu onClick>5.룸삭제</Menu>
          {/* {// 룸삭제 구현?//} */}
        </SubMenuBar>
        <ModalWrap className="modalWrap">
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
        <BottomWrap>
          <TitleContanier>
            <MainTitle>{host.name}님 </MainTitle>
            <Title>공간내역</Title>
          </TitleContanier>
          <div onClick={clickToModSpace}>
            <ProductWrap>{renderData(offset, limit, datas)}</ProductWrap>
            <div>
              <Pagination
                total={datas.length}
                limit={limit}
                page={page}
                setPage={setPage}
              />
            </div>
          </div>
        </BottomWrap>
      )}
    </div>
  );
}

const SubMenuBar = styled.div`
  paddin: 3%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Menu = styled.div`
  cursor: pointer;
  :hover {
    color: blue;
  }
`;
const BottomWrap = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 80px;
  margin-bottom: 80px;
`;

const TitleContanier = styled.div`
  border-bottom: 2px solid #8daef2;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const MainTitle = styled.span`
  font-size: 25px;
  font-weight: 700;
  color: #8daef2;
`;

const Title = styled.span`
  font-size: 18px;
  margin: 5px;
`;

const ProductWrap = styled.div`
  display: grid;
  margin: 0 auto;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 2%;
`;

const ModalWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 244vh;
  background-color: rgba(90, 90, 90, 0.2);
  display: none;
`;
