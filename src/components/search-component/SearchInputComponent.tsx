import { ChangeEvent } from "react";
import './SearchInputComponent.css'
interface Iinput {
  setInputQuery: (data: string) => void,
  setPage: (data: number) => void
}
let timer: any;
const SearchInputComponent = ({setInputQuery, setPage}: Iinput) => {


  const handleChange = (input: ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearInterval(timer)
    }
    timer = setTimeout(() => {
      setInputQuery(input.target.value);  
      setPage(1)
    }, 1000);
    
  };
  return (
    <>
      <input
        type="text"
        placeholder="search here"
        onChange={handleChange}
      />{" "}
    </>
  );
};
export default SearchInputComponent;
