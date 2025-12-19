'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Grid,
} from '@mui/material';
import { Header } from '@/components/layout/Header';
import { SearchBar } from '@/components/movies/SearchBar';
import { MovieCard } from '@/components/movies/MovieCard';
import { StatusDialog } from '@/components/watchlist/StatusDialog';
import { SuccessDialog } from '@/components/watchlist/SuccessDialog';
import { moviesService } from '@/services/movies.service';
import { watchlistService } from '@/services/watchlist.service';
import { Media, WatchlistStatus, MediaType, WatchlistItem } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useDebounce } from '@/hooks/useDebounce';

const statusLabels: Record<WatchlistStatus, string> = {
  [WatchlistStatus.PLAN_TO_WATCH]: 'Plan to Watch',
  [WatchlistStatus.WATCHING]: 'Watching',
  [WatchlistStatus.WATCHED]: 'Watched',
  [WatchlistStatus.DROPPED]: 'Dropped',
};

export default function Home() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Media[]>([]);
  const [trending, setTrending] = useState<Media[]>([]);
  const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [addingId, setAddingId] = useState<number | null>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [selectedStatusLabel, setSelectedStatusLabel] = useState('');

  useEffect(() => {
    loadTrending();
    if (user) {
      loadWatchlist();
    }
  }, [user]);

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      handleSearch(debouncedSearchQuery);
    } else {
      setSearchResults([]);
      setError('');
    }
  }, [debouncedSearchQuery]);

  const loadTrending = async () => {
    try {
      const data = await moviesService.getTrending();
      setTrending(data);
    } catch (err) {
      console.error('Error loading trending:', err);
    }
  };

  const loadWatchlist = async () => {
    try {
      const data = await watchlistService.getWatchlist();
      setWatchlistItems(data);
    } catch (err) {
      console.error('Error loading watchlist:', err);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

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

  const handleOpenStatusDialog = (media: Media) => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    setSelectedMedia(media);
    setStatusDialogOpen(true);
  };

  const handleStatusSelect = async (status: WatchlistStatus) => {
    if (!selectedMedia) return;

    setStatusDialogOpen(false);
    setAddingId(selectedMedia.id);

    try {
      await watchlistService.addToWatchlist(
        selectedMedia.id,
        selectedMedia.media_type as MediaType,
        status,
      );
      setSelectedStatusLabel(statusLabels[status]);
      setSuccessDialogOpen(true);
      loadWatchlist();
    } catch (err) {
      console.error(err);
      alert('Error adding. Item might already be in watchlist.');
    } finally {
      setAddingId(null);
    }
  };

  const handleChangeStatus = (media: Media) => {
    setSelectedMedia(media);
    setStatusDialogOpen(true);
  };

  const getWatchlistItem = (tmdbId: number, mediaType: string) => {
    return watchlistItems.find(
      (item) => item.tmdbId === tmdbId && item.mediaType === mediaType,
    );
  };

  const displayMedia = searchResults.length > 0 ? searchResults : trending;
  const isSearching = searchQuery.trim().length > 0;

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {isSearching && searchResults.length > 0
              ? 'Search Results'
              : 'Trending Now'}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {isSearching && loading
              ? 'Searching...'
              : 'Discover your next favorite movie or TV show'}
          </Typography>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            loading={loading}
          />
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
            {displayMedia.map((media) => {
              const watchlistItem = getWatchlistItem(
                media.id,
                media.media_type,
              );
              return (
                <Grid
                  key={media.id}
                  sx={{
                    width: { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' },
                    padding: 1.5,
                  }}
                >
                  <MovieCard
                    media={media}
                    onAddToWatchlist={
                      user && !watchlistItem
                        ? () => handleOpenStatusDialog(media)
                        : undefined
                    }
                    onChangeStatus={
                      user && watchlistItem
                        ? () => handleChangeStatus(media)
                        : undefined
                    }
                    loading={addingId === media.id}
                    isInWatchlist={!!watchlistItem}
                    currentStatus={watchlistItem?.status}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}

        {!loading && displayMedia.length === 0 && !error && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              {isSearching
                ? 'No results found'
                : 'Start searching to discover movies and TV shows'}
            </Typography>
          </Box>
        )}
      </Container>

      <StatusDialog
        open={statusDialogOpen}
        onClose={() => setStatusDialogOpen(false)}
        onSelect={handleStatusSelect}
        title="Add to Watchlist"
        currentStatus={
          selectedMedia
            ? getWatchlistItem(selectedMedia.id, selectedMedia.media_type)
                ?.status
            : undefined
        }
      />

      <SuccessDialog
        open={successDialogOpen}
        onClose={() => setSuccessDialogOpen(false)}
        statusLabel={selectedStatusLabel}
      />
    </>
  );
}