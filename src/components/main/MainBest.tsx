import { Book } from "@/models/book.model";
import styled from "styled-components";
import BookBestItem from "../books/BookBestItem";

interface Props {
  books: Book[];
}

function MainBest({ books }: Props) {
  if (!books || !Array.isArray(books)) {
    console.error("MainBest: books prop is not an array:", books);
    return null;
  }

  return (
    <MainBestStyle>
      {books.map((book, index) => (
        <BookBestItem key={book.id} book={book} itemIndex={index} />
      ))}
    </MainBestStyle>
  );
}

const MainBestStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
`;

export default MainBest;
