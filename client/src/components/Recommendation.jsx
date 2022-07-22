import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";
import * as Api from "../api";

export default function Recommendation() {
  const [spaces, setSpaces] = useState(false);
  const imgUrlList = useRef([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await Api.get(`api/spaces/random`);
        const datas = res.data.data;
        const spacesIdList = datas.map((space) => space.id);

        await Promise.all(
          spacesIdList.map(async (spaceId) => {
            const imgData = await Api.get(`api/space-images/space/${spaceId}`);
            const imgUrlListElement = await imgData.data.data.map(
              (i) => i.imageUrl
            );
            imgUrlList.current = [...imgUrlList.current, imgUrlListElement];
          })
        );
        setSpaces(datas);
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

  return (
    spaces && (
      <RecomWrap>
        <RecomTitle>오늘의 추천 공간</RecomTitle>
        <CardWrap className="card">{renderData(spaces)}</CardWrap>
      </RecomWrap>
    )
  );
}

const RecomTitle = styled.div`
  font-family: "S-CoreDream-6Bold";
  font-size: 1.5vw;
  font-weight: bold;
  margin-bottom: 5vh;
`;

const RecomWrap = styled.div`
  margin: 10vh 0;
`;

const CardWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 2%;
`;
