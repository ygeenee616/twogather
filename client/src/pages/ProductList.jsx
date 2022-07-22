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
import * as Api from "../api";

export default function ProductList() {
  const [categoryModalDisplay, setcategoryModalDisplay] = useState("none");
  const [DateModalDisplay, setDateModalDisplay] = useState("none");
  const [spaces, setSpaces] = useState([]);
  const totalPage = useRef(1);
  const imgUrlList = useRef([]);

  const { search } = window.location;
  const location = useLocation();

  //query
  const params = new URLSearchParams(search);
  const categoryInput = useRef(params.get("category"));
  const dateInput = useRef(parseInt(params.get("date")));
  const searchInput = useRef(params.get("search"));
  const orderInput = useRef(params.get("order"));
  const currentPage = useRef(params.get("page"));
  const queryString = useRef("");

  //url이 바뀔시 query 받아오는 함수
  useEffect(() => {
    categoryInput.current = params.get("category");
    dateInput.current = parseInt(params.get("date"));
    searchInput.current = params.get("search");
    orderInput.current = params.get("order");
    currentPage.current = params.get("page");

    //query유무에 맞게 queryString 지정
    if (!categoryInput.current && !searchInput.current && !orderInput.current) {
      queryString.current = `?order=date&page=${currentPage.current}&perPage=12`;
    } else if (
      categoryInput.current &&
      !searchInput.current &&
      !orderInput.current
    ) {
      queryString.current = `?type=${categoryInput.current}&order=date&page=${currentPage.current}&perPage=12`;
    } else if (
      !categoryInput.current &&
      searchInput.current &&
      !orderInput.current
    ) {
      queryString.current = `?keyword=${searchInput.current}&order=date&page=${currentPage.current}&perPage=12`;
    } else if (
      !categoryInput.current &&
      !searchInput.current &&
      orderInput.current
    ) {
      queryString.current = `?order=${orderInput.current}&page=${currentPage.current}&perPage=12`;
    } else if (
      categoryInput.current &&
      searchInput.current &&
      !orderInput.current
    ) {
      queryString.current = `?type=${categoryInput.current}&keyword=${searchInput.current}&order=date&page=${currentPage.current}&perPage=12`;
    } else if (
      categoryInput.current &&
      !searchInput.current &&
      orderInput.current
    ) {
      queryString.current = `?type=${categoryInput.current}&order=${orderInput.current}&page=${currentPage.current}&perPage=12`;
    } else if (
      !categoryInput.current &&
      searchInput.current &&
      orderInput.current
    ) {
      queryString.current = `?keyword=${searchInput.current}&order=${orderInput.current}&page=${currentPage.current}&perPage=12`;
    } else {
      queryString.current = `?type=${categoryInput.current}&keyword=${searchInput.current}&order=${orderInput.current}&page=${currentPage.current}&perPage=12`;
    }
    console.log(
      categoryInput.current,
      dateInput.current,
      searchInput.current,
      orderInput.current,
      currentPage.current,
      queryString.current
    );
  }, [location.search]);

  //api로 데이터 받아옴
  useEffect(() => {
    async function getData() {
      try {
        const res = await Api.get(`api/spaces${queryString.current}`);
        const datas = res.data.data.paginatedSpaces.paginatedSpaces;

        const spacesIdList = datas.map((space) => space.id);

        await Promise.all(
          spacesIdList.map(async (spaceId) => {
            const imgData = await Api.get(`api/space-images/space/${spaceId}`);
            const imgUrlListElement = await imgData.data.data.map((i) => i.imageUrl);
            imgUrlList.current = [...imgUrlList.current, imgUrlListElement];
          })
        );
        
        setSpaces(datas);
        totalPage.current = res.data.data.paginatedSpaces.totalPage;
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

  const renderData = (spaces) => {
    //space의 최소 가격 리스트, room이 없을 시 0을 반환
    const priceList = spaces.map((space) => {
      const min = Math.min(...space.rooms.map((i) => i.price));
      if (min === Infinity) {
        return 999999;
      } else {
        return min;
      }
    });

    return spaces.map((data, i) => (
      <ProductCard
        key={i}
        src={imgUrlList.current[i]}
        hashtags={data.hashtags}
        name={data.name}
        address2={data.address2}
        address3={data.address3}
        price={priceList[i]}
        reviewsLength={data.numberOfReviews}
        link={`/detail/${data.id}`}
      />
    ));
  };

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
    spaces && (
      <BottomWrap>
        <SelectorWrap>
          <CategoryWrap style={{ position: "relative" }}>
            <div onClick={handelClickSelector}>
              <CategorySelector category={categoryInput.current} />
            </div>
            <CategoryModal display={categoryModalDisplay} />
          </CategoryWrap>
          <DateWrap style={{ position: "relative" }}>
            <div onClick={handelClickSelector}>
              <DateSelector />
            </div>
            <DateModal display={DateModalDisplay} />
          </DateWrap>
          <SelecotrResetBtn
            category={categoryInput.current}
            currentPage={currentPage.current}
          />
        </SelectorWrap>
        <SortingSelector selectedOption={orderInput.current} />
        <ProductWrap>{renderData(spaces)}</ProductWrap>

        <Pagination
          total={totalPage.current}
          currentPage={currentPage}
          url={"/list"}
        />
      </BottomWrap>
    )
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
`;

const DateWrap = styled(CategoryWrap)``;
