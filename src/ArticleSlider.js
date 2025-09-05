import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ArticleSlider.css";
import articles from "./articles";

function ArticleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 5000
  };

  return (
    <div className="article-slider">
      <Slider {...settings}>
        {articles.map((article, index) => (
          <div key={index} className="article-slide">
            <Link to={`/case-archive/${article.caseType}`}>
              <img src={article.image} alt={article.title} />
              <div className="article-content">
                <h3>{article.title}</h3>
                <p>{article.shortDescription}</p>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ArticleSlider;
