import styled from "styled-components";
import { motion } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { IMovie } from "../api";
import { makeImagePath } from "../utils/makeImagePath";

const ModalBg = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
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
`;
const ModalCover = styled.div<{ photo: string }>`
  aspect-ratio: 16 / 9;
  background-image: linear-gradient(rgba(0, 0, 0, 0) 80%, rgba(24, 24, 24, 1)),
    url(${(props) => props.photo});
  background-size: cover;
  border-radius: 10px 10px 0 0;
`;

function Modal({ results }: { results: IMovie[] }) {
  const navigate = useNavigate();
  const modalMatch = useMatch("/:videoId");
  const onModalBgClick = () => navigate(-1);
  const clickedVideo =
    modalMatch &&
    results.find((result) => result.id === Number(modalMatch.params.videoId));
  return (
    <>
      {modalMatch && (
        <>
          <ModalBg animate={{ opacity: 1 }} onClick={onModalBgClick} />
          <ModalContent>
            <ModalCover
              photo={makeImagePath(clickedVideo?.backdrop_path)}
            ></ModalCover>
          </ModalContent>
        </>
      )}
    </>
  );
}

export default Modal;
