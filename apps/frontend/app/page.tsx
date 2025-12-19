'use client';

import { Box, Container, Typography, Button } from '@mui/material';
import { MovieFilter, Search, List } from '@mui/icons-material';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Box
          sx={{
            minHeight: 'calc(100vh - 64px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            gap: 4,
            py: 8,
          }}
        >
          <MovieFilter sx={{ fontSize: 100, color: 'primary.main' }} />
          <Typography variant="h2" component="h1" gutterBottom>
            Watchlist App
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 700 }}
          >
            Manage your personal list of movies and TV shows. Search for content,
            add to your watchlist, and track viewing status.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              mt: 2,
            }}
          >
            {user ? (
              <>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<List />}
                  component={Link}
                  href="/watchlist"
                >
                  My Watchlist
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Search />}
                  component={Link}
                  href="/"
                >
                  Search Movies
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  href="/register"
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  href="/login"
                >
                  Sign In
                </Button>
              </>
            )}
          </Box>

          <Box sx={{ mt: 6, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <Box sx={{ textAlign: 'center', maxWidth: 200 }}>
              <Search sx={{ fontSize: 50, color: 'primary.main', mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Search
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Find movies and TV shows via TMDB
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', maxWidth: 200 }}>
              <List sx={{ fontSize: 50, color: 'primary.main', mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Organize
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Add to watchlist with different statuses
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', maxWidth: 200 }}>
              <MovieFilter
                sx={{ fontSize: 50, color: 'primary.main', mb: 1 }}
              />
              <Typography variant="h6" gutterBottom>
                Track
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage viewing status of your content
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}