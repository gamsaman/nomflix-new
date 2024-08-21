import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { IMovie } from "../api";
import { useMatch, useNavigate } from "react-router-dom";

const Loader = styled.div`
  background-color: ${(props) => props.theme.black.darker};
  font-size: 20px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const CoverWrapper = styled.div`
  height: 100vh;
  overflow-x: hidden;
  padding-bottom: 200px;
`;
const MainCover = styled.div<{ bgPhoto: string }>`
  padding: 68px 60px 60px 60px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 65px;
  font-weight: 500;
`;
const Overview = styled.p`
  font-size: 18px;
  line-height: 1.5;
  margin-top: 15px;
  width: 40%;
`;
const Slider = styled.div`
  position: relative;
`;
const Row = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;

  &.first-row {
    position: absolute;
    top: -100px;
  }
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
const ModalBg = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;
const Modal = styled(motion.div)`
  width: 40vw;
  height: 60vh;
  background-color: red;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
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

function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["movies", "nowPlaying"],
    queryFn: getMovies,
  });
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (leaving) return;
    toggleLeaving();
    const totalMovies = data?.data.results.length - 1;
    const maxIndex = Math.floor(totalMovies / offset) - 1;
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const modalMatch = useMatch("/:movieId");
  const navigate = useNavigate();
  const onCardClick = (movieId: number) => {
    navigate(`/${movieId}`);
  };
  const onModalBgClick = () => navigate(-1);
  return (
    <CoverWrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <MainCover
            onClick={increaseIndex}
            bgPhoto={makeImagePath(data?.data.results[0].backdrop_path || "")}
          >
            <Title>{data?.data.results[0].title}</Title>
            <Overview>{data?.data.results[0].overview}</Overview>
          </MainCover>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                className="first-row"
                key={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 0.5 }}
              >
                {data?.data.results
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
          </Slider>
          <AnimatePresence>
            {modalMatch && (
              <>
                <ModalBg animate={{ opacity: 1 }} onClick={onModalBgClick} />
                <Modal layoutId={modalMatch.params.movieId} />
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </CoverWrapper>
  );
}

export default Home;
