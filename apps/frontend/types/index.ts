// User types
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

// Watchlist types
export enum MediaType {
  MOVIE = 'movie',
  TV = 'tv',
}

export enum WatchlistStatus {
  PLAN_TO_WATCH = 'plan_to_watch',
  WATCHING = 'watching',
  WATCHED = 'watched',
  DROPPED = 'dropped',
}

export interface WatchlistItem {
  id: string;
  userId: string;
  tmdbId: number;
  mediaType: MediaType;
  status: WatchlistStatus;
  addedAt: string;
  updatedAt: string;
}

// Movie types
export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  voteAverage: number;
  genres: string[];
}

export interface TVShow {
  id: number;
  name: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  firstAirDate: string;
  voteAverage: number;
  genres: string[];
}

export type Media = Movie | TVShow;