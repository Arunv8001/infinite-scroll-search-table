import axios from "axios";
import { BookI } from "../modals/BookI";

export const fetchBooks = async (query: string, pageParam: number = 1) => {
    const response = await axios.get(`http://openlibrary.org/search.json?title=${query}&page=${pageParam}`);
    const books = [...new Set([...response.data.docs.map((book: { title: BookI; }) => book.title)]),];
    return books;
}