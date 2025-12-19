'use client';

import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
} from '@mui/material';
import { Add, Star } from '@mui/icons-material';
import { Media } from '@/types';

interface MovieCardProps {
  media: Media;
  onAddToWatchlist?: () => void;
  loading?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  media,
  onAddToWatchlist,
  loading,
}) => {
  const title = 'title' in media ? media.title : media.name;
  const date = 'release_date' in media ? media.release_date : media.first_air_date;
  const year = date ? new Date(date).getFullYear() : 'N/A';
  
  const posterUrl = media.poster_path
    ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
    : '/placeholder-poster.png';

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={posterUrl}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" gutterBottom noWrap>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <Chip
            label={media.media_type === 'movie' ? 'Movie' : 'TV Show'}
            size="small"
            color="primary"
            variant="outlined"
          />
          <Chip label={year} size="small" />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Star sx={{ fontSize: 18, color: 'warning.main' }} />
          <Typography variant="body2" color="text.secondary">
            {media.vote_average.toFixed(1)}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {media.overview || 'No description available'}
        </Typography>
      </CardContent>
      {onAddToWatchlist && (
        <CardActions>
          <Button
            fullWidth
            variant="contained"
            startIcon={<Add />}
            onClick={onAddToWatchlist}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add to Watchlist'}
          </Button>
        </CardActions>
      )}
    </Card>
  );
};