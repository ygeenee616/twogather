import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Api from "../../api";
import AdminNav from "../../components/admin/AdminNav";
import BookList from "../../components/BookList";

export default function AdminBook() {
  const [data, setData] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const req = await Api.get(`api/reservations?page=1&perPage=5`);
        console.log(req);
        const data = await req.data.data.spaces.paginatedSpaces;
        setData(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <AdminNav />
      {data && (
        <BookList data={data} endpoint={"/admin/bookList/bookDetail/"} />
      )}
    </div>
  );
}
