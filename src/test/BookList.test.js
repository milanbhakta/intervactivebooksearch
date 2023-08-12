// tests/BookList.test.js
import React from 'react';
import { render } from '@testing-library/react';
import BookList from "./components/BookList/BookList";

describe('BookList Component', () => {
  const sampleBooks = [
    { title: 'Book 1', author: 'Author 1', rating: 4 },
    { title: 'Book 2', author: 'Author 2', rating: 3 },
  ];

  it('renders book titles and authors', () => {
    const { getByText } = render(<BookList books={sampleBooks} />);

    const book1Title = getByText('Book 1');
    const book1Author = getByText('Author 1');
    const book2Title = getByText('Book 2');
    const book2Author = getByText('Author 2');

    expect(book1Title).toBeInTheDocument();
    expect(book1Author).toBeInTheDocument();
    expect(book2Title).toBeInTheDocument();
    expect(book2Author).toBeInTheDocument();
  });

  it('displays ratings for books if available', () => {
    const { getByTestId } = render(<BookList books={sampleBooks} />);

    const book1Rating = getByTestId('book-rating-0');
    const book2Rating = getByTestId('book-rating-1');

    expect(book1Rating).toHaveTextContent('Rating: 4');
    expect(book2Rating).toHaveTextContent('Rating: 3');
  });

  it('does not display ratings if not available', () => {
    const booksWithoutRatings = [
      { title: 'Book 1', author: 'Author 1' },
      { title: 'Book 2', author: 'Author 2' },
    ];

    const { queryByTestId } = render(<BookList books={booksWithoutRatings} />);

    const book1Rating = queryByTestId('book-rating-0');
    const book2Rating = queryByTestId('book-rating-1');

    expect(book1Rating).toBeNull();
    expect(book2Rating).toBeNull();
  });
});

