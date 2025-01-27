import React, { useState } from 'react';
import { Music } from 'lucide-react';
import { TimeRange } from './types';
import { TimeRangeSelector } from './components/TimeRangeSelector';
import { TrackCard } from './components/TrackCard';
import { useSpotifyAuth } from './hooks/useSpotifyAuth';
import { useTopTracks } from './hooks/useTopTracks';

function App() {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const { isAuthenticated, error: authError, login, loading: authLoading } = useSpotifyAuth();
  const { tracks, loading: tracksLoading, error: tracksError } = useTopTracks(timeRange, isAuthenticated);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white">Authenticating...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Music size={60} className="text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-6">Spotify Top Tracks</h1>
          <button
            onClick={login}
            className="bg-green-500 text-white px-8 py-3 rounded-full font-medium hover:bg-green-600 transition-colors"
          >
            Login with Spotify
          </button>
          {authError && (
            <p className="text-red-500 mt-4">{authError}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Music size={40} className="text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Spotify Top Tracks
          </h1>
          <p className="text-gray-400">
            Discover your most played tracks across different time periods
          </p>
        </header>

        <TimeRangeSelector
          selectedRange={timeRange}
          onRangeChange={setTimeRange}
        />

        {tracksLoading ? (
          <div className="text-center text-white">Loading tracks...</div>
        ) : tracksError ? (
          <div className="text-center text-red-500">{tracksError}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {tracks.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;