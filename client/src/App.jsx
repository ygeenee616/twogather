import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {/* <Route path="/login" element={<LoginForm />} />
            <Route path="/register/:userType" element={<RegisterForm />} />
            <Route path="/myPage" element={<MyPage />} />
            <Route path="/myPage/addReview" element={<AddReview />} />

            <Route path="/notice" element={<Notice />} />
            <Route path="/addNotice" element={<AddNotice />} />

            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/userList" element={<AdminUserList />} />
            <Route path="/admin/bookList" element={<AdminBookList />} />
            <Route
              path="/admin/bookList/bookDetail/:bookId"
              element={<AdminBookDetail />}
            />

            <Route path="/host" element={<HostHome />} />
            <Route path="/host/addHost" element={<AddHost />} />
            <Route path="/host/addSpace" element={<AddSpace />} />
            <Route path="/host/bookList" element={<HostBookList />} />
            <Route path="/host/spaceList" element={<HostSpaceList />} />
            <Route path="/host/updateSpace" element={<UpdateSpace />} />

            <Route path="/list/:searchInput" element={<ProductList />} />
            <Route path="/detail/:spaceId" element={<Detail />} />
            <Route path="/book" element={<Book />} />

            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
