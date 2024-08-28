import { useQuery } from "@tanstack/react-query";
import { getAiringTodaySeries, getNowPlayingMovies, IVideo } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils/makeImagePath";
import MovieSlider from "../components/Sliders/MovieSlider";
import MovieModal from "../components/Modals/MovieModal";
import { useState, useEffect } from "react";
import SeriesSlider from "../components/Sliders/SeriesSlider";
import SeriesModal from "../components/Modals/SeriesModal";
import isPropValid from "@emotion/is-prop-valid";

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
  position: relative;
  margin-bottom: 45px;
`;
const MainCover = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== "$photo",
})<{ $photo: string }>`
  height: 100vh;
  padding: 68px 60px 60px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(24, 24, 24, 1)),
    url(${(props) => props.$photo});
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
const MultipleItemsWrapper = styled.div`
  padding-top: 75px;
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
  const [movieResults, setMovieResults] = useState<IVideo[]>([]);
  const [seriesResults, setSeriesResults] = useState<IVideo[]>([]);
  const isLoading = nowPlayingMoviesLoading && airingTodaySeriesLoading;
  useEffect(() => {
    if (nowPlayingMovies) {
      const newArray = [...nowPlayingMovies?.data.results];
      setMovieResults(newArray);
    }
    if (airingTodaySeries) {
      const newArray = [...airingTodaySeries?.data.results];
      setSeriesResults(newArray);
    }
  }, [nowPlayingMovies, airingTodaySeries]);

  return (
    <>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <CoverWrapper>
            <MainCover
              $photo={makeImagePath(
                nowPlayingMovies?.data.results[0].backdrop_path || ""
              )}
            >
              <Title>{nowPlayingMovies?.data.results[0].title}</Title>
              <Overview>{nowPlayingMovies?.data.results[0].overview}</Overview>
            </MainCover>
            <MovieSlider
              heading="현재 상영중인 영화"
              className="first"
              results={nowPlayingMovies?.data.results.slice(1)}
            />
          </CoverWrapper>
          <MultipleItemsWrapper>
            <SeriesSlider
              heading="현재 방영중인 시리즈"
              results={airingTodaySeries?.data.results}
            />
          </MultipleItemsWrapper>
          <MovieModal results={movieResults} />
          <SeriesModal results={seriesResults} />
        </>
      )}
    </>
  );
}

export default Home;
