import { useQuery } from "@tanstack/react-query";
import {
  getAiringTodaySeries,
  getNowPlayingMovies,
  getPopularSeries,
  getTopRatedMovies,
  getUpcomingMovies,
  getTopRatedSeries,
} from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils/makeImagePath";
import isPropValid from "@emotion/is-prop-valid";
import Slider from "../components/Slider/Slider";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

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
const InfoBtn = styled.button`
  background-color: rgba(109, 109, 110, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 45px;
  border-radius: 4px;
  gap: 10px;
  margin-top: 22px;

  span {
    font-size: 18px;
  }
`;
const SlidersWrapper = styled.div`
  padding-top: 75px;
`;

function Home() {
  const { data: nowPlayingMovies, isLoading: nowPlayingMoviesLoading } =
    useQuery({
      queryKey: ["movies", "nowPlaying"],
      queryFn: getNowPlayingMovies,
    });
  const { data: topRatedMovies, isLoading: topRatedMoviesLoading } = useQuery({
    queryKey: ["movies", "topRated"],
    queryFn: getTopRatedMovies,
  });
  const { data: upComingMovies, isLoading: upComingMoviesLoading } = useQuery({
    queryKey: ["movies", "upComing"],
    queryFn: getUpcomingMovies,
  });
  const { data: airingTodaySeries, isLoading: airingTodaySeriesLoading } =
    useQuery({
      queryKey: ["series", "airingToday"],
      queryFn: getAiringTodaySeries,
    });
  const { data: popularSeries, isLoading: popularSeriesLoading } = useQuery({
    queryKey: ["series", "popular"],
    queryFn: getPopularSeries,
  });
  const { data: topRatedSeries, isLoading: topRatedSeriesLoading } = useQuery({
    queryKey: ["series", "topRated"],
    queryFn: getTopRatedSeries,
  });
  const isLoading =
    nowPlayingMoviesLoading &&
    airingTodaySeriesLoading &&
    topRatedMoviesLoading &&
    popularSeriesLoading &&
    upComingMoviesLoading &&
    topRatedSeriesLoading;
  const navigate = useNavigate();
  const onInfoClick = (videoId: number) => {
    navigate(`movie/${videoId}`);
  };
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
              <InfoBtn
                onClick={() =>
                  onInfoClick(nowPlayingMovies?.data.results[0].id)
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  role="img"
                  data-icon="CircleIStandard"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <span>상세 정보</span>
              </InfoBtn>
            </MainCover>
            <Slider
              heading="현재 상영중인 영화"
              className="first"
              results={nowPlayingMovies?.data.results.slice(1)}
              type="movie"
            />
          </CoverWrapper>
          <SlidersWrapper>
            <Slider
              heading="오늘 방영하는 시리즈"
              results={airingTodaySeries?.data.results}
              type="series"
            />
            <Slider
              heading="상위 등급 영화"
              results={topRatedMovies?.data.results}
              type="movie"
            />
            <Slider
              heading="대중적인 시리즈"
              results={popularSeries?.data.results}
              type="series"
            />
            <Slider
              heading="상영 예정 영화"
              results={upComingMovies?.data.results}
              type="movie"
            />
            <Slider
              heading="상위 등급 시리즈"
              results={topRatedSeries?.data.results}
              type="series"
            />
          </SlidersWrapper>
          <Modal type="movie" />
          <Modal type="series" />
        </>
      )}
    </>
  );
}

export default Home;
