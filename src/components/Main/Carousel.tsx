import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";
import styled from "styled-components";
import MainBan1 from "../../assets/images/mainban-img1.png";
import MainBan5 from "../../assets/images/mainban-img5.png";
import MainBan6 from "../../assets/images/mainban-img6.png";

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <div className="carousel">
      <Slider {...settings}>
        <Slides>
          <div className="slide-inner">
            <p className="slide-tit">
              취향으로
              <br />
              만나는 우리
              <span className="slide-des">관심사 기반 커뮤니티</span>
            </p>
            <img src={MainBan1} alt="배너" />
          </div>
        </Slides>
        <Slides>
          <div className="slide-inner">
            <p className="slide-tit">
              나의 취미
              <br />
              함께 즐겨요
              <span className="slide-des">프로필 채팅 서비스</span>
            </p>
            <img src={MainBan5} alt="배너" />
          </div>
        </Slides>
        <Slides>
          <div className="slide-inner">
            <p className="slide-tit">
              서로 노하우
              <br />
              공유해요
              <span className="slide-des">취미 클래스 커뮤니티</span>
            </p>
            <img src={MainBan6} alt="배너" />
          </div>
        </Slides>
      </Slider>
    </div>
  );
}

export default Carousel;

const Slides = styled.div`
  height: 400px;
  .slide-tit {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    font-weight: 700;
    font-size: 2.6rem;
    line-height: 3rem;
    .slide-des {
      font-weight: 400;
      font-size: 1.5rem;
      line-height: 2rem;
      letter-spacing: -0.4px;
      margin-top: 25px;
    }
  }
  .slide-inner {
    max-width: 900px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    height: 100%;
  }
`;
