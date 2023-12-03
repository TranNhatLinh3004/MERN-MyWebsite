import React from "react";
import Helmet from "../../assets/helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import heroImg from "../../assets/images/hero-img.png";
import "./home.css";

function Home(props) {
  const year = new Date().getFullYear();
  return (
    <Helmet title="Home">
      <section className="hero__section" id="home">
        <div className="hero__container">
          <Col lg="6" md="6">
            <div className="hero__content hidden">
              <p
                className="
              
              home__subtitle
              "
                data-text="Trending product in 2023"
              >
                Trending product in {year}
              </p>
              <h2>Make Your Interior More Minimalistic % Modern</h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit
                corrupti praesentium quos vero error officiis fugiat fuga
                dolores, dolor quasi veritatis sit odio exercitationem
                perferendis blanditiis ducimus laborum ad neque!
              </p>
              <button whileTap={{ scale: 1.2 }} className="buy__btn">
                <Link to="/shop">SHOP NOW</Link>
              </button>
            </div>
          </Col>
          <Col lg="6" md="6">
            <div className="hero__image hidden">
              <img src={heroImg} alt="" />
            </div>
          </Col>
        </div>
      </section>
    </Helmet>
  );
}

export default Home;
