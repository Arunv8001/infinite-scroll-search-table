import { useEffect, useState } from "react";

export default function useDebounce(value: string, delay: number) {
    const [debounceVal, setDebounceVal] = useState<string>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceVal(value);
        }, delay);
        return () =>{
            clearTimeout(handler);
        }
    }, [value, delay])
    return debounceVal;
}