import React from 'react';
import { TimeRange } from '../types';

interface TimeRangeSelectorProps {
  selectedRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
}

const ranges: { value: TimeRange; label: string }[] = [
  { value: 'day', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
  { value: 'all-time', label: 'All Time' },
];

export function TimeRangeSelector({ selectedRange, onRangeChange }: TimeRangeSelectorProps) {
  return (
    <div className="flex space-x-2 mb-8">
      {ranges.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onRangeChange(value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all
            ${selectedRange === value
              ? 'bg-green-500 text-white shadow-lg scale-105'
              : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}