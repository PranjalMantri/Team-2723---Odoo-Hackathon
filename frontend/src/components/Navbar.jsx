import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ item }) => (
  <header className="flex items-center justify-between border-b border-[#e8f2ec] px-10 py-4">
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-bold tracking-tight text-emerald-600">ReWear</h2>
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
