import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { makeImagePath } from "../../utils";
import { motion } from "framer-motion";
import "./multiple-items.css";
import { useNavigate } from "react-router-dom";

interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const Wrapper = styled.div`
  padding: 0 60px;
  width: 100%;

  &.first {
    position: absolute;
    bottom: -50px;
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

const imageVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
  },
};
const infoVarinats = {
  normal: {
    y: 60,
  },
  hover: {
    y: 0,
  },
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
};

function MultipleItems({
  heading,
  className,
  results,
}: {
  heading: string;
  className?: string;
  results: IMovie[];
}) {
  const navigate = useNavigate();
  const onCardClick = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  return (
    <Wrapper className={className}>
      <Heading>{heading}</Heading>
      <div className="slider-container">
        <Slider {...settings}>
          {results.map((movie) => (
            <CardWrapper key={movie.id} onClick={() => onCardClick(movie.id)}>
              <Card initial="normal" whileHover="hover">
                <CardImage
                  src={makeImagePath(movie.backdrop_path, "w500")}
                  variants={imageVariants}
                  transition={{ type: "tween" }}
                />
                <Info variants={infoVarinats} transition={{ type: "tween" }}>
                  <h3>{movie.title}</h3>
                </Info>
              </Card>
            </CardWrapper>
          ))}
        </Slider>
      </div>
    </Wrapper>
  );
}

export default MultipleItems;
