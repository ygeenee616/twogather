import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import AdminNotice from "./pages/admin/AdminNotice";
import AdminUser from "./pages/admin/AdminUser";
import AdminBook from "./pages/admin/AdminBook";
import AddHost from "./pages/host/AddHost";
import AddReview from "./pages/AddReview";
import AddQnA from "./pages/AddQnA";
import AddQnaComment from "./pages/AddQnaComment";
import AddNotice from "./pages/AddNotice";
import Book from "./pages/Book";
import BookDetail from "../src/pages/BookDetail";
import Detail from "./pages/Detail";
import Footer from "./layout/Footer";
import HostAddSpace from "./pages/host/HostAddSpace";
import HostSpaceList from "./pages/host/HostSpaceList";
import HostUpdateSpace from "./pages/host/HostUpdateSpace";
import HostAddRoom from "./pages/host/HostAddRoom";
import HostUpdateRoom from "./pages/host/HostUpdateRoom";
import HostQnA from "./pages/host/HostQnA";
import HostQnAList from "./pages/host/HostQnAList";
import HostBook from "./pages/host/HostBook";
import HostRoomBook from "./pages/host/HostRoomBook";
import HostRoomList from "../src/pages/host/HostRoomList";
import Home from "./pages/Home";
import Header from "./layout/Header";
import LoginForm from "./pages/LoginForm";
import MyPage from "./pages/MyPage";
import Notice from "./pages/Notice";
import NotFound from "./pages/NotFound";
import ProductList from "./pages/ProductList";
import RegisterForm from "./pages/RegisterForm";
import RegisterComplete from "./pages/RegisterComplete";
import ScrollToTop from "./components/ScrollToTop";

import UpdateNotice from "./pages/UpdateNotice";

import LoginExpired from "./pages/LoginExpired";
import ImgToS3 from "../src/components/register/ImgToS3";

function App() {
  return (
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
          <Route path="/host/bookList" element={<HostBook />} />
          <Route path="/host/bookList/:roomId" element={<HostRoomBook />} />
          <Route
            path="/host/bookList/:roomId/bookDetail/:bookId"
            element={<BookDetail />}
          />
          {/* 호스트 정보 추가 */}
          <Route path="/host/addHost" element={<AddHost />} />
          {/* 공간 추가 */}
          <Route path="/host/addSpace" element={<HostAddSpace />} />
          {/* 공간 리스트 */}
          <Route path="/host/spaceList" element={<HostSpaceList />} />
          {/* 룸 리스트 */}
          <Route path="/host/spaceList/:spaceId" element={<HostSpaceList />} />
          {/* 공간 수정 */}
          <Route
            path="/host/updateSpace/:spaceId"
            element={<HostUpdateSpace />}
          />
          {/* 룸 리스트 */}
          <Route path="/host/roomList/:spaceId" element={<HostRoomList />} />
          {/* 룸 추가 */}
          <Route path="/host/addRoom/:spaceId" element={<HostAddRoom />} />
          {/* 룸 수정 */}
          <Route path="/host/updateRoom/:roomId" element={<HostUpdateRoom />} />
          {/* Q&A 관리 */}
          <Route path="/host/qna" element={<HostQnA />} />
          <Route path="/host/qna/:spaceId" element={<HostQnAList />} />
          <Route path="/list" element={<ProductList />} />
          <Route path="/detail/:spaceId" element={<Detail />} />
          <Route path="/book" element={<Book />} />
          <Route path="/401" element={<LoginExpired />} />w
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
