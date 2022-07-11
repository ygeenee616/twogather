import logo from "./logo.svg";
import "./App.css";
import AddSpace from "./pages/addHostPage";
import HostBookList from "./pages/hostPage/hostBookListPage";
import HostHome from "./pages/hostPage/hostHome";
import AddHostPage from "./pages/addHostPage";
import AddSpacePage from "./pages/addSpacePage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AdminBookList from "./pages/adminBookList";
import StripeList from "./components/stripeList";
import "./App.css";
import Home from "./pages/Home";
import ProductList from "./pages/productList";
import Notice from "./pages/Notice";
import { Test } from "./pages/test";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import MyPage from "./pages/MyPage";
import Detail from "./pages/detail";
import Book from "./pages/Book";
ß;
import Modal from "./components/Modal";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register/:userType" element={<RegisterForm />} />
          <Route path="/myPage" element={<MyPage />} />
          {/* <Route path="/myPage/addReview" element={<AddReview />} /> */}

          <Route path="/notice" element={<Notice />} />
          {/* <Route path="/addNotice" element={<AddNotice />} />

          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/userList" element={<AdminUserList />} />
          <Route path="/admin/bookList" element={<AdminBookList />} />
          <Route
            path="/admin/bookList/bookDetail/:bookId"
            element={<AdminBookDetail />} />


          <Route path="/host" element={<HostHome />} />
          <Route path="/host/addHost" element={<AddHost />} />
          <Route path="/host/addSpace" element={<AddSpace />} />
          <Route path="/host/bookList" element={<HostBookList />} />
          <Route path="/host/spaceList" element={<HostSpaceList />} />
          <Route path="/host/updateSpace" element={<UpdateSpace />} /> */}

          <Route path="/list/:searchInput" element={<ProductList />} />

          <Route path="/admin/bookList" element={<AdminBookList />} />
          <Route path="/host/addHost" element={<AddHostPage />} />
          <Route path="/host/*" element={<HostHome />} />

          <Route path="/host/addSpace" element={<AddSpacePage />} />
          <Route path="/host/bookList" element={<HostBookList />} />
          <Route path="/detail/:spaceId" element={<Detail />} />
          <Route path="/book" element={<Book />} />

          <Route path="/" element={<Home />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
