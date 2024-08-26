import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import MultipleItems from "../components/MultipleItems/MultipleItems";
import Modal from "../components/Modal";

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
  position: relative;
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

function Home() {
  const { data: nowPlayingMovies, isLoading } = useQuery({
    queryKey: ["movies", "nowPlaying"],
    queryFn: getMovies,
  });

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
            <MultipleItems
              heading="현재 상영중인 영화"
              className="first"
              results={nowPlayingMovies?.data.results.slice(1)}
            />
          </CoverWrapper>
          <Modal />
        </>
      )}
    </>
  );
}

export default Home;
