'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Button,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { WatchlistItemComponent } from '@/components/watchlist/WatchlistItem';
import { watchlistService, WatchlistStats } from '@/services/watchlist.service';
import { moviesService } from '@/services/movies.service';
import { WatchlistItem, Media, WatchlistStatus } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

export default function WatchlistPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [mediaDetails, setMediaDetails] = useState<Map<string, Media>>(
    new Map(),
  );
  const [stats, setStats] = useState<WatchlistStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentTab, setCurrentTab] = useState<string>('all');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadWatchlist();
      loadStats();
    }
  }, [user, currentTab]);

  const loadWatchlist = async () => {
    setLoading(true);
    setError('');
    try {
      const status =
        currentTab === 'all' ? undefined : (currentTab as WatchlistStatus);
      const data = await watchlistService.getWatchlist(status);
      setItems(data);

      const details = new Map<string, Media>();
      await Promise.all(
        data.map(async (item) => {
          try {
            const media = await moviesService.getDetails(
              item.tmdbId,
              item.mediaType as 'movie' | 'tv',
            );
            details.set(item.id, media);
          } catch (err) {
            console.error(`Error loading media ${item.tmdbId}:`, err);
          }
        }),
      );
      setMediaDetails(details);
    } catch (err) {
      setError('Error loading watchlist');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const data = await watchlistService.getStats();
      setStats(data);
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  };

  const handleStatusChange = async (
    itemId: string,
    status: WatchlistStatus,
  ) => {
    try {
      await watchlistService.updateStatus(itemId, status);
      loadWatchlist();
      loadStats();
    } catch (err) {
      console.error(err);
      alert('Error updating status');
    }
  };

  const handleRemove = async (itemId: string) => {
    if (!confirm('Remove this item from watchlist?')) return;

    try {
      await watchlistService.removeFromWatchlist(itemId);
      loadWatchlist();
      loadStats();
    } catch (err) {
      console.error(err);
      alert('Error removing item');
    }
  };

  if (authLoading || !user) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              My Watchlist
            </Typography>
            {stats && (
              <Typography variant="body2" color="text.secondary">
                Total: {stats.total} | Watched: {stats.watched}
              </Typography>
            )}
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => router.push('/')}
          >
            Add Movie
          </Button>
        </Box>

        <Tabs
          value={currentTab}
          onChange={(_, value) => setCurrentTab(value)}
          sx={{ mb: 3 }}
        >
          <Tab label="All" value="all" />
          <Tab
            label={`Plan to Watch (${stats?.plan_to_watch || 0})`}
            value="plan_to_watch"
          />
          <Tab label={`Watching (${stats?.watching || 0})`} value="watching" />
          <Tab label={`Watched (${stats?.watched || 0})`} value="watched" />
          <Tab label={`Dropped (${stats?.dropped || 0})`} value="dropped" />
        </Tabs>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : items.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Your watchlist is empty
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => router.push('/')}
              sx={{ mt: 2 }}
            >
              Add your first movie
            </Button>
          </Box>
        ) : (
          <Box>
            {items.map((item) => {
              const media = mediaDetails.get(item.id);
              if (!media) return null;
              return (
                <WatchlistItemComponent
                  key={item.id}
                  item={item}
                  media={media}
                  onStatusChange={handleStatusChange}
                  onRemove={handleRemove}
                />
              );
            })}
          </Box>
        )}
      </Container>
    </>
  );
}