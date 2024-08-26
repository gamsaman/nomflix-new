import styled from "styled-components";
import { motion } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";

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
  width: 40vw;
  height: 60vh;
  background-color: red;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
`;

function Modal() {
  const navigate = useNavigate();
  const modalMatch = useMatch("/movies/:movieId");
  const onModalBgClick = () => navigate(-1);
  return (
    <>
      {modalMatch && (
        <>
          <ModalBg animate={{ opacity: 1 }} onClick={onModalBgClick} />
          <ModalContent layoutId={modalMatch.params.movieId} />
        </>
      )}
    </>
  );
}

export default Modal;
