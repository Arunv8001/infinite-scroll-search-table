import { ChangeEvent } from "react";
import './SearchInputComponent.css'
interface Iinput {
  setInputQuery: (data: string) => void
}
let timer: any;
const SearchInputComponent = ({setInputQuery}: Iinput) => {


  const handleChange = (input: ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearInterval(timer)
    }
    timer = setTimeout(() => {
      setInputQuery(input.target.value);  
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
