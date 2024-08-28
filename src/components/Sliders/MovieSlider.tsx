import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { makeImagePath } from "../../utils/makeImagePath";
import "./multiple-items.css";
import { useNavigate } from "react-router-dom";
import { IVideo } from "../../api";
import {
  Wrapper,
  Heading,
  CardWrapper,
  Card,
  CardImage,
  Info,
  infoVarinats,
  imageVariants,
  settings,
} from "./commonComponent";

function MovieSlider({
  heading,
  className,
  results,
}: {
  heading: string;
  className?: string;
  results: IVideo[];
}) {
  const navigate = useNavigate();
  const onCardClick = (movieId: number) => {
    navigate(`movies/${movieId}`);
  };
  return (
    <Wrapper className={className}>
      <Heading>{heading}</Heading>
      <div className="slider-container">
        <Slider {...settings}>
          {results?.map((result) => (
            <CardWrapper key={result.id} onClick={() => onCardClick(result.id)}>
              <Card initial="normal" whileHover="hover">
                <CardImage
                  src={makeImagePath(result.backdrop_path, "w500")}
                  variants={imageVariants}
                  transition={{ type: "tween" }}
                />
                <Info variants={infoVarinats} transition={{ type: "tween" }}>
                  <h3>{result.title}</h3>
                </Info>
              </Card>
            </CardWrapper>
          ))}
        </Slider>
      </div>
    </Wrapper>
  );
}

export default MovieSlider;
