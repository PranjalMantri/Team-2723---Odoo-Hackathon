import React from 'react';

const ItemImage = ({ imageUrl, title }) => (
  <div className="max-w-sm w-full">
    <img
      src={imageUrl}
      alt={title}
      className="rounded-xl border border-[#e8f2ec] shadow-sm aspect-[2/3] object-cover"
    />
  </div>
);

export default ItemImage;
