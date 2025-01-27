import { useEffect, useState } from 'react';
import { spotifyApi, getAuthUrl } from '../lib/spotify';

export function useSpotifyAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authCode = params.get('code');
    const state = params.get('state');
    const storedState = localStorage.getItem('spotify_auth_state');
    const storedToken = localStorage.getItem('spotifyAccessToken');

    if (storedToken) {
      spotifyApi.setAccessToken(storedToken);
      setIsAuthenticated(true);
      return;
    }

    if (authCode) {
      if (state === null || state !== storedState) {
        setError('State mismatch! Please try again.');
        return;
      }

      localStorage.removeItem('spotify_auth_state');
      setLoading(true);

      const tokenEndpoint = 'https://accounts.spotify.com/api/token';
      const redirectUri = window.location.origin + '/callback';

      const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: authCode,
        redirect_uri: redirectUri
      });

      fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(`${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`)}`
        },
        body: body
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => {
            throw new Error(data.error_description || `HTTP error! status: ${response.status}`);
          });
        }
        return response.json();
      })
      .then(data => {
        const { access_token, refresh_token } = data;
        spotifyApi.setAccessToken(access_token);
        if (refresh_token) {
          spotifyApi.setRefreshToken(refresh_token);
        }
        localStorage.setItem('spotifyAccessToken', access_token);
        setIsAuthenticated(true);
        window.history.replaceState({}, document.title, '/');
      })
      .catch(err => {
        console.error('Auth Error:', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
    }
  }, []);

  const login = () => {
    localStorage.removeItem('spotifyAccessToken');
    setIsAuthenticated(false);
    window.location.href = getAuthUrl();
  };

  return { isAuthenticated, error, loading, login };
}