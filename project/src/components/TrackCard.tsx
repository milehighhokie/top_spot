import React from 'react';
import { Music2 } from 'lucide-react';
import { Track } from '../types';

interface TrackCardProps {
  track: Track;
}

export function TrackCard({ track }: TrackCardProps) {
  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="aspect-square overflow-hidden">
        <img
          src={track.albumArt}
          alt={`${track.title} album art`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold">
        #{track.rank}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 truncate">{track.title}</h3>
        <div className="flex items-center text-gray-600 mt-1">
          <Music2 size={16} className="mr-1" />
          <p className="text-sm truncate">{track.artist}</p>
        </div>
      </div>
    </div>
  );
}