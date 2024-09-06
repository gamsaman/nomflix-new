import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSearchMulti } from "../api";
import styled from "styled-components";
import {
  Card,
  CardImage,
  Info,
  imageVariants,
  infoVarinats,
} from "../components/Slider/Slider";
import { makeImagePath } from "../utils/makeImagePath";
import { useNavigate } from "react-router-dom";
import SearchModal from "../components/Modals/SearchModal";

interface ISearchResult {
  adult: boolean; // Defaults to true
  backdrop_path: string;
  id: number; // Defaults to 0
  title: string;
  name: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[]; // Array of integers
  popularity: number; // Defaults to 0
  release_date: string;
  video: boolean; // Defaults to true
  vote_average: number; // Defaults to 0
  vote_count: number; // Defaults to 0
}

const CardListsWrapper = styled.div`
  padding: 108px 60px 0 60px;
`;
const CardLists = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  margin-bottom: 60px;
`;
const ListsHeading = styled.h2`
  font-size: 24px;
  color: ${(props) => props.theme.white.darker};
  margin-bottom: 15px;
`;
const NoResult = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Search() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword");
  const movieId = searchParams.get("movieId");
  const seriesId = searchParams.get("seriesId");
  const { data: SearchData, isLoading } = useQuery({
    queryKey: ["search", keyword],
    queryFn: () => getSearchMulti(keyword),
    enabled: !!keyword,
  });
  const navigate = useNavigate();
  const onCardClick = (videoId: number, type: string) => {
    if (type === "movie") {
      navigate(`?keyword=${keyword}&movieId=${videoId}`);
    }
    if (type === "tv") {
      navigate(`?keyword=${keyword}&seriesId=${videoId}`);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <CardListsWrapper>
            <ListsHeading>검색된 영화</ListsHeading>
            {SearchData?.data.results.filter(
              (result: ISearchResult) => result.media_type === "movie"
            ).length === 0 && <NoResult>"검색 결과가 없습니다"</NoResult>}
            <CardLists>
              {SearchData?.data.results
                .filter(
                  (result: ISearchResult) => result.media_type === "movie"
                )
                .map((result: ISearchResult) => (
                  <Card
                    initial="normal"
                    whileHover="hover"
                    key={result.id}
                    onClick={() => onCardClick(result.id, result.media_type)}
                  >
                    <CardImage
                      src={makeImagePath(result.backdrop_path, "w500")}
                      variants={imageVariants}
                      transition={{ type: "tween" }}
                    />
                    <Info
                      variants={infoVarinats}
                      transition={{ type: "tween" }}
                    >
                      <h3>{result.title}</h3>
                    </Info>
                  </Card>
                ))}
            </CardLists>
            <ListsHeading>검색된 시리즈</ListsHeading>
            {SearchData?.data.results.filter(
              (result: ISearchResult) => result.media_type === "tv"
            ).length === 0 && <NoResult>"검색 결과가 없습니다"</NoResult>}
            <CardLists>
              {SearchData?.data.results
                .filter((result: ISearchResult) => result.media_type === "tv")
                .map((result: ISearchResult) => (
                  <Card
                    initial="normal"
                    whileHover="hover"
                    key={result.id}
                    onClick={() => onCardClick(result.id, result.media_type)}
                  >
                    <CardImage
                      src={makeImagePath(result.backdrop_path, "w500")}
                      variants={imageVariants}
                      transition={{ type: "tween" }}
                    />
                    <Info
                      variants={infoVarinats}
                      transition={{ type: "tween" }}
                    >
                      <h3>{result.name}</h3>
                    </Info>
                  </Card>
                ))}
            </CardLists>
          </CardListsWrapper>
          {movieId && <SearchModal type="movie" videoId={movieId} />}
          {seriesId && <SearchModal type="series" videoId={seriesId} />}
        </>
      )}
    </>
  );
}

export default Search;
