interface Props {
  books: any;
  lastElementRef: any
}

const BooksComponent = ({books, lastElementRef}: Props) => {
  return (
    <div>
      {books &&
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
        })}
    </div>
  );
};

export default BooksComponent;
