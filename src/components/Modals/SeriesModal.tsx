import { useMatch, useNavigate } from "react-router-dom";
import { getSeriesDetails, IVideo } from "../../api";
import { makeImagePath } from "../../utils/makeImagePath";
import { useQuery } from "@tanstack/react-query";
import {
  ModalBg,
  ModalContent,
  ModalCover,
  ModalInfoWrapper,
} from "./commonComponent";

function SeriesModal({ results }: { results: IVideo[] }) {
  const navigate = useNavigate();
  const modalMatch = useMatch("series/:seriesId");
  const onModalBgClick = () => navigate(-1);
  const clickedVideo =
    modalMatch &&
    results.find((result) => result.id === Number(modalMatch.params.seriesId));
  const { data, isLoading } = useQuery({
    queryKey: ["movie", "movieDetail"],
    queryFn: () => getSeriesDetails(modalMatch!.params.seriesId!),
    enabled: !!modalMatch?.params.seriesId,
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

export default SeriesModal;
