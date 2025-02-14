import { Book, BookReviewItem } from "@/models/book.model";
import { HttpResponse, http } from "msw";
import { fakerKO as faker } from "@faker-js/faker";
import { ROUTES } from "../constants/routes";
import { BASE_URL } from "../api/http";

const generateMockBook = (id: number, categoryId: number): Book => ({
    id,
    title: faker.commerce.productName(),
    author: `${faker.person.lastName()}${faker.person.firstName()}`,
    price: faker.number.int({ min: 10000, max: 50000 }),
    img: faker.number.int({ min: 100, max: 200 }),
    category_id: categoryId,
    form: "종이책",
    isbn: faker.commerce.isbn(),
    summary: faker.lorem.paragraph(),
    detail: faker.lorem.paragraphs(6),
    pages: faker.number.int({ min: 100, max: 500 }),
    contents: faker.lorem.paragraphs(2),
    likes: faker.number.int({ min: 0, max: 100 }),
    pubDate: faker.date.past().toISOString(),
})

const generateMockBooks = (count: number, categoryId: number): Book[] => {
    return Array.from({ length: count }).map((_, index) => generateMockBook(index + 1, categoryId));
};

export const books = http.get(`${BASE_URL}${ROUTES.BOOKS}`, ({ request }) => {
    const url = new URL(request.url);
    const categoryId = url.searchParams.get("category_id");
    const isNew = url.searchParams.get("news") === "true";

    let mockBooks;

    if (categoryId) {
        mockBooks = generateMockBooks(8, Number(categoryId));
    } else {
        mockBooks = generateMockBooks(8, 0);
    }

    if (isNew) {
        // 최근 1개월 내의 책들만 필터링
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        mockBooks = mockBooks.filter(book => new Date(book.pubDate) >= oneMonthAgo);
    }

    return HttpResponse.json({
        books: mockBooks,
        pagination: {  // pagination 객체로 감싸기
            totalCount: 100,
            currentPage: Number(url.searchParams.get("currentPage")) || 1
        }
    });
});

// 개별 도서 상세 조회
export const bookGet = http.get(`${BASE_URL}${ROUTES.BOOKS}/:bookId`, ({ params }) => {
    const { bookId } = params
    const book = generateMockBook(Number(bookId), 0)

    return HttpResponse.json(book)
});

// 도서 리뷰 조회
export const bookReviewsGet = http.get(`${BASE_URL}${ROUTES.BOOKS}/:bookId/reviews`, () => {
    const reviews = Array.from({ length: faker.number.int({ min: 3, max: 10 }) }).map((_, index): BookReviewItem => ({
        id: index + 1,
        userName: `${faker.person.lastName()}${faker.person.firstName()}`,
        content: faker.lorem.paragraph(),
        createdAt: faker.date.recent().toISOString(),
        score: faker.number.int({ min: 1, max: 5 })
    }))

    return HttpResponse.json(reviews)
});


// 좋아요 추가
export const likeBook = http.post(`${BASE_URL}${ROUTES.LIKE}/:bookId`, () => {
    return HttpResponse.json({ message: "좋아요 추가됨" })
});

// 좋아요 삭제
export const unlikeBook = http.delete(`${BASE_URL}${ROUTES.LIKE}/:bookId`, () => {
    return HttpResponse.json({ message: "좋아요 삭제됨" })
});


