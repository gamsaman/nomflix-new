import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";

const CoverWrapper = styled.div`
  height: 100vh;
`;
const MainCover = styled.div<{ bgPhoto: string }>`
  padding: 68px 60px 60px 60px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
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

function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["movies", "nowPlaying"],
    queryFn: getMovies,
  });

  return (
    <CoverWrapper>
      {isLoading ? null : (
        <MainCover
          bgPhoto={makeImagePath(data?.data.results[0].backdrop_path || "")}
        >
          <Title>{data?.data.results[0].title}</Title>
          <Overview>{data?.data.results[0].overview}</Overview>
        </MainCover>
      )}
    </CoverWrapper>
  );
}

export default Home;
