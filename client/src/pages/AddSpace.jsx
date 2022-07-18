import React, { useState, useRef } from "react";
import styled from "styled-components";

import PostcodePopup from "../components/admin/PostcodePopup";
import HostSpaceForm from "../components/host/HostSpaceForm.jsx";

const data = {
  name: "", //공간명
  type: "", //공간타입
  intro: "", //공간소개
  hashTags: [], //태그
  Images: "귀여운탱구사진",
  notice: "", //주의사항
  address: "", //실주소
};

export default function AddSpace() {
  return <HostSpaceForm mode="ADD" data={data}></HostSpaceForm>;
}
