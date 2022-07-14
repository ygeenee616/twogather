import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import CategorySelector from "../components/list/CategorySelector";
import LocalSelector from "../components/list/LocalSelector";
import DateSelector from "../components/list/DateSelector";
import SelecotrResetBtn from "../components/list/SelectorResetBtn";
import exImg1 from "../assets/images/ex1.png";
import exImg2 from "../assets/images/ex2.png";

const ex1 = [
  {
    src: [exImg1, exImg2],
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
    src: [exImg2, exImg1],
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
for (let i = 0; i < 12; i++) {
  exData = exData.concat(ex1);
}
for (let i = 12; i < 24; i++) {
  exData = exData.concat(ex2);
}

const renderData = ({ offset, limit }) => {
  return exData
    .slice(offset, offset + limit)
    .map((exData, i) => (
      <ProductCard
        key={i}
        src={exData.src}
        tag={exData.tag}
        title={exData.title}
        address={exData.address}
        price={exData.price}
        review={exData.review}
        link={`/detail/1`}
      />
    ));
};

export default function ProductList() {
  const [page, setPage] = useState(1);
  const limit = 12;
  const offset = (page - 1) * limit;
  return (
    <div>
      <BottomWrap>
        <SelectorWrap>
          <CategorySelector />
          <LocalSelector />
          <DateSelector />
          <SelecotrResetBtn />
        </SelectorWrap>
        <ProductWrap>{renderData({ offset, limit })}</ProductWrap>

        <Pagination
          total={exData.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </BottomWrap>
    </div>
  );
}

const BottomWrap = styled.div`
  margin: 0 15%;
`;

const ProductWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 2%;
`;

const SelectorWrap = styled.div`
  display: flex;
  button:nth-child(4) {
    width: 9vw;
    margin-left: auto;
    div {
      margin: 0;
      text-align: center;
    }
  }
`;
