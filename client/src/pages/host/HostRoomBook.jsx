import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Api from "../../api";
import HostNav from "../../components/host/HostNav";
import BookList from "../../components/BookList";

export default function HostRoomBook() {
  const [data, setData] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const req = await Api.get(`api/reservations?page=1&perPage=5`);
        const data = await req.data.data.spaces.paginatedSpaces;
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <HostNav />
      {data ? (
        <BookList data={data} endpoint={"bookDetail/"} />
      ) : (
        <p>예약 내역이 없습니다.</p>
      )}
    </div>
  );
}
