import { BrowserRouter, Outlet, Routes, Route, Link } from "react-router-dom";
import Chart from "../components/chart";

import AdminPage from "./hostPage/addHostPage";
import * as React from "react";

export function Test() {
  return (
    <>
      {/* <header>
        <h1>{this.props.title}</h1>
        {this.props.sub}
      </header> */}
      <Nav title="hi" desc="ㅎㅇ" compo={AdminPage}></Nav>
      <hr />
    </>
  );
}
function Nav(props) {
  return (
    <>
      <h2>
        {props.title}
        {props.desc}
      </h2>
      {props.AdminPage()}
    </>
  );
}

export default Test;
