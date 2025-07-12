import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import ItemImage from './ItemImage';
import ItemDetails from './ItemDetails';

const ItemDetailPage = ({ item }) => {
  if (!item) return <p className="text-center mt-10">Loading item...</p>;

  return (
    <div className="min-h-screen bg-[#f8fbfa] text-[#0e1a13] font-['Epilogue','Noto Sans',sans-serif]">
      <Navbar item={item} />
      <main className="flex flex-col lg:flex-row justify-center items-start gap-10 px-10 py-10">
        <ItemImage imageUrl={item.imageUrl} title={item.title} />
        <ItemDetails item={item} />
      </main>
    </div>
  );
};

export default ItemDetailPage;