'use client';

import React from 'react';
import { Box, TextField, InputAdornment, CircularProgress } from '@mui/material';
import { Search } from '@mui/icons-material';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  loading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  loading,
}) => {
  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
      }}
    >
      <TextField
        fullWidth
        placeholder="Search movies and TV shows..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
        sx={{ bgcolor: 'background.paper' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: loading ? (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ) : null,
        }}
      />
    </Box>
  );
};