import { useEffect, useState } from "react";
import {
    BookDetail,
    BookReviewItem,
} from "../models/book.model";
import { fetchBook, likeBook, unlikeBook } from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCart } from "../api/carts.api";
import { fetchBookReview } from "@/api/review.api";
import { useToast } from "./useToast";

export const useBook = (bookId: string | undefined) => {
    const [book, setBook] = useState<BookDetail | null>(null);
    const [cartAdded, setCartAdded] = useState(false);
    const [reviews, setReviews] = useState<BookReviewItem[]>([]);

    const { isloggedIn } = useAuthStore();
    const { showAlert } = useAlert();
    const { showToast } = useToast();

    const likeToggle = () => {
        if (!isloggedIn) {
            showAlert("로그인이 필요합니다.");
            return;
        }

        if (!book) {
            console.log("book is null");
            return;
        }

        if (book.liked) {
            unlikeBook(book.id).then(() => {
                setBook({
                    ...book,
                    liked: false,
                    likes: book.likes - 1,
                });
            });
            showToast("좋아요가 취소되었습니다.");
        } else {
            likeBook(book.id).then(() => {
                setBook({
                    ...book,
                    liked: true,
                    likes: book.likes + 1, //낙관적 업데이트 -> 불필요한 요청 제거
                });
                showToast("좋아요가 성공했습니다.");
            });
        }
    };

    const addToCart = (quantity: number) => {
        if (!book) return;

        addCart({
            book_id: book.id,
            quantity: quantity,
        }).then(() => {
            setCartAdded(true);
            setTimeout(() => {
                setCartAdded(false);
            }, 3000);
        });
    };

    useEffect(() => {
        if (!bookId) {
            console.log("useBook, useEffect, bookId is null");
            return;
        }

        fetchBook(bookId).then((book) => {
            setBook(book);
        });

        fetchBookReview(bookId).then((reviews) => {
            setReviews(reviews);
        });
    }, [bookId]);


    return { book, likeToggle, addToCart, cartAdded, reviews };
};