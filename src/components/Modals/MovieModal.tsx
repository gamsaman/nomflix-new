import { useMatch, useNavigate } from "react-router-dom";
import { IVideo } from "../../api";
import { makeImagePath } from "../../utils/makeImagePath";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../../api";
import {
  ModalBg,
  ModalContent,
  ModalCover,
  ModalInfoWrapper,
} from "./commonComponent";

function MovieModal({ results }: { results: IVideo[] }) {
  const navigate = useNavigate();
  const modalMatch = useMatch("movies/:movieId");
  const onModalBgClick = () => navigate(-1);
  const clickedVideo =
    modalMatch &&
    results.find((result) => result.id === Number(modalMatch.params.movieId));
  const { data, isLoading } = useQuery({
    queryKey: ["movie", "movieDetail"],
    queryFn: () => getMovieDetails(modalMatch!.params.movieId!),
    enabled: !!modalMatch?.params.movieId,
  });

  return (
    <>
      {modalMatch && (
        <>
          <ModalBg animate={{ opacity: 1 }} onClick={onModalBgClick} />
          <ModalContent>
            <ModalCover
              $photo={makeImagePath(clickedVideo?.backdrop_path)}
            ></ModalCover>
            <ModalInfoWrapper></ModalInfoWrapper>
          </ModalContent>
        </>
      )}
    </>
  );
}

export default MovieModal;
