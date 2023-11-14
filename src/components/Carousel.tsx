import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

function Carousel() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500
  }

  return (
    <div className="carousel">
      <Slider {...settings}>
        <Slides>
          <div className='slide-inner'>
            <p className="slide-tit">
              취향으로<br />
              만나는 우리
              <span className='slide-des'>
                관심사 기반 커뮤니티
              </span>
            </p>
            <img src="/src/assets/images/mainban-img1.png" alt="배너" />
          </div>
        </Slides>
        <Slides>
          <div className='slide-inner'>
            <p className="slide-tit">
              취향으로<br />
              만나는 우리
              <span className='slide-des'>
                관심사 기반 커뮤니티
              </span>
            </p>
            <img src="/src/assets/images/mainban-img1.png" alt="배너" />
          </div>
        </Slides>
        <Slides>
          <div className='slide-inner'>
            <p className="slide-tit">
              취향으로<br />
              만나는 우리
              <span className='slide-des'>
                관심사 기반 커뮤니티
              </span>
            </p>
            <img src="/src/assets/images/mainban-img1.png" alt="배너" />
          </div>
        </Slides>
      </Slider>
    </div>
  )
}

export default Carousel

const Slides = styled.div`
  height:400px;
  .slide-tit{
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    font-weight: 700;
    font-size: 48px;
    line-height: 61px;
    .slide-des{
      font-weight: 400;
      font-size: 30px;
      line-height: 24px;
      letter-spacing: -0.4px;
      margin-top: 30px;
    }
  }
  .slide-inner{
    max-width: 900px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    height: 100%;
  }
`