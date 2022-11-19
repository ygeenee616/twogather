import styled from "styled-components";

function Pagination({ total, currentPage, url }) {
  //total: totalpage수, currentPage: 현재 페이지(querystring)
  return (
    <>
      <Nav>
        <Button
          onClick={() =>
            window.location.replace(`${url}&page=${currentPage - 1}`)
          }
          disabled={currentPage === 1}
        >
          &lt;
        </Button>
        {Array(total)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => window.location.replace(`${url}&page=${i + 1}`)}
              aria-current={currentPage === i + 1 ? "page" : null}
            >
              {i + 1}
            </Button>
          ))}
        <Button
          onClick={() =>
            window.location.replace(`${url}&page=${currentPage + 1}`)
          }
          disabled={currentPage === total}
        >
          &gt;
        </Button>
      </Nav>
    </>
  );
}

function PaginationInLocal({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </Button>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 5vh 0;
`;

const Button = styled.button`
  border: none;
  border-radius: 50%;
  width: 3vw;
  height: 3vw;
  margin: 0;
  font-size: 1rem;
  background-color: white;

  &:hover {
    background: #f2f2f2;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: white;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: #8daef2;
    font-weight: bold;
    color: white;
    cursor: revert;
    transform: revert;
  }
`;

export { PaginationInLocal };
export default Pagination;
