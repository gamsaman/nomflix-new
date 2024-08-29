import { useMatch, useNavigate } from "react-router-dom";
import { makeImagePath } from "../../utils/makeImagePath";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../../api";
import {
  ModalBg,
  ModalContent,
  ModalCover,
  ModalInfoWrapper,
  ModalHeading,
  ModalOverView,
  ModalInfoListWrapper,
  ModalInfoList,
  ModalInfoListHeading,
  ModalInfoText,
  ModalInfoLink,
  ModalCloseBtn,
} from "./commonComponent";
import { calculateTime } from "../../utils/calculateTime";
import { useRef, useEffect } from "react";

function MovieModal() {
  const navigate = useNavigate();
  const modalMatch = useMatch("movies/:movieId");
  const onModalClose = () => navigate(-1);
  const { data: clickedVideo, isLoading } = useQuery({
    queryKey: ["movie", "movieDetail"],
    queryFn: () => getMovieDetails(modalMatch!.params.movieId!),
    enabled: !!modalMatch?.params.movieId,
  });
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (modalMatch && modalRef.current && modalRef.current.clientHeight > 800) {
      modalRef.current.classList.add("has-scroll");
    }
  }, [modalMatch]);

  return (
    <>
      {modalMatch && !isLoading && (
        <>
          <ModalBg animate={{ opacity: 1 }} onClick={onModalClose} />
          <ModalContent ref={modalRef}>
            <ModalCover
              $photo={makeImagePath(clickedVideo?.data.backdrop_path)}
            >
              <ModalHeading>{clickedVideo?.data.title}</ModalHeading>
              <ModalCloseBtn onClick={onModalClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  role="img"
                  data-icon="XStandard"
                  aria-hidden="true"
                >
                  <path
                    d="M10.5858 12L2.29291 3.70706L3.70712 2.29285L12 10.5857L20.2929 2.29285L21.7071 3.70706L13.4142 12L21.7071 20.2928L20.2929 21.7071L12 13.4142L3.70712 21.7071L2.29291 20.2928L10.5858 12Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </ModalCloseBtn>
            </ModalCover>
            <ModalInfoWrapper>
              {clickedVideo?.data.overview && (
                <ModalOverView>{clickedVideo?.data.overview}</ModalOverView>
              )}
              <ModalInfoListWrapper>
                {clickedVideo?.data.runtime && (
                  <ModalInfoList>
                    <ModalInfoListHeading>시간:</ModalInfoListHeading>
                    <ModalInfoText>
                      {calculateTime(clickedVideo?.data.runtime)}
                    </ModalInfoText>
                  </ModalInfoList>
                )}
                {clickedVideo?.data.genres && (
                  <ModalInfoList>
                    <ModalInfoListHeading>장르:</ModalInfoListHeading>
                    <ModalInfoText>
                      {clickedVideo?.data.genres.map(
                        (genre: { id: number; name: string }, i: number) => {
                          if (i === clickedVideo?.data.genres.length - 1) {
                            return genre.name;
                          }

                          return `${genre.name}, `;
                        }
                      )}
                    </ModalInfoText>
                  </ModalInfoList>
                )}
                {clickedVideo?.data.tagline && (
                  <ModalInfoList>
                    <ModalInfoListHeading>태그:</ModalInfoListHeading>
                    <ModalInfoText>{clickedVideo?.data.tagline}</ModalInfoText>
                  </ModalInfoList>
                )}
                {clickedVideo?.data.homepage && (
                  <ModalInfoList>
                    <ModalInfoListHeading>홈페이지:</ModalInfoListHeading>
                    <ModalInfoLink
                      href={clickedVideo?.data.homepage}
                      target="_blank"
                    >
                      링크 바로가기
                    </ModalInfoLink>
                  </ModalInfoList>
                )}
              </ModalInfoListWrapper>
            </ModalInfoWrapper>
          </ModalContent>
        </>
      )}
    </>
  );
}

export default MovieModal;
