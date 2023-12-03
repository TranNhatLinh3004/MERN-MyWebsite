import React, { useContext, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Container, Row } from "reactstrap";
import userIcon from "../../assets/images/user-icon.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/userSlice";
import { UserMenu } from "../usermenu/UserMenu";

const nav__links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "cart",
    display: "Cart",
  },
];
function Header(props) {
  // const currentUser = useSelector((state) => state.user.currentUser);
  const userData = useSelector((state) => state.user);
  console.log("header", userData);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const navigateToCart = () => {
    navigate("/cart");
  };

  const profileActionRef = useRef("show__profileActions");

  // const toggleProfileActions = () =>
  //   profileActionRef.current.classList.toggle("show__profileActions");

  // const handleLogout = () => {
  //   // Thực hiện các thao tác cần thiết để đăng xuất
  //   // Sau đó dispatch hành động logout
  //   dispatch(logout());
  // };
  const [menu, setMenu] = useState(true);

  const [selectedIcon, setSelectedIcon] = useState("uil uil-moon change__bg");

  const storedTheme = localStorage.getItem("theme");
  //   if (storedTheme) {
  //     setTheme(storedTheme);
  //   }
  const [theme, setTheme] = useState(
    storedTheme === "dark-theme" ? "light-theme" : "dark-theme"
  );

  // const handleClick = () => setMenu(!menu);
  const handleClick = () => {
    setSelectedIcon(
      selectedIcon === "uil uil-moon change__bg"
        ? "uil uil-sun change__bg"
        : "uil uil-moon change__bg"
    );
  };
  const toggleTheme = () => {
    handleClick();
    setTheme(theme === "dark-theme" ? "light-theme" : "dark-theme");
    localStorage.setItem("theme", theme);
  };
  // useEffect(() => {
  //
  // });
  useEffect(() => {
    document.body.className = theme;
    // document.header.className = icon;
  }, [theme]);
  return (
    <header className="header">
      <Container>
        <Row>
          <div className="nav__wrapper">
            <NavLink to="/home">
              <div className="logo">
                {/* <img src={logo} alt="" /> */}
                <i class="uil uil-adobe"></i>
                <div className="">
                  <h1>Perfect Home</h1>
                  {/* <p>Since 1989</p> */}
                </div>
              </div>
            </NavLink>
            <div className={menu ? "navigation" : "navigation active"}>
              <ul className="menu">
                {nav__links.map((item, index) => {
                  return (
                    <li className="nav__item" key={index}>
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? "nav__active" : ""
                        }
                      >
                        {item.display}{" "}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="nav__icons">
              <span className="moon__sun">
                <i className={selectedIcon} onClick={() => toggleTheme()}></i>
              </span>
              <span className="fav__icon">
                <i class="uil uil-bell"></i>
                <span className="badge"> 0</span>
              </span>
              <span className="cart__icon" onClick={navigateToCart}>
                <i class="uil uil-shopping-cart-alt"></i>
                <span className="badge">0</span>
              </span>{" "}
              <div className="">
                {/* <NavLink to="/account">
                  <motion.img
                    whileTap={{ scale: 1.2 }}
                    src={userData.avatar ? userData.avatar : userIcon}
                    alt=""
                    // onClick={toggleProfileActions}
                    // ref={profileActionRef}
                  />
                </NavLink> */}

                {userData.username ? (
                  <UserMenu />
                ) : (
                  <div>
                    <span style={{ marginRight: "10px" }}>
                      <NavLink
                        to="/login"
                        activeClassName="active"
                        className="color-link"
                      >
                        Login
                      </NavLink>
                    </span>
                    <NavLink
                      to="/register"
                      activeClassName="active"
                      className="color-link"
                    >
                      Register
                    </NavLink>
                  </div>
                )}
                {/* 
                <div
                  className="profile__actions"
                  // ref={profileActionRef}
                  // onClick={toggleProfileActions}
                >
                  {userData.avatar ? (
                    <NavLink
                      onClick={handleLogout}
                      className=""
                      style={{ marginRight: "30px" }}
                    >
                      Logout
                    </NavLink>
                  ) : (
                    <div>
                      <span style={{ marginRight: "10px" }}>
                        <NavLink
                          to="/login"
                          activeClassName="active"
                          className="color-link"
                        >
                          Login
                        </NavLink>
                      </span>
                      <NavLink
                        to="/register"
                        activeClassName="active"
                        className="color-link"
                      >
                        Register
                      </NavLink>
                    </div>
                  )}
                </div> */}
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
