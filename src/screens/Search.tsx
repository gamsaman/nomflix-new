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

const Wrapper = styled.div`
  display: grid;
  margin-top: 68px;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  padding: 60px;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data: SearchData, isLoading } = useQuery({
    queryKey: ["search", keyword],
    queryFn: () => getSearchMulti(keyword),
  });

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Wrapper>
          {SearchData?.data.results.map((result: ISearchResult) => {
            return (
              <>
                {result.media_type !== "person" && (
                  <Card id={result.id} initial="normal" whileHover="hover">
                    <CardImage
                      src={makeImagePath(result.backdrop_path, "w500")}
                      variants={imageVariants}
                      transition={{ type: "tween" }}
                    />
                    <Info
                      variants={infoVarinats}
                      transition={{ type: "tween" }}
                    >
                      <h3>{result.title ? result.title : result.name}</h3>
                    </Info>
                  </Card>
                )}
              </>
            );
          })}
        </Wrapper>
      )}
    </>
  );
}

export default Search;
