import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { IMovie } from "../api";
import { useNavigate } from "react-router-dom";
import { makeImagePath } from "../utils";

const SliderWrapper = styled.div`
  padding-left: 60px;

  &.first-slide {
    width: 100%;
    position: absolute;
    bottom: -150px;
  }
`;
const SliderTitle = styled.h2`
  font-size: 24px;
  color: ${(props) => props.theme.white.darker};
  margin-bottom: 15px;
`;
const Row = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
`;
const Card = styled(motion.div)`
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Thumbnail = styled(motion.div)<{ bgPhoto: string }>`
  height: 200px;
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-positon: center center;
  &:first-child {
    transform-origin: center left;
  }
`;
const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  text-align: center;
  font-size: 15px;
  opacity: 0;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};
const cardVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.3,
      type: "tween",
    },
  },
};
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      type: "tween",
    },
  },
};
const offset = 6;

function Slider({
  results,
  className,
  title,
}: {
  results: IMovie[];
  className?: string;
  title: string;
}) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onCardClick = (movieId: number) => {
    navigate(`/${movieId}`);
  };

  return (
    <SliderWrapper className={className}>
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <SliderTitle>{title}</SliderTitle>
        <Row
          className="first-row"
          key={index}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 0.5 }}
        >
          {results
            .slice(1)
            .slice(offset * index, offset * index + offset)
            .map((movie: IMovie) => (
              <Card
                layoutId={movie.id + ""}
                onClick={() => onCardClick(movie.id)}
                whileHover="hover"
                initial="normal"
                variants={cardVariants}
                transition={{ type: "tween" }}
              >
                <Thumbnail
                  key={movie.id}
                  bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                />
                <Info variants={infoVariants}>
                  <h4>{movie.title}</h4>
                </Info>
              </Card>
            ))}
        </Row>
      </AnimatePresence>
    </SliderWrapper>
  );
}

export default Slider;
