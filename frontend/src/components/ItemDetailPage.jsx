import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Navbar from "./Navbar";
import ItemImage from "./ItemImage";
import ItemDetails from "./ItemDetails";

const ItemDetailPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItem = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/items/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setItem(data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchItem();
    }
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading item...</p>;
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">Error: {error.message}</p>
    );
  }

  if (!item) {
    return (
      <p className="text-center mt-10">Item not found or not available.</p>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fbfa] text-[#0e1a13] font-['Epilogue','Noto Sans',sans-serif]">
      <Navbar item={item} />
      <main className="flex flex-col lg:flex-row justify-center items-start gap-10 px-10 py-10">
        <ItemImage imageUrl={item.imageUrls[0]} title={item.title} />
        <ItemDetails item={item} />
      </main>
    </div>
  );
};

export default ItemDetailPage;
