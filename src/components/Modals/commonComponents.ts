import styled from "styled-components";
import { motion } from "framer-motion";
import isPropValid from "@emotion/is-prop-valid";

export interface IRent {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}
export const ModalBg = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 100;
`;
export const ModalContent = styled(motion.div)`
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
export const ModalCover = styled.div.withConfig({
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
export const ModalHeading = styled.h3`
  font-size: 36px;
  position: absolute;
  bottom: 40px;
`;
export const ModalInfoWrapper = styled.div`
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
`;
export const ModalOverView = styled.p`
  width: 50%;
  line-height: 1.5;
`;
export const ModalInfoListWrapper = styled.div`
  width: 45%;
`;
export const ModalInfoList = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 15px;

  &.no-flex {
    display: block;
  }
`;
export const ModalInfoListHeading = styled.h4`
  color: ${(props) => props.theme.white.darker02};
  font-size: 14px;
`;
export const ModalInfoText = styled.p`
  font-size: 14px;
`;
export const ModalInfoLink = styled.a`
  font-size: 14px;
`;
export const ModalCloseBtn = styled.button`
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
export const ProviderImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 5px;
  margin-top: 10px;
  margin-right: 10px;
`;
