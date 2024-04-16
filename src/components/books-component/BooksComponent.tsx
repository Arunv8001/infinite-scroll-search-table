import { useEffect } from "react";
interface Props {
  books: string[] | undefined;
}

const BooksComponent = (books: Props) => {
  useEffect(() => {
    console.log(books, "result");
  });
  return (
    <div>
      {/* {books &&
        books?.map((value: string, index: number) => {
          if (books?.length === index + 1) {
            return (
              <div ref={lastElementRef} className="search-title" key={index}>
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
        })} */}
    </div>
  );
};

export default BooksComponent;
