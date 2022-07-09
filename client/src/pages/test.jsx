import { BrowserRouter, Outlet, Routes, Route, Link } from "react-router-dom";
import Chart from "../components/chart";

import AdminPage from "./adminPage";
import * as React from "react";

export function Test() {
  return (
    <>
      <Routes>
        <Route path="/test/apple" element={<Hom />} />;
      </Routes>
      <hr />
    </>
  );
}
function Nav() {
  return (
    <>
      <Link to="/test/apple">hi</Link>;
    </>
  );
}

function Hom() {
  return (
    <div>
      <h2>Hom</h2>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}
export { Test as default, Home };
