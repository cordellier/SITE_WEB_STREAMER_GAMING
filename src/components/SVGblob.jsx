import React from 'react';

const BlobImage = ({ imageSrc }) => {
  const uniqueId = React.useId();
  const clipPathId = `blob-clip-${uniqueId}`;

  return (
    <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id={clipPathId}>
          <path d="M60.6,-93.45C81.75,-82.95,104.1,-71.55,112.2,-53.7C120.45,-35.85,114.3,-11.55,108.9,11.1C103.5,33.9,98.85,55.05,86.1,71.1C73.35,87.15,52.5,97.95,30.9,103.05C9.3,108,-12.3,107.25,-34.2,100.65C-55.05,93.9,-74.25,81.75,-89.55,64.8C-104.85,47.85,-116.25,26.25,-117.75,3.45C-119.1,-19.35,-110.7,-43.35,-96.15,-61.95C-81.6,-80.55,-61.05,-93.75,-40.8,-97.8C-20.55,-102,-0.6,-96.9,19.35,-91.8C39.3,-86.7,39.45,-103.95,60.6,-93.45Z" transform="translate(150 150)" />
        </clipPath>
      </defs>
      <image 
        href={imageSrc} 
        width="100%" 
        height="100%" 
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${clipPathId})`}
      />
    </svg>
  );
};

export default BlobImage;