import React, { useState, useEffect, useRef } from 'react';

interface TimeRangeSliderProps {
  min: number;
  max: number;
  onChange: (range: [number, number]) => void;
  initialRange?: [number, number];
}

const TimeRangeSlider: React.FC<TimeRangeSliderProps> = ({ min, max, onChange, initialRange }) => {
  const [minValue, setMinValue] = useState(initialRange ? initialRange[0] : min);
  const [maxValue, setMaxValue] = useState(initialRange ? initialRange[1] : max);

  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const rangeRef = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = (value: number) => Math.round(((value - min) / (max - min)) * 100);

  // Set width of the range between the thumbs
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minValue);
      const maxPercent = getPercent(+maxValRef.current.value); // '+' converts string to number
      if (rangeRef.current) {
        rangeRef.current.style.left = `${minPercent}%`;
        rangeRef.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minValue, getPercent]);

  // Set width of the range between the thumbs
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxValue);
      if (rangeRef.current) {
        rangeRef.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxValue, getPercent]);

  // Call onChange when either thumb is moved
  useEffect(() => {
    onChange([minValue, maxValue]);
  }, [minValue, maxValue, onChange]);

  return (
    <div className="relative h-10 flex items-center w-full">
      <input
        type="range"
        min={min}
        max={max}
        value={minValue}
        ref={minValRef}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const value = Math.min(+event.target.value, maxValue - 1);
          setMinValue(value);
          event.target.value = value.toString();
        }}
        className="thumb z-30 w-full absolute outline-none"
        style={{ zIndex: minValue > max - 100 ? '5' : '3' }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxValue}
        ref={maxValRef}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const value = Math.max(+event.target.value, minValue + 1);
          setMaxValue(value);
          event.target.value = value.toString();
        }}
        className="thumb z-40 w-full absolute outline-none"
      />

      <div className="relative w-full">
        <div className="absolute rounded-md h-2 bg-gray-200 w-full z-10" />
        <div ref={rangeRef} className="absolute rounded-md h-2 bg-blue-500 z-20" />
        <div className="absolute z-50 text-xs font-semibold text-gray-700 -mt-5 left-0">
            {minValue}
        </div>
        <div className="absolute z-50 text-xs font-semibold text-gray-700 -mt-5 right-0">
            {maxValue}
        </div>
      </div>
      <style jsx>{`
        .thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          -webkit-tap-highlight-color: transparent;
          background-color: #fff;
          border: 2px solid #3b82f6;
          border-radius: 50%;
          cursor: pointer;
          height: 18px;
          width: 18px;
          margin-top: 4px; /* For Chrome/Safari */
          pointer-events: all;
          position: relative;
        }

        .thumb::-moz-range-thumb {
          background-color: #fff;
          border: 2px solid #3b82f6;
          border-radius: 50%;
          cursor: pointer;
          height: 18px;
          width: 18px;
          margin-top: 4px; /* For Firefox */
          pointer-events: all;
          position: relative;
        }

        .thumb {
          pointer-events: none;
          -webkit-appearance: none;
          height: 0;
        }
      `}</style>
    </div>
  );
};

export default TimeRangeSlider;