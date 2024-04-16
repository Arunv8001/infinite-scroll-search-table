import "./App.css";
import SearchInputComponent from "./components/search-component/SearchInputComponent.tsx";
import { useCallback, useMemo, useRef, useState } from "react";
import { fetchBooks } from "./api/apiCall.tsx";
import { useInfiniteQuery } from "@tanstack/react-query";
import useDebounce from "./hooks/useDebounce.tsx";
import BooksComponent from "./components/books-component/BooksComponent.tsx";

function App() {
  const [inputQuery, setInputQuery] = useState<string>("");
  const observer = useRef<IntersectionObserver | null>(null);
  const debouncedSearchTerm = useDebounce(inputQuery, 500);

  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: ["inputQuery", debouncedSearchTerm],
      queryFn: async ({ pageParam }) => {
        if (debouncedSearchTerm) {
          return fetchBooks(debouncedSearchTerm, pageParam);
        }
        return [];
      },
      initialPageParam: 1,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
    });

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  );

  const books: string[] | void = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    }, []);
  }, [data]);

  if (error) return <h1>Erro occured</h1>;

  return (
    <>
      <SearchInputComponent setInputQuery={setInputQuery} />
      {/* <BooksComponent books={books}/> */}
   
      <div>{isFetching && "Loading..."}</div>
      <div>{!hasNextPage && !isFetching && inputQuery !== "" && <strong>Search has been completed</strong>}</div>
    </>
  );
}

export default App;
