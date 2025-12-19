'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import { Close, CheckCircle } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
  statusLabel: string;
}

export const SuccessDialog: React.FC<SuccessDialogProps> = ({
  open,
  onClose,
  statusLabel,
}) => {
  const router = useRouter();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
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
      <DialogContent sx={{ textAlign: 'center', pt: 6, pb: 3 }}>
        <CheckCircle sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Added to Watchlist
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {statusLabel}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button
          variant="contained"
          onClick={() => {
            onClose();
            router.push('/watchlist');
          }}
          fullWidth
          sx={{ maxWidth: 200 }}
        >
          Go to Watchlist
        </Button>
      </DialogActions>
    </Dialog>
  );
};