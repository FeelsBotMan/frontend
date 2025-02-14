import { Book, BookDetail } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { httpClient } from "./http";
import { ROUTES } from "../constants/routes";

interface FetchBooksParams {
    category_id?: number;
    news?: boolean;
    currentPage?: number;
    limit: number;
}

interface FetchBooksResponse {
    books: Book[];
    pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
    try {
        const response = await httpClient.get<FetchBooksResponse>(ROUTES.BOOKS, {
            params: params,
        });

        return response.data;
    } catch (error) {
        console.error(error);
        return {
            books: [],
            pagination: {
                totalCount: 0,
                currentPage: 1,
            },
        };
    }
};

export const fetchBook = async (bookId: string) => {
    const response = await httpClient.get<BookDetail>(`${ROUTES.BOOKS}/${bookId}`);

    return response.data;
};

export const likeBook = async (bookId: number) => {
    const response = await httpClient.post(`${ROUTES.LIKE}/${bookId}`);

    return response.data;
};

export const unlikeBook = async (bookId: number) => {
    const response = await httpClient.delete(`${ROUTES.LIKE}/${bookId}`);

    return response.data;
};