import styled from "styled-components";
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { NavLink, useMatch, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Nav = styled(motion.nav)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 60px;
  height: 68px;
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.7) 10%,
    transparent
  );
  transition: all 0.5s;
  z-index: 100;
`;
const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;
const Columns = styled.div`
  display: flex;
  align-items: center;
`;
const Links = styled.ul`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const List = styled.li``;
const ListLink = styled(NavLink)`
  color: ${(props) => props.theme.white.darker};
  text-decoration: none;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: ${(props) => props.theme.white.veryDark};
  }

  &.active {
    color: ${(props) => props.theme.white.lighter};
  }
`;
const Search = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  svg {
    color: white;
    cursor: pointer;
    height: 25px;
  }
`;
const SearchIcon = styled(motion.svg)``;
const SearchInput = styled(motion.input)`
  background: rgba(0, 0, 0, 0.75);
  border: 1px solid hsla(0, 0%, 100%, 0.85);
  height: 34px;
  padding-left: 40px;
  width: 270px;
  transform-origin: right center;
  position: absolute;
  left: -270px;
  color: ${(props) => props.theme.white.lighter};
  z-index: -1;

  &:-internal-autofill-selected {
    color: ${(props) => props.theme.white.lighter} !important;
    background: rgba(0, 0, 0, 0.75) !important;
  }

  &::placeholder {
    color: ${(props) => props.theme.gray};
  }
`;
const navVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    backgroundImage: `linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.7) 10%,
    transparent
  )`,
  },
  scroll: {
    backgroundColor: "#141414",
    backgroundImage: "none",
  },
};
interface IForm {
  keyword: string;
}

function Header() {
  const homeMatch = useMatch("");
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();
  const [searchOpen, setSearchOpen] = useState(false);
  const onSearchClick = () => setSearchOpen((prev) => !prev);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    navigate(`search?keyword=${data.keyword}`);
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 68) {
      navAnimation.start("scroll");
    } else {
      navAnimation.start("top");
    }
  });

  return (
    <Nav variants={navVariants} animate={navAnimation} initial="top">
      <Columns>
        <Link to="/">
          <Logo
            xmlns="http://www.w3.org/2000/svg"
            width="1024"
            height="276.742"
            viewBox="0 0 1024 276.742"
          >
            <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
          </Logo>
        </Link>
        <Links>
          <List>
            {homeMatch ? (
              <ListLink to="/" className="active">
                홈
              </ListLink>
            ) : (
              <ListLink to="/">홈</ListLink>
            )}
          </List>
        </Links>
      </Columns>
      <Columns>
        <Search onSubmit={handleSubmit(onValid)}>
          <SearchIcon
            onClick={onSearchClick}
            animate={{ x: searchOpen ? -260 : 0 }}
            transition={{ type: "linear" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </SearchIcon>
          <SearchInput
            {...register("keyword", { required: true, minLength: 1 })}
            placeholder="제목"
            animate={{ scale: searchOpen ? 1 : 0 }}
            transition={{ type: "linear" }}
          />
        </Search>
      </Columns>
    </Nav>
  );
}

export default Header;
