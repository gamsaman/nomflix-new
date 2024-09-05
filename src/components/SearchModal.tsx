import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeImagePath } from "../utils/makeImagePath";
import {
  getMovieDetails,
  getMovieProviders,
  getSeriesDetails,
  getSeriesProviders,
} from "../api";
import { calculateTime } from "../utils/calculateTime";
import { useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import isPropValid from "@emotion/is-prop-valid";

interface IRent {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

const ModalBg = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 100;
`;
const ModalContent = styled(motion.div)`
  width: 50vw;
  min-height: 60vh;
  background-color: red;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
  border-radius: 10px;
  background-color: ${(props) => props.theme.black.darker};
  z-index: 100;

  &.has-scroll {
    overflow-y: scroll;
    height: 800px;
  }

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.black.lighter};
    border-radius: 10px;
  }
`;
const ModalCover = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== "$photo",
})<{ $photo: string }>`
  aspect-ratio: 16 / 9;
  background-image: linear-gradient(rgba(0, 0, 0, 0) 80%, rgba(24, 24, 24, 1)),
    url(${(props) => props.$photo});
  background-size: cover;
  border-radius: 10px 10px 0 0;
  position: relative;
  padding: 40px;
`;
const ModalHeading = styled.h3`
  font-size: 36px;
  position: absolute;
  bottom: 40px;
`;
const ModalInfoWrapper = styled.div`
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
`;
const ModalOverView = styled.p`
  width: 50%;
  line-height: 1.5;
`;
const ModalInfoListWrapper = styled.div`
  width: 45%;
`;
const ModalInfoList = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 15px;

  &.no-flex {
    display: block;
  }
`;
const ModalInfoListHeading = styled.h4`
  color: ${(props) => props.theme.white.darker02};
  font-size: 14px;
`;
const ModalInfoText = styled.p`
  font-size: 14px;
`;
const ModalInfoLink = styled.a`
  font-size: 14px;
`;
const ModalCloseBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.black.darker};
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProviderImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 5px;
  margin-top: 10px;
  margin-right: 10px;
`;

function SearchModal({ type, videoId }: { type: string; videoId: string }) {
  const navigate = useNavigate();
  const onModalClose = () => navigate(-1);

  const { data: clickedVideo, isLoading: modalLoading } = useQuery({
    queryKey: [type, `${type}Detail`],
    queryFn: () => {
      if (type === "movie") {
        return getMovieDetails(videoId);
      } else {
        return getSeriesDetails(videoId);
      }
    },
  });
  const { data: provider, isLoading: providerLoading } = useQuery({
    queryKey: [type, `${type}Provider`],
    queryFn: () => {
      if (type === "movie") {
        return getMovieProviders(videoId);
      } else {
        return getSeriesProviders(videoId);
      }
    },
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
  }, [videoId, clickedVideo]);

  const isLoading = modalLoading && providerLoading;

  return (
    <>
      {!isLoading && (
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

export default SearchModal;
