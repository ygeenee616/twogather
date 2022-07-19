import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./Store";
import ScrollToTop from "./components/ScrollToTop";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import RegisterComplete from "./pages/RegisterComplete";
import MyPage from "./pages/MyPage";
import AddReview from "./pages/AddReview";
import AddQnA from "./pages/AddQnA";
import AddQnaComment from "./pages/AddQnaComment";
import Notice from "./pages/Notice";
import AddNotice from "./pages/AddNotice";
import UpdateNotice from "./pages/UpdateNotice";
import AdminHome from "./pages/AdminHome";
import AdminUserList from "./pages/AdminUserList";
import AdminBookList from "./pages/AdminBookList";
import AdminBookDetail from "./pages/BookDetail";
import HostHome from "./pages/HostHome";
import AddHost from "./pages/host/AddHost";
import AddSpace from "./pages/AddSpace";
import HostBookList from "./pages/HostBookList";
import HostSpaceList2 from "./pages/host/HostSpaceList2";
import HostUpdateSpace from "./pages/HostUpdateSpace";
import HostAddRoom from "./pages/host/HostAddRoom";
import HostUpdateRoom from "./pages/host/HostUpdateRoom";
import HostQnA from "./pages/host/HostQnA";
import ProductList from "./pages/ProductList";
import Detail from "./pages/Detail";
import Book from "./pages/Book";
import Home from "./pages/Home";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import BookList from "./components/BookList";
import HostNav from "./components/host/HostNav";
import AdminNav from "./components/admin/AdminNav";
import AdminNotice from "./pages/admin/AdminNotice";
import AdminUser from "./pages/admin/AdminUser";
import AdminBook from "./pages/admin/AdminBook";
import HostRoomList from "./pages/host/HostRoomList";
import HostRoomBook from "./pages/host/HostRoomBook";
import BookDetail from "../src/pages/BookDetail";

function App() {
  return (
    <Provider store={Store}>
      <div className="App" style={{ overflowX: "hidden" }}>
        <BrowserRouter>
          <ScrollToTop />
          <Header></Header>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/registerComplete" element={<RegisterComplete />} />
            <Route path="/myPage" element={<MyPage />} />
            <Route path="/myPage/addReview" element={<AddReview />} />
            <Route path="/myPage/addQnA" element={<AddQnA />} />
            <Route path="/myPage/addQnaCommnet" element={<AddQnaComment />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/addNotice" element={<AddNotice />} />
            <Route path="/updateNotice/:id" element={<UpdateNotice />} />

            <Route path="/admin/notice" element={<AdminNotice />} />
            <Route path="/admin/userList" element={<AdminUser />} />
            <Route path="/admin/bookList" element={<AdminBook />} />

            <Route
              path="/admin/bookList/bookDetail/:bookId"
              element={<BookDetail />}
            />

            <Route path="/host/bookList" element={<BookList />} />
            <Route path="/host/bookList/:bookId" element={<BookList />} />

            <Route
              path="/host/bookList/:roomId/bookDetail/:bookId"
              element={<BookDetail />}
            />

            <Route path="/hostHome" element={<HostNav />} />
            <Route path="/adminHome" element={<AdminNav />} />

            {/* 호스트 정보 추가 */}
            <Route path="/host/addHost" element={<AddHost />} />
            {/* 공간 추가 */}
            <Route path="/host/addSpace" element={<AddSpace />} />
            {/* 공간 리스트 */}
            <Route path="/host/spaceList" element={<HostSpaceList2 />} />
            {/* 룸 리스트 */}
            <Route
              path="/host/spaceList/:spaceId"
              element={<HostSpaceList2 />}
            />
            {/* 공간 수정 */}
            <Route
              path="/host/updateSpace/:spaceId"
              element={<HostUpdateSpace />}
            />
            {/* 룸 추가 */}
            <Route path="/host/addRoom/:spaceId" element={<HostAddRoom />} />
            {/* 룸 수정 */}
            <Route
              path="/host/updateRoom/:spaceId"
              element={<HostUpdateRoom />}
            />
            {/* Q&A 관리 */}
            <Route path="/host/qna" element={<HostQnA />} />
            <Route path="/list" element={<ProductList />} />
            <Route path="/detail/:spaceId" element={<Detail />} />
            <Route path="/book" element={<Book />} />
            <Route path="/" element={<Home />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
