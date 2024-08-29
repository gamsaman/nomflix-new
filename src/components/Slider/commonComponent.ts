import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled.div`
  padding: 0 60px;
  width: 100%;
  margin-bottom: 50px;

  &.first {
    width: 100%;
    position: absolute;
    bottom: -120px;
    left: 0;
  }
`;
export const Heading = styled.h2`
  font-size: 24px;
  color: ${(props) => props.theme.white.darker};
  margin-bottom: 15px;
`;
export const CardWrapper = styled(motion.div)`
  padding: 0 5px;
  cursor: pointer;
`;
export const Card = styled(motion.div)`
  aspect-ratio: 300 / 170;
  overflow: hidden;
  position: relative;
  border-radius: 5px;
`;
export const CardImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 5px;
`;
export const Info = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  line-height: 1.25;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 0 0 5px 0;
  transform: translateY(60px);
`;

export const infoVarinats = {
  normal: {
    y: 60,
  },
  hover: {
    y: 0,
  },
};
export const imageVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
  },
};
export const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
};
