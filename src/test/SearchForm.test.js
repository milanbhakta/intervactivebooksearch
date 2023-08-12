import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchForm from "../SearchForm/SearchForm";


test('renders search form', () => {
  const { getByLabelText, getByText } = render(<SearchForm />);
  
  const searchInput = getByLabelText('searchText');
  const searchButton = getByText('searchText');
  
  expect(searchInput).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
});

test('calls the search function on submit', () => {
  const mockSearch = jest.fn();
  const { getByLabelText, getByText } = render(<SearchForm onSearch={mockSearch} />);
  
  const searchInput = getByLabelText('searchText');
  const searchButton = getByText('searchText');
  
  fireEvent.change(searchInput, { target: { value: 'Harry Potter' } });
  fireEvent.click(searchButton);
  
  expect(mockSearch).toHaveBeenCalledWith('Harry Potter');
});
