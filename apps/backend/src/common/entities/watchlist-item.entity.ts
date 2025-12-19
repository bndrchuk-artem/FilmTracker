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

export class WatchlistItem {
  id: string;
  userId: string;
  tmdbId: number;
  mediaType: MediaType;
  status: WatchlistStatus;
  addedAt: Date;
  updatedAt: Date;
}
