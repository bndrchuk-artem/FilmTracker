export interface TmdbMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  media_type?: string;
}

export interface TmdbTVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
  media_type?: string;
}

export type TmdbMedia = TmdbMovie | TmdbTVShow;

export interface TmdbSearchResponse {
  page: number;
  results: TmdbMedia[];
  total_pages: number;
  total_results: number;
}

export interface TmdbMovieDetails extends TmdbMovie {
  genres: { id: number; name: string }[];
  runtime: number;
  status: string;
  tagline: string;
}

export interface TmdbTVShowDetails extends TmdbTVShow {
  genres: { id: number; name: string }[];
  number_of_seasons: number;
  number_of_episodes: number;
  status: string;
  tagline: string;
}
