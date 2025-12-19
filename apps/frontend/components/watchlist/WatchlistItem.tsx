'use client';

import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Button,
  Chip,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import {
  WatchlistItem as WatchlistItemType,
  Media,
  WatchlistStatus,
} from '@/types';

interface WatchlistItemProps {
  item: WatchlistItemType;
  media: Media;
  onStatusChange: (itemId: string, status: WatchlistStatus) => void;
  onRemove: (itemId: string) => void;
}

const statusConfig = {
  [WatchlistStatus.PLAN_TO_WATCH]: {
    label: 'Plan to Watch',
    color: '#2196f3',
  },
  [WatchlistStatus.WATCHING]: {
    label: 'Watching',
    color: '#ff9800',
  },
  [WatchlistStatus.WATCHED]: {
    label: 'Watched',
    color: '#4caf50',
  },
  [WatchlistStatus.DROPPED]: {
    label: 'Dropped',
    color: '#f44336',
  },
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
            <Box sx={{ flexGrow: 1 }}>
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
                  <Typography
                    variant="body2"
                    color="warning.main"
                    sx={{ fontWeight: 'bold' }}
                  >
                    ★
                  </Typography>
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

          <Box
            sx={{
              display: 'flex',
              gap: 1,
              mt: 2,
              flexWrap: 'wrap',
            }}
          >
            {Object.entries(statusConfig).map(([status, config]) => {
              const isActive = item.status === status;
              return (
                <Button
                  key={status}
                  size="small"
                  variant={isActive ? 'contained' : 'outlined'}
                  onClick={() =>
                    onStatusChange(item.id, status as WatchlistStatus)
                  }
                  sx={{
                    backgroundColor: isActive ? config.color : 'transparent',
                    borderColor: config.color,
                    color: isActive ? 'white' : config.color,
                    '&:hover': {
                      backgroundColor: isActive
                        ? config.color
                        : 'rgba(0,0,0,0.1)',
                      borderColor: config.color,
                    },
                    minWidth: 120,
                  }}
                >
                  {config.label}
                </Button>
              );
            })}
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};