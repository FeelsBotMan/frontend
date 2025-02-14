import { useLocation } from "react-router";
import { fetchBooks } from "../api/books.api";
import { QUERYSTRING } from "../constants/querystring";
import { LIMIT } from "../constants/pagination";
import { useQuery } from "react-query";

export const useBooks = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const { data: booksData, isLoading: isBooksLoading } = useQuery(
        ["books", location.search],
        () =>
            fetchBooks({
                category_id: params.get(QUERYSTRING.CATEGORY_ID)
                    ? Number(params.get(QUERYSTRING.CATEGORY_ID))
                    : undefined,
                news: params.get(QUERYSTRING.NEWS) ? true : false,
                currentPage: params.get(QUERYSTRING.PAGE)
                    ? Number(params.get(QUERYSTRING.PAGE))
                    : 1,
                limit: LIMIT,
            }),
        {
            staleTime: 1000 * 60 * 5, // 5분
            cacheTime: 1000 * 60 * 30, // 30분
            refetchOnWindowFocus: false, // 윈도우 포커스시 재요청 방지
            refetchOnMount: false, // 컴포넌트 마운트시 재요청 방지
        }
    );
    return {
        books: booksData?.books,
        pagination: booksData?.pagination,
        isEmpty: booksData?.books.length === 0,
        isBooksLoading,
    };
};