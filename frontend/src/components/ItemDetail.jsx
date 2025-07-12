import React from 'react';
import { Link } from 'react-router-dom';

const ItemDetailPage = ({ item }) => {
  if (!item) return <p className="text-center mt-10">Loading item...</p>;

  return (
    <div className="min-h-screen bg-[#f8fbfa] text-[#0e1a13] font-['Epilogue','Noto Sans',sans-serif]">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#e8f2ec] px-10 py-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold tracking-tight text-emerald-600">ReWear</h2>

          </div>

          {/* Navigation Links */}
          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-[#0e1a13]">
            <Link to="/">Home</Link>
          </nav>
        </div>

        {/* Profile & Search */}
        <div className="flex items-center gap-6">
          <div className="relative hidden sm:flex items-center bg-[#e8f2ec] rounded-xl px-3">
            <input
              type="text"
              placeholder="Search"
              className="bg-[#e8f2ec] text-sm px-2 py-1 outline-none text-[#0e1a13] placeholder:text-[#51946b]"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="text-[#51946b]"
              viewBox="0 0 256 256"
            >
              <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
            </svg>
          </div>

          <Link to={`/profile/${item.uploader?.username}`}>
            <img
              src={item.uploader?.profileImage || 'https://i.pravatar.cc/300'}
              alt="Profile"
              className="w-10 h-10 rounded-full border border-emerald-300 object-cover"
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col lg:flex-row justify-center items-start gap-10 px-10 py-10">
        {/* Image */}
        <div className="max-w-sm w-full">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="rounded-xl border border-[#e8f2ec] shadow-sm aspect-[2/3] object-cover"
          />
        </div>

        {/* Details */}
        <div className="max-w-xl space-y-4">
          <h1 className="text-2xl font-bold">{item.title}</h1>
          <p className="text-base text-[#0e1a13]">{item.description}</p>

          {/* Uploader Info */}
          <div className="pt-4 border-t border-[#e8f2ec]">
            <h3 className="text-lg font-bold">Uploaded by</h3>
            <div className="flex items-center gap-4 mt-2">
              <img
                src={item.uploader?.profileImage || 'https://i.pravatar.cc/150'}
                alt={item.uploader?.name}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <Link
                  to={`/profile/${item.uploader?.username}`}
                  className="text-base font-medium hover:underline"
                >
                  {item.uploader?.name}
                </Link>
                <p className="text-sm text-[#51946b]">Joined {item.uploader?.joinedYear || '2021'}</p>
              </div>
            </div>
          </div>

         

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button className="bg-[#39e079] text-[#0e1a13] font-semibold rounded-full px-6 py-2 hover:bg-[#32c36b] transition">
              Request Swap
            </button>
            <button className="bg-[#e8f2ec] text-[#0e1a13] font-semibold rounded-full px-6 py-2 hover:bg-[#d2e7dc] transition">
              Redeem with {item.redeemPoints || 50} points
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ItemDetailPage;
