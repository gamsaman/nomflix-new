import { useQuery } from "@tanstack/react-query";
import { getAiringTodaySeries, getNowPlayingMovies } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils/makeImagePath";
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
  overflow: hidden;
  position: relative;
  margin-bottom: 45px;
`;
const MainCover = styled.div<{ photo: string }>`
  padding: 68px 60px 60px 60px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(24, 24, 24, 1)),
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
  const { data: nowPlayingMovies, isLoading: nowPlayingMoviesLoading } =
    useQuery({
      queryKey: ["movies", "nowPlaying"],
      queryFn: getNowPlayingMovies,
    });
  const { data: airingTodaySeries, isLoading: airingTodaySeriesLoading } =
    useQuery({
      queryKey: ["series", "airingToday"],
      queryFn: getAiringTodaySeries,
    });
  const isLoading = nowPlayingMoviesLoading && airingTodaySeriesLoading;

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
          <MultipleItems
            heading="현재 상영중인 영화"
            results={airingTodaySeries?.data.results.slice(1)}
          />
          <Modal results={nowPlayingMovies?.data.results} />
        </>
      )}
    </>
  );
}

export default Home;
