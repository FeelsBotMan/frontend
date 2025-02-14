import { setupWorker } from "msw/browser";
import { addReview, reviewsById } from "./review";
import { categories } from "./category";
import { books, bookGet, bookReviewsGet, likeBook, unlikeBook } from "./books";
import { login, signup, resetPassword } from "./auth";
import { cartGet, cartPost, cartDelete, orderPost, orderGet, orderGetById } from "./order";
// import { delay, http } from "msw";

// 백엔드 결합시 핸들러에서 제외하기
const handlers = [
    // http.all("*", async () => {
    //     await delay(100);
    // }),  // https://h-owo-ld.tistory.com/350
    reviewsById,
    addReview,
    categories,
    books,
    bookGet,
    bookReviewsGet,
    likeBook,
    unlikeBook,
    login,
    signup,
    resetPassword,
    cartGet,
    cartPost,
    cartDelete,
    orderPost,
    orderGet,
    orderGetById
];

export const worker = setupWorker(...handlers);