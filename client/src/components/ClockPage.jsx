import React, { useState, useEffect } from 'react';
import AnalogClock from './AnalogClock';
import Slider from './Slider';
import ShareButton from './ShareButton';

const ClockPage = () => {
  const getInitialSpeed = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('speed') ? parseInt(params.get('speed')) : 1000;
  };

  const [speed, setSpeed] = useState(getInitialSpeed);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('speed')) {
      setSpeed(parseInt(params.get('speed')));
    }
  }, []);

  const generateShareUrl = () => {
    const url = `${window.location.origin}${window.location.pathname}?speed=${speed}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('URL copied to clipboard');
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <AnalogClock speed={speed} />
      <Slider speed={speed} setSpeed={setSpeed} />
      <ShareButton generateShareUrl={generateShareUrl} />
    </div>
  );
};

export default ClockPage;
