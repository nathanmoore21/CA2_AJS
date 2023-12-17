export interface MyAuthContext {
  signIn: (token: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}
export interface LoginFormType {
  email?: string;
  password?: string;
}
export interface RegisterFormType {
  full_name?: string;
  email?: string;
  password?: string;
}
export interface TrackType {
  title: string;
  album: string | null;
  rating: number;
  artist: string | null;
}
export interface AlbumType {
  title: string;
  description: string;
  song_count: number;
  tracks: string | null;
  genres: string | null;
}
export interface GenreType {
  name: string;
  description: string;
  albums: string | null;
}
export interface ArtistType {
  name: string;
  record_label: string;
  date_of_birth: string;
  tracks: string | null;
}
