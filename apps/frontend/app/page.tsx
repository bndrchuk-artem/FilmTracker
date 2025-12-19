import { Box, Container, Typography, Button } from '@mui/material';
import { MovieFilter } from '@mui/icons-material';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          gap: 3,
        }}
      >
        <MovieFilter sx={{ fontSize: 80, color: 'primary.main' }} />
        <Typography variant="h2" component="h1" gutterBottom>
          Watchlist App
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600 }}>
          Управляй своїм особистим списком фільмів і серіалів. Шукай контент,
          додавай у watchlist та відстежуй статус перегляду.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button variant="contained" size="large">
            Почати
          </Button>
          <Button variant="outlined" size="large">
            Увійти
          </Button>
        </Box>
      </Box>
    </Container>
  );
}