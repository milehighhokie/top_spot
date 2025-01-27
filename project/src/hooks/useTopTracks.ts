import { useState, useEffect } from 'react';
import { spotifyApi, getTimeRange } from '../lib/spotify';
import { Track, TimeRange } from '../types';

export function useTopTracks(timeRange: TimeRange, isAuthenticated: boolean) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchTracks = async () => {
      setLoading(true);
      try {
        const response = await spotifyApi.getMyTopTracks({
          limit: 20,
          time_range: getTimeRange(timeRange),
        });

        const formattedTracks: Track[] = response.body.items.map((item, index) => ({
          id: item.id,
          title: item.name,
          artist: item.artists[0].name,
          albumArt: item.album.images[0]?.url || '',
          rank: index + 1,
        }));

        setTracks(formattedTracks);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch tracks');
        console.error('Tracks Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [timeRange, isAuthenticated]);

  return { tracks, loading, error };
}