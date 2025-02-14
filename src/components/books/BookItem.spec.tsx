import { render } from "@testing-library/react";
import BookItem from "@/components/books/BookItem";
import { BookStoreThemeProvider } from "@/context/themeContext";

const dummyBook = {
  id: 1,
  title: "책 제목",
  img: 5,
  category_id: 1,
  summary: "책 요약",
  author: "저자",
  price: 10000,
  likes: 100,
  form: "EPUB",
  isbn: "1234567890",
  detail: "책 상세 설명",
  pages: 100,
  contents: "책 목차",
  pubDate: "2024-01-01",
};

describe("BookItem", () => {
  it("renders", () => {
    const { getByText } = render(
      <BookStoreThemeProvider>
        <BookItem book={dummyBook} view="grid" />
      </BookStoreThemeProvider>
    );
    expect(getByText(dummyBook.title)).toBeInTheDocument();
    expect(getByText(dummyBook.summary)).toBeInTheDocument();
    expect(getByText(dummyBook.author)).toBeInTheDocument();
    expect(getByText(String(dummyBook.price))).toBeInTheDocument();
    expect(getByText(String(dummyBook.likes))).toBeInTheDocument();
  });
});
