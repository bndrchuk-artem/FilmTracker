'use client';

import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Search } from '@mui/icons-material';

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        gap: 2,
        maxWidth: 600,
        mx: 'auto',
      }}
    >
      <TextField
        fullWidth
        placeholder="Search movies and TV shows..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={loading}
        sx={{ bgcolor: 'background.paper' }}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={loading || !query.trim()}
        startIcon={<Search />}
      >
        Search
      </Button>
    </Box>
  );
};