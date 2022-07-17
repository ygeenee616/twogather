import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Pagination from "../../components/Pagination";
import ProductCard from "../../components/ProductCard";
import exImg1 from "../../assets/images/ex1.png";
import exImg2 from "../../assets/images/ex2.png";
import HostUpdateSpace from "../HostUpdateSpace";
import * as api from "../../api";

ProductList.defaultProps = {
  host: {
    id: "host123",
    name: "김민수",
  },
};

// const ex1 = [
//   {
//     src: [exImg1, exImg2],
//     tag: [
//       "#강남모임공간",
//       "#강남파티룸",
//       "#강남럭셔리파티룸",
//       "#강남럭셔리모임공간",
//       "#앤틱공간대여",
//     ],
//     title: "강남최대 앤틱모임공간 공유먼트청담",
//     address: "서울 강남구 청담동 88-1 하늘빌딩 지하1층",
//     price: "150,000",
//     review: "12",
//   },
// ];
// const ex2 = [
//   {
//     src: [exImg1, exImg2],
//     tag: [
//       "#강남모임공간",
//       "#강남파티룸",
//       "#강남럭셔리파티룸",
//       "#강남럭셔리모임공간",
//       "#앤틱공간대여",
//     ],
//     title: "강남최대 앤틱모임공간 공유먼트청담",
//     address: "서울 강남구 청담동 88-1 하늘빌딩 지하1층",
//     price: "150,000",
//     review: "12",
//   },
// ];

// let exData = [];
// for (let i = 0; i < 4; i++) {
//   exData = exData.concat(ex1);
// }
// for (let i = 4; i < 8; i++) {
//   exData = exData.concat(ex2);
// }

export default function ProductList({ host }) {
  const [page, setPage] = useState(1);
  const [datas, setDatas] = useState(false);
  const limit = 4;
  const offset = (page - 1) * limit;

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
  }, []);

  const renderData = (offset, limit, data) => {
    return data.slice(offset, offset + limit).map((data, i) => (
      <ProductCard
        key={i}
        src={[exImg1, exImg2]} //아직없음
        hashtags={["#강남모임공간", "#블라블라"]}
        name={data.name}
        address={data.address}
        price={15000}
        review={13} //아직없음
        link={`/host/updateSpace/${data.id}`}
      />
    ));
  };

  function clickToModSpace() {
    return <HostUpdateSpace></HostUpdateSpace>;
  }

  return (
    datas && (
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
    )
  );
}

const BottomWrap = styled.div`
  margin: 0 15%;
`;

const TitleContanier = styled.div`
  width: 160px;
  border-bottom: 2px solid #8daef2;
  display: flex;
  justify-content: space-around;
  margin: 10% auto;
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
  gap: 2vw;
`;
