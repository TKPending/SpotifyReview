export enum Favourites {
  ARTISTS = 0,
  SONGS = 1,
  RECENT = 2,
}

export enum GlobalValues {
  MIN_ARTISTS = 10,
  MAX_ARTISTS = 20,
  MIN_SONGS = 10,
  MAX_SONGS = 20,
  MIN_RECENT = 20,
  MAX_RECENT = 50,
}

export const sessionItemsToRemove: string[] = [
  "review_stored",
  "access_token",
  "code_verifier",
  "refresh_token",
];
