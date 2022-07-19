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
        console.log(req);
        const data = await req.data.data.spaces.paginatedSpaces;
        console.log("데이터" + data);
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
      <BookList data={data} endpoint={"bookDetail/"} />
    </div>
  );
}
