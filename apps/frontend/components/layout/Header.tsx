'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import { MovieFilter, Logout } from '@mui/icons-material';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <MovieFilter sx={{ mr: 1, color: 'primary.main' }} />
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700,
            }}
          >
            FilmTracker
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {user ? (
              <>
                <Button color="inherit" component={Link} href="/watchlist">
                  My Watchlist
                </Button>
                <Button color="inherit" component={Link} href="/profile">
                  {user.name}
                </Button>
                <Button
                  color="inherit"
                  startIcon={<Logout />}
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} href="/login">
                  Log in
                </Button>
                <Button
                  variant="contained"
                  component={Link}
                  href="/register"
                >
                  Sign up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};