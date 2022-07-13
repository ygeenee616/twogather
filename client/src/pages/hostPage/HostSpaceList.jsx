import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../layout/Header";
import Pagination from "../../components/Pagination";
import ProductCard from "../../components/ProductCard";
import exImg1 from "../../assets/images/ex1.png";
import exImg2 from "../../assets/images/ex2.png";

ProductList.defaultProps = {
  host: {
    id: "host123",
    name: "김민수",
  },
};

const ex1 = [
  {
    src: exImg1,
    tag: [
      "#강남모임공간",
      "#강남파티룸",
      "#강남럭셔리파티룸",
      "#강남럭셔리모임공간",
      "#앤틱공간대여",
    ],
    title: "강남최대 앤틱모임공간 공유먼트청담",
    address: "서울 강남구 청담동 88-1 하늘빌딩 지하1층",
    price: "150,000",
    review: "12",
  },
];
const ex2 = [
  {
    src: exImg2,
    tag: [
      "#강남모임공간",
      "#강남파티룸",
      "#강남럭셔리파티룸",
      "#강남럭셔리모임공간",
      "#앤틱공간대여",
    ],
    title: "강남최대 앤틱모임공간 공유먼트청담",
    address: "서울 강남구 청담동 88-1 하늘빌딩 지하1층",
    price: "150,000",
    review: "12",
  },
];

let exData = [];
for (let i = 0; i < 8; i++) {
  exData = exData.concat(ex1);
}
for (let i = 8; i < 16; i++) {
  exData = exData.concat(ex2);
}

const renderData = ({ offset, limit }) => {
  return exData
    .slice(offset, offset + limit)
    .map((exData) => (
      <ProductCard
        src={exData.src}
        tag={exData.tag}
        title={exData.title}
        address={exData.address}
        price={exData.price}
        review={exData.review}
      />
    ));
};

export default function ProductList({ host }) {
  const [page, setPage] = useState(1);
  const limit = 8;
  const offset = (page - 1) * limit;
  return (
    <BottomWrap>
      <TitleContanier>
        <MainTitle>{host.name}님 </MainTitle>
        <Title>공간내역</Title>
      </TitleContanier>
      <ProductWrap>{renderData({ offset, limit })}</ProductWrap>
      <div>
        <Pagination
          total={exData.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </div>
    </BottomWrap>
  );
}

const BottomWrap = styled.div`
  margin: 0 15%;
`;

const TitleContanier = styled.div`
  width: 30%;
  border-bottom: 2px solid #8daef2;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  margin-bottom: 20px;
`;

const MainTitle = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
  color: #8daef2;
`;

const Title = styled.span`
  font-size: 1.2rem;
  margin: 10px;
`;

const ProductWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1vw;
`;
