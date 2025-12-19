'use client';

import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Select,
  MenuItem,
  FormControl,
  Chip,
} from '@mui/material';
import { Delete, Star } from '@mui/icons-material';
import { WatchlistItem as WatchlistItemType, Media, WatchlistStatus } from '@/types';

interface WatchlistItemProps {
  item: WatchlistItemType;
  media: Media;
  onStatusChange: (itemId: string, status: WatchlistStatus) => void;
  onRemove: (itemId: string) => void;
}

const statusLabels: Record<WatchlistStatus, string> = {
  [WatchlistStatus.PLAN_TO_WATCH]: 'Plan to Watch',
  [WatchlistStatus.WATCHING]: 'Watching',
  [WatchlistStatus.WATCHED]: 'Watched',
  [WatchlistStatus.DROPPED]: 'Dropped',
};

export const WatchlistItemComponent: React.FC<WatchlistItemProps> = ({
  item,
  media,
  onStatusChange,
  onRemove,
}) => {
  const title = 'title' in media ? media.title : media.name;
  const posterUrl = media.poster_path
    ? `https://image.tmdb.org/t/p/w200${media.poster_path}`
    : '/placeholder-poster.png';

  return (
    <Card sx={{ display: 'flex', mb: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 120 }}
        image={posterUrl}
        alt={title}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
            }}
          >
            <Box>
              <Typography component="div" variant="h6">
                {title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1, mb: 1 }}>
                <Chip
                  label={item.mediaType === 'movie' ? 'Movie' : 'TV Show'}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Star sx={{ fontSize: 16, color: 'warning.main' }} />
                  <Typography variant="body2" color="text.secondary">
                    {media.vote_average.toFixed(1)}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Added: {new Date(item.addedAt).toLocaleDateString('en-US')}
              </Typography>
            </Box>
            <IconButton
              aria-label="delete"
              onClick={() => onRemove(item.id)}
              color="error"
            >
              <Delete />
            </IconButton>
          </Box>

          <FormControl size="small" sx={{ mt: 2, minWidth: 200 }}>
            <Select
              value={item.status}
              onChange={(e) =>
                onStatusChange(item.id, e.target.value as WatchlistStatus)
              }
            >
              {Object.entries(statusLabels).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Box>
    </Card>
  );
};