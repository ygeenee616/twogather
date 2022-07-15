import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import queryString from "query-string";
import styled from "styled-components";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import CategorySelector from "../components/list/CategorySelector";
import CategoryModal from "../components/list/CategoryModal";
import DateSelector from "../components/list/DateSelector";
import DateModal from "../components/list/DateModal";
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
  const [categoryModalDisplay, setcategoryModalDisplay] = useState("none");
  const [DateModalDisplay, setDateModalDisplay] = useState("none");
  const limit = 12;
  const offset = (page - 1) * limit;
  const { searchInput } = useParams();
  const { search } = window.location;
  const { date } = queryString.parse(search);
  console.log(date);

  //selector toggle 하나씩만되도록
  const handelClickSelector = (e) => {
    const clickedClass = e.target.className.split(" ")[2];
    if (clickedClass === "Category") {
      categoryModalDisplay === "flex"
        ? setcategoryModalDisplay("none")
        : setcategoryModalDisplay("flex");
      setDateModalDisplay("none");
    } else if (clickedClass === "Date") {
      DateModalDisplay === "flex"
        ? setDateModalDisplay("none")
        : setDateModalDisplay("flex");
      setcategoryModalDisplay("none");
    }
  };

  return (
    <BottomWrap>
      <SelectorWrap>
        <CategoryWrap>
          <div onClick={handelClickSelector}>
            <CategorySelector category={searchInput} />
          </div>
          <CategoryModal display={categoryModalDisplay} />
        </CategoryWrap>
        <DateWrap>
          <div onClick={handelClickSelector}>
            <DateSelector />
          </div>
          <DateModal display={DateModalDisplay} />
        </DateWrap>
        <SelecotrResetBtn category={searchInput} />
      </SelectorWrap>
      <ProductWrap>{renderData({ offset, limit })}</ProductWrap>

      <Pagination
        total={exData.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </BottomWrap>
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
  button:nth-child(3) {
    width: 9vw;
    margin-left: auto;
    div {
      margin: 0;
      text-align: center;
    }
  }
`;

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const DateWrap = styled(CategoryWrap)``;
