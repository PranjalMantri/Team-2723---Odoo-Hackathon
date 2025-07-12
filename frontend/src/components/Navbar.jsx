import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ item }) => (
  <header className="flex items-center justify-between border-b border-[#e8f2ec] px-10 py-4">
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#0e1a13]">
          <path
            d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
            fill="currentColor"
          />
        </svg>
        <h2 className="text-lg font-bold tracking-tight">ReWear</h2>
      </div>
      <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-[#0e1a13]">
        <Link to="/">Home</Link>
      </nav>
    </div>

    <div className="flex items-center gap-6">
      <div className="relative hidden sm:flex items-center bg-[#e8f2ec] rounded-xl px-3">
        <input
          type="text"
          placeholder="Search"
          className="bg-[#e8f2ec] text-sm px-2 py-1 outline-none text-[#0e1a13] placeholder:text-[#51946b]"
        />
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-[#51946b]" viewBox="0 0 256 256">
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
);

export default Navbar;
