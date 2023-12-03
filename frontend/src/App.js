import { useEffect } from "react";
import "./App.css";
import Layout from "./layout/Layout";
import { useDispatch } from "react-redux";
import { login } from "./redux/slices/userSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // Kiểm tra xem có thông tin đăng nhập trong localStorage hay không
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      console.log("localstorage", userData);
      // Sử dụng thông tin lưu trong Local Storage để cập nhật Redux store
      dispatch(login(userData));
    }
  });
  return <Layout />;
}

export default App;
