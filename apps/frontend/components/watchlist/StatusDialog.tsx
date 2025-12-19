'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { WatchlistStatus } from '@/types';

interface StatusDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (status: WatchlistStatus) => void;
  title?: string;
  currentStatus?: WatchlistStatus;
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

export const StatusDialog: React.FC<StatusDialogProps> = ({
  open,
  onClose,
  onSelect,
  title = 'Select Status',
  currentStatus,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {Object.entries(statusConfig).map(([status, config]) => (
            <Button
              key={status}
              variant={currentStatus === status ? 'contained' : 'outlined'}
              onClick={() => onSelect(status as WatchlistStatus)}
              sx={{
                backgroundColor:
                  currentStatus === status ? config.color : 'transparent',
                borderColor: config.color,
                color: currentStatus === status ? 'white' : config.color,
                '&:hover': {
                  backgroundColor:
                    currentStatus === status ? config.color : 'rgba(0,0,0,0.1)',
                  borderColor: config.color,
                },
              }}
            >
              {config.label}
            </Button>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};