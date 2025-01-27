import SpotifyWebApi from 'spotify-web-api-node';

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const redirectUri = window.location.origin + '/callback';

if (!clientId || !clientSecret) {
  throw new Error('Missing required Spotify configuration. Please check your .env file.');
}

export const spotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret,
  redirectUri,
});

export const scopes = [
  'user-top-read',
  'user-read-private',
  'user-read-email',
];

export const getAuthUrl = () => {
  const state = Math.random().toString(36).substring(7);
  localStorage.setItem('spotify_auth_state', state);
  
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    state: state,
    scope: scopes.join(' '),
    show_dialog: 'true'
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const getTimeRange = (range: string): string => {
  switch (range) {
    case 'day':
    case 'week':
      return 'short_term';
    case 'month':
      return 'medium_term';
    case 'year':
    case 'all-time':
      return 'long_term';
    default:
      return 'medium_term';
  }
};