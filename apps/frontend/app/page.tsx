'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Header } from '@/components/layout/Header';
import { SearchBar } from '@/components/movies/SearchBar';
import { MovieCard } from '@/components/movies/MovieCard';
import { moviesService } from '@/services/movies.service';
import { watchlistService } from '@/services/watchlist.service';
import { Media, WatchlistStatus, MediaType } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const [searchResults, setSearchResults] = useState<Media[]>([]);
  const [trending, setTrending] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [addingId, setAddingId] = useState<number | null>(null);

  useEffect(() => {
    loadTrending();
  }, []);

  const loadTrending = async () => {
    try {
      const data = await moviesService.getTrending();
      setTrending(data);
    } catch (err) {
      console.error('Error loading trending:', err);
    }
  };

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError('');
    try {
      const data = await moviesService.search(query);
      setSearchResults(data.results);
      if (data.results.length === 0) {
        setError('No results found. Try a different search.');
      }
    } catch (err) {
      setError('Search error. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWatchlist = async (media: Media) => {
    if (!user) {
      window.location.href = '/login';
      return;
    }

    setAddingId(media.id);
    try {
      await watchlistService.addToWatchlist(
        media.id,
        media.media_type as MediaType,
        WatchlistStatus.PLAN_TO_WATCH,
      );
      alert('Added to watchlist!');
    } catch (err) {
      console.error(err);
      alert('Error adding. Item might already be in watchlist.');
    } finally {
      setAddingId(null);
    }
  };

  const displayMedia = searchResults.length > 0 ? searchResults : trending;

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {searchResults.length > 0 ? 'Search Results' : 'Trending Now'}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Discover your next favorite movie or TV show
          </Typography>
          <SearchBar onSearch={handleSearch} loading={loading} />
        </Box>

        {error && (
          <Alert severity="info" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={0}>
            {displayMedia.map((media) => (
              <Grid key={media.id}
                sx={{ 
                  width: { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' },
                  padding: 1
                }}>
                <MovieCard
                  media={media}
                  onAddToWatchlist={
                    user ? () => handleAddToWatchlist(media) : undefined
                  }
                  loading={addingId === media.id}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {!loading && displayMedia.length === 0 && !error && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              Start searching to discover movies and TV shows
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
}