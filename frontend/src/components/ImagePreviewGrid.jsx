import React from 'react';

const ImagePreviewGrid = ({ images }) => (
  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
    {images.map((src, index) => (
      <img
        key={index}
        src={src}
        alt={`Preview ${index + 1}`}
        className="rounded-xl w-full max-h-60 object-cover"
      />
    ))}
  </div>
);

export default ImagePreviewGrid;