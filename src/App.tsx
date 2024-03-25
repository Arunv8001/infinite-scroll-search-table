import axios from "axios";
import "./App.css";
import SearchInputComponent from "./components/search-component/SearchInputComponent.tsx";
// import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";


function App() {
  const [page, setPage] = useState<number>(1);
  const [inputQuery, setInputQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, sethasMore] = useState<boolean>(false)
  const [data, setData] = useState<string[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElement = (node :HTMLElement | null) => {
    if (loading) return;
    observer.current && observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting && hasMore) {
        setPage((prev: number) => prev + 1)
      } 
    })
    if (node) observer.current.observe(node)
  }


  useEffect(() => {
    setData([]);
  }, [inputQuery]);

  useEffect(() => {
    const getSearchItems = async () => {
      setLoading(true);
      const books = await axios.get(
        `http://openlibrary.org/search.json?title=${inputQuery}&page=${page}`
      );
      setLoading(false);
      sethasMore(books.data.docs.length > 0)
      setData((prev) => {
        return [
          ...new Set([...prev, ...books.data.docs.map((book: { title: any; }) => book.title)]),
        ];
      });
    };
    if (inputQuery !== "")  getSearchItems();
  }, [inputQuery, page]);



  return (
    <>
      <SearchInputComponent
        setInputQuery={setInputQuery}
        setPage={setPage}
      />
      <div>
        {data.map((value: string, index: number) => {
          if (data.length === (index + 1)) {
            return (
              <div ref={lastElement} className="search-title" key={index}>
                {" "}
                {value}
              </div>
            );
          } else {
            return (
              <div className="search-title" key={index}>
                {" "}
                {value}
              </div>
            );
          }
        })}
      </div>
      <div>{loading && "Loading..."}</div>
    </>
  );
}

export default App;
