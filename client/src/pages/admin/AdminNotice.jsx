import React from "react";
import Notice from "../Notice";
import AdminNav from "../../components/admin/AdminNav";

export default function AdminNotice() {
  return (
    <>
      <AdminNav />
      <Notice url={"/admin/notice"} />
    </>
  );
}
