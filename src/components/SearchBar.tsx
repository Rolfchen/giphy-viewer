import styled from '@emotion/styled';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';

const SearchBarContainer = styled.form`
  background: ${({ theme }) =>
    theme.palette.mode === 'dark'
      ? theme.palette.grey[900]
      : theme.palette.grey[100]};
  padding: ${({ theme }) => theme.spacing(1, 2)};
  display: grid;
  grid-template-columns: 1fr auto;
  border-radius: 4px;
`;

const SearchBarInput = styled.input`
  border: none;
  background: transparent;
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  color: ${({ theme }) => theme.palette.text.primary};
  &:focus {
    outline: none;
  }
`;

export interface ISearchBarProps {
  className?: string;
  /**
   * note that this is not a controlled element. This just sets the initial value
   * that goes inside the search bar.
   */
  initialSearchTerm?: string;
  placeholder?: string;
  ariaLabel?: string;
  onSearch?: (searchTerm?: string) => void;
}

/**
 * Typical search bar control. Consists of an input and submit button inside a form.
 */
const SearchBar = ({
  className,
  initialSearchTerm = '',
  placeholder,
  ariaLabel,
  onSearch,
}: ISearchBarProps) => {
  const [inputText, setInputText] = useState<string>(initialSearchTerm);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputText(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch?.(inputText);
  };

  return (
    <SearchBarContainer className={className} onSubmit={handleSubmit}>
      <SearchBarInput
        type="text"
        aria-label={ariaLabel || 'Search Bar'}
        value={inputText}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <Button type="submit">
        <SearchIcon />
        Search
      </Button>
    </SearchBarContainer>
  );
};

export default SearchBar;
