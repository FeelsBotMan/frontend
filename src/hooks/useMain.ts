import { fetchBanners } from "@/api/banner.api";
import { fetchBestBooks, fetchBooks } from "@/api/books.api";
import { fetchReviewAll } from "@/api/review.api";
import { Banner } from "@/models/banner.model";
import { Book, BookReviewItem } from "@/models/book.model";
import { useEffect, useState } from "react";

export const useMain = () => {
    const [reviews, setReviews] = useState<BookReviewItem[]>([]);
    const [newBooks, setNewBooks] = useState<Book[]>([]);
    const [bestBooks, setBestBooks] = useState<Book[]>([]);
    const [banners, setBanners] = useState<Banner[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const [reviewsData, newBooksData, bestBooksData, bannersData] = await Promise.all([
                    fetchReviewAll(),
                    fetchBooks({
                        category_id: undefined,
                        news: true,
                        currentPage: 1,
                        limit: 4,
                    }),
                    fetchBestBooks(),
                    fetchBanners()
                ]);

                setReviews(reviewsData);
                setNewBooks(newBooksData.books);
                setBestBooks(bestBooksData);
                setBanners(bannersData);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('알 수 없는 오류가 발생했습니다.'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        // 컴포넌트 언마운트 시 정리
        return () => {
            setReviews([]);
            setNewBooks([]);
            setBestBooks([]);
            setBanners([]);
        };
    }, []);

    return { reviews, newBooks, bestBooks, banners, isLoading, error };
};