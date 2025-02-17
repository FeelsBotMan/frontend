import { BookReviewItem, BookReviewItemWrite } from "@/models/book.model";
import { requestHandler } from "./http";
import { ROUTES } from "../constants/routes";

export const fetchBookReview = async (bookId: string) => {
    return await requestHandler<BookReviewItem[]>("get", `${ROUTES.REVIEW}/${bookId}`);
};

interface AddBookReviewResponse {
    message: string;
}

export const addBookReview = async (
    bookId: string,
    data: BookReviewItemWrite
) => {
    return await requestHandler<AddBookReviewResponse>(
        "post",
        `${ROUTES.REVIEW}/${bookId}`,
    );
};

export const fetchReviewAll = async () => {
    return await requestHandler<BookReviewItem>("get", "/reviews");
};