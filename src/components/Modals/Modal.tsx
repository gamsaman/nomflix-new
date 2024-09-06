import { useMatch, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeImagePath } from "../../utils/makeImagePath";
import {
  getMovieDetails,
  getMovieProviders,
  getSeriesDetails,
  getSeriesProviders,
} from "../../api";
import { calculateTime } from "../../utils/calculateTime";
import { useRef, useEffect } from "react";
import {
  ModalBg,
  ModalContent,
  ModalCover,
  ModalHeading,
  ModalInfoWrapper,
  ModalOverView,
  ModalInfoListWrapper,
  ModalInfoList,
  ModalInfoListHeading,
  ModalInfoText,
  ModalInfoLink,
  ModalCloseBtn,
  ProviderImg,
  IRent,
} from "./commonComponents";

function Modal({ type }: { type: string }) {
  const navigate = useNavigate();
  const homeMatch = useMatch(`${type}/:${type}Id`);
  const searchMatch = useMatch(`/search/${type}/:${type}Id`);
  const modalMatch = homeMatch || searchMatch;

  const onModalClose = () => navigate(-1);

  const { data: clickedVideo, isLoading: modalLoading } = useQuery({
    queryKey: [type, `${type}Detail`],
    queryFn: () => {
      if (type === "movie") {
        return getMovieDetails(modalMatch!.params.movieId!);
      } else {
        return getSeriesDetails(modalMatch!.params.seriesId!);
      }
    },
    enabled: !!modalMatch?.params[`${type}Id`],
  });
  const { data: provider, isLoading: providerLoading } = useQuery({
    queryKey: [type, `${type}Provider`],
    queryFn: () => {
      if (type === "movie") {
        return getMovieProviders(modalMatch!.params.movieId!);
      } else {
        return getSeriesProviders(modalMatch!.params.seriesId!);
      }
    },
    enabled: !!modalMatch?.params[`${type}Id`],
  });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      const modalHeight = modalRef.current.clientHeight;
      if (modalHeight > 800) {
        modalRef.current.classList.add("has-scroll");
      } else {
        modalRef.current.classList.remove("has-scroll");
      }
    }

    return () => {
      if (modalRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        modalRef.current.classList.remove("has-scroll");
      }
    };
  }, [modalMatch, clickedVideo]);

  const isLoading = modalLoading && providerLoading;

  return (
    <>
      {modalMatch && !isLoading && (
        <>
          <ModalBg animate={{ opacity: 1 }} onClick={onModalClose} />
          <ModalContent ref={modalRef}>
            <ModalCover
              $photo={makeImagePath(clickedVideo?.data.backdrop_path)}
            >
              <ModalHeading>
                {type === "movie"
                  ? clickedVideo?.data.title
                  : clickedVideo?.data.name}
              </ModalHeading>
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
                {type === "movie" && clickedVideo?.data.runtime && (
                  <ModalInfoList>
                    <ModalInfoListHeading>시간:</ModalInfoListHeading>
                    <ModalInfoText>
                      {calculateTime(clickedVideo?.data.runtime)}
                    </ModalInfoText>
                  </ModalInfoList>
                )}
                {clickedVideo?.data.genres &&
                  clickedVideo?.data.genres.length > 0 && (
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
                {provider?.data.results.KR &&
                  provider?.data.results.KR.buy?.length > 0 && (
                    <ModalInfoList className="no-flex">
                      <ModalInfoListHeading>
                        구매 가능한 OTT
                      </ModalInfoListHeading>
                      <>
                        {provider?.data.results.KR.buy.map(
                          (rentLink: IRent) => (
                            <ProviderImg
                              alt={rentLink.provider_name}
                              key={rentLink.provider_name}
                              src={makeImagePath(rentLink.logo_path)}
                            ></ProviderImg>
                          )
                        )}
                      </>
                    </ModalInfoList>
                  )}
                {provider?.data.results.KR &&
                  provider?.data.results.KR.rent?.length > 0 && (
                    <ModalInfoList className="no-flex">
                      <ModalInfoListHeading>
                        대여 가능한 OTT
                      </ModalInfoListHeading>
                      <>
                        {provider?.data.results.KR.rent.map(
                          (rentLink: IRent) => (
                            <ProviderImg
                              alt={rentLink.provider_name}
                              key={rentLink.provider_name}
                              src={makeImagePath(rentLink.logo_path)}
                            ></ProviderImg>
                          )
                        )}
                      </>
                    </ModalInfoList>
                  )}
                {provider?.data.results.KR &&
                  provider?.data.results.KR.flatrate?.length > 0 && (
                    <ModalInfoList className="no-flex">
                      <ModalInfoListHeading>
                        시청 가능한 OTT
                      </ModalInfoListHeading>
                      <>
                        {provider?.data.results.KR.flatrate.map(
                          (rentLink: IRent) => (
                            <ProviderImg
                              alt={rentLink.provider_name}
                              key={rentLink.provider_name}
                              src={makeImagePath(rentLink.logo_path)}
                            ></ProviderImg>
                          )
                        )}
                      </>
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

export default Modal;
