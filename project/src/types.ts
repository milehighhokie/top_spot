export interface Track {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  rank: number;
}

export type TimeRange = 'day' | 'week' | 'month' | 'year' | 'all-time';