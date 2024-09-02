import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSearchMulti } from "../api";

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading } = useQuery({
    queryKey: ["search", keyword],
    queryFn: () => getSearchMulti(keyword),
  });

  console.log(data);

  return <>Search</>;
}

export default Search;
