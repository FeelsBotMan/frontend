import styled from "styled-components";
import { FaSmileWink } from "react-icons/fa";
import { Link } from "react-router";
import Empty from "../common/Empty";
import { ROUTES } from "@/constants/routes";

function BooksEmpty() {
  return (
    <BooksEmptyStyle>
      <Empty
        icon={<FaSmileWink />}
        title="검색 결과가 없습니다."
        description={<Link to={ROUTES.BOOKS}> 전체 검색 결과로 이동</Link>}
      />
    </BooksEmptyStyle>
  );
}

const BooksEmptyStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 120px 0;

  .icon {
    svg {
      font-size: 4rem;
      fill: #ccc;
    }
  }
`;

export default BooksEmpty;
