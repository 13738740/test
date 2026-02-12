import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState('');
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearch must be used within a SearchProvider');
  return ctx;
};

export default SearchContext;
