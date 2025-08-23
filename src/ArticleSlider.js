import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ArticleSlider.css";

const articles = [
  {
    title: "Missing Teenager Last Seen in Downtown Area",
    description: "A 16-year-old has been reported missing since Tuesday. He was last seen wearing a blue hoodie and black jeans. Please contact the authorities with any information.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Multi-Car Pile-Up on I-5 Causes Major Delays",
    description: "A five-car pile-up on Interstate 5 has resulted in major traffic delays. Emergency services are on the scene. Drivers are advised to seek alternate routes.",
    image: "https://images.unsplash.com/photo-1737295526610-e6bdb420e9f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhZmljJTIwamFtfGVufDB8fDB8fHww"
  },
  {
    title: "Elderly Woman with Dementia Missing from Home",
    description: "An 82-year-old woman with dementia has been reported missing from her home. She is believed to be on foot and may be confused. Please keep an eye out for her.",
    image: "https://images.unsplash.com/photo-1658686314526-b5f006c6c43a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxkZXJseSUyMHdvbWFuJTIwbWlzc2luZ3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    title: "Motorcycle Accident on Main Street",
    description: "A motorcycle and a car were involved in an accident on Main Street this afternoon. The motorcyclist has been taken to the hospital with non-life-threatening injuries.",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Search Continues for Missing Hiker in National Park",
    description: "The search for a hiker who went missing in the national park last week is ongoing. Volunteers are needed to assist with the search efforts.",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Hit-and-Run Accident Leaves Cyclist Injured",
    description: "A cyclist was injured in a hit-and-run accident last night. The driver of the vehicle fled the scene. Police are asking for witnesses to come forward.",
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Amber Alert Issued for 5-Year-Old Girl",
    description: "An Amber Alert has been issued for a 5-year-old girl who was abducted from her home. The suspect is believed to be driving a blue sedan.",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Jackknifed Truck Blocks Highway",
    description: "A jackknifed truck is blocking all lanes of the highway. The road is expected to be closed for several hours while crews work to clear the scene.",
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "College Student Missing After Leaving Library",
    description: "A college student has been reported missing after leaving the library late last night. Her friends and family are concerned for her safety.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Speeding Car Crashes into Building",
    description: "A speeding car lost control and crashed into a building this morning. The driver was taken to the hospital with minor injuries. No one else was hurt.",
    image: "https://plus.unsplash.com/premium_photo-1661370367221-982fdba4ce89?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyJTIwY3Jhc2h8ZW58MHx8MHx8fDA%3D"
  }
];

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
            <img src={article.image} alt={article.title} />
            <div className="article-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ArticleSlider;
