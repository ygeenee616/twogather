import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import CategorySelector from "../components/list/CategorySelector";
import CategoryModal from "../components/list/CategoryModal";
import DateSelector from "../components/list/DateSelector";
import DateModal from "../components/list/DateModal";
import SelecotrResetBtn from "../components/list/SelectorResetBtn";
import SortingSelector from "../components/list/SortingSelector";
import exImg1 from "../assets/images/ex1.png";
import exImg2 from "../assets/images/ex2.png";
import * as api from "../api";
import { set } from "date-fns/esm";

const ex1 = [
  {
    src: [exImg1, exImg2],
    hashtags: [
      "#강남모임공간",
      "#강남파티룸",
      "#강남럭셔리파티룸",
      "#강남럭셔리모임공간",
      "#앤틱공간대여",
    ],
    name: "강남최대 앤틱모임공간 공유먼트청담",
    address1: "서울 강남구 청담동 88-1 하늘빌딩 지하1층",
    address2: "지하1층",
    price: "150,000",
    review: "12",
  },
];
const ex2 = [
  {
    src: [exImg2, exImg1],
    hashtags: [
      "#강남모임공간",
      "#강남파티룸",
      "#강남럭셔리파티룸",
      "#강남럭셔리모임공간",
      "#앤틱공간대여",
    ],
    name: "강남최대 앤틱모임공간 공유먼트청담",
    address1: "서울 강남구 청담동 88-1 하늘빌딩 지하1층",
    address2: "지하1층",
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

const renderData = (offset, limit, data) => {
  return data
    .slice(offset, offset + limit)
    .map((data, i) => (
      <ProductCard
        key={i}
        src={data.src}
        hashtags={data.hashtags}
        name={data.name}
        address1={data.address1}
        address2={data.address2}
        price={data.price}
        review={data.review}
        link={`/detail/1`}
      />
    ));
};

export default function ProductList() {
  const [page, setPage] = useState(1);
  const [categoryModalDisplay, setcategoryModalDisplay] = useState("none");
  const [DateModalDisplay, setDateModalDisplay] = useState("none");
  const [spaces, setSpaces] = useState([]);

  const limit = 12;
  const offset = (page - 1) * limit;

  const { search } = window.location;
  const location = useLocation();

  const params = new URLSearchParams(search);
  const categoryInput = useRef(params.get("category"));
  const dateInput = useRef(parseInt(params.get("date")));
  const searchInput = useRef(params.get("search"));
  const orderInput = useRef(params.get("order"));

  //url이 바뀔시 query 받아오는 함수
  useEffect(() => {
    categoryInput.current = params.get("category");
    dateInput.current = parseInt(params.get("date"));
    searchInput.current = params.get("search");
    orderInput.current = params.get("order");

    console.log(
      categoryInput.current,
      dateInput.current,
      searchInput.current,
      orderInput.current
    );
  }, [location.search]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await api.get(`api/spaces/type/${categoryInput.current}`);
        const datas = res.data;
        console.log(datas);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

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
            <CategorySelector category={categoryInput.current} />
          </div>
          <CategoryModal display={categoryModalDisplay} />
        </CategoryWrap>
        <DateWrap>
          <div onClick={handelClickSelector}>
            <DateSelector />
          </div>
          <DateModal display={DateModalDisplay} />
        </DateWrap>
        <SelecotrResetBtn category={categoryInput.current} />
      </SelectorWrap>
      <SortingSelector />
      <ProductWrap>{renderData(offset, limit, exData)}</ProductWrap>

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
  height: 80px;
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
  position: relative;
`;

const DateWrap = styled(CategoryWrap)`
  position: relative;
`;
