import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import * as Api from "../../api";
import HostNav from "../../components/host/HostNav";
import BookList from "../../components/BookList";
import Pagination from "../../components/Pagination";

export default function HostRoomBook() {
  const [data, setData] = useState("");
  const [totalPage, setTotalPage] = useState(1);

  const { roomId } = useParams();

  let location = useLocation();
  const params = new URLSearchParams(location.search);
  const page = Number(params.get("page"));

  useEffect(() => {
    const getData = async () => {
      try {
        const req = await Api.getAuth(
          `api/reservations/room/${roomId}?page=${page}&perPage=5`
        );
        const data = await req.data.data.paginatedReservations;
        setTotalPage(req.data.data.totalPage);
        setData(data);
        console.log(req);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    data && (
      <div>
        <HostNav />
        <BookList data={data} endpoint={"bookDetail/"} />
        <Pagination
          total={totalPage}
          currentPage={page}
          url={location.pathname}
        />
      </div>
    )
  );
}
