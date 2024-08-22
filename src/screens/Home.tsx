import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import Slider from "../components/Slider";

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
`;
const MainCover = styled.div<{ photo: string }>`
  padding: 68px 60px 60px 60px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1)),
    url(${(props) => props.photo});
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

function Home() {
  const { data: nowPlayingMovies, isLoading } = useQuery({
    queryKey: ["movies", "nowPlaying"],
    queryFn: getMovies,
  });
  // const increaseIndex = () => {
  //   if (leaving) return;
  //   toggleLeaving();
  //   const totalMovies = data?.data.results.length - 1;
  //   const maxIndex = Math.floor(totalMovies / offset) - 1;
  //   setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  // };
  const modalMatch = useMatch("/:movieId");
  const navigate = useNavigate();
  const onModalBgClick = () => navigate(-1);
  return (
    <>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <CoverWrapper>
            <MainCover
              photo={makeImagePath(
                nowPlayingMovies?.data.results[0].backdrop_path || ""
              )}
            >
              <Title>{nowPlayingMovies?.data.results[0].title}</Title>
              <Overview>{nowPlayingMovies?.data.results[0].overview}</Overview>
            </MainCover>
            <Slider
              results={nowPlayingMovies?.data.results}
              className="first-slide"
              title="Now Playing"
            />
          </CoverWrapper>
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
    </>
  );
}

export default Home;
