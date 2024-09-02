import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { makeImagePath } from "../../utils/makeImagePath";
import "./slider.css";
import { useNavigate } from "react-router-dom";
import { IVideo } from "../../api";
import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  padding: 0 60px;
  width: 100%;
  margin-bottom: 50px;

  &.first {
    width: 100%;
    position: absolute;
    bottom: -120px;
    left: 0;
  }
`;
const Heading = styled.h2`
  font-size: 24px;
  color: ${(props) => props.theme.white.darker};
  margin-bottom: 15px;
`;
const CardWrapper = styled(motion.div)`
  padding: 0 5px;
  cursor: pointer;
`;
const Card = styled(motion.div)`
  aspect-ratio: 300 / 170;
  overflow: hidden;
  position: relative;
  border-radius: 5px;
`;
const CardImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 5px;
`;
const Info = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  line-height: 1.25;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 0 0 5px 0;
  transform: translateY(60px);
`;

const infoVarinats = {
  normal: {
    y: 60,
  },
  hover: {
    y: 0,
  },
};
const imageVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
  },
};
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
};

function SeriesSlider({
  heading,
  results,
  type,
  className,
}: {
  heading: string;
  results: IVideo[];
  type: string;
  className?: string;
}) {
  const navigate = useNavigate();
  const onCardClick = (videoId: number) => {
    navigate(`${type}/${videoId}`);
  };
  return (
    <Wrapper className={className ? className : ""}>
      <Heading>{heading}</Heading>
      <div className="slider-container">
        <Slider {...settings}>
          {results?.map((result) => (
            <CardWrapper key={result.id} onClick={() => onCardClick(result.id)}>
              <Card initial="normal" whileHover="hover">
                <CardImage
                  src={makeImagePath(result.backdrop_path, "w500")}
                  variants={imageVariants}
                  transition={{ type: "tween" }}
                />
                <Info variants={infoVarinats} transition={{ type: "tween" }}>
                  <h3>{type === "movie" ? result.title : result.name}</h3>
                </Info>
              </Card>
            </CardWrapper>
          ))}
        </Slider>
      </div>
    </Wrapper>
  );
}

export default SeriesSlider;
