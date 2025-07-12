import React from 'react';
import { Link } from 'react-router-dom';

const UserProfile = ({ user }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-50 text-slate-800 font-sans px-4 sm:px-6 lg:px-8">
      <header className="flex items-center justify-between border-b border-emerald-100 py-4">
        <div className="flex items-center gap-3">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-emerald-600"
          >
            <path
              d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
              fill="currentColor"
            />
          </svg>
          <h2 className="text-lg font-bold tracking-tight text-emerald-600">ReWear</h2>
        </div>
        <Link to="/" className="text-sm font-medium text-emerald-600 hover:underline">
          Home
        </Link>
      </header>

      <main className="py-10 max-w-5xl mx-auto">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center space-y-2 mb-10">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-emerald-100"
          />
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-emerald-600">@{user.username}</p>
          <p className="text-emerald-600">Joined {user.joinedYear}</p>
          <button className="mt-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full font-semibold hover:bg-emerald-200">
            Edit Profile
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center mb-10">
          <div>
            <p className="text-2xl font-bold">{user.points}</p>
            <p className="text-emerald-600">Points</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{user.uploaded}</p>
            <p className="text-emerald-600">Items Uploaded</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{user.swaps}</p>
            <p className="text-emerald-600">Swaps Completed</p>
          </div>
        </div>

        {/* Listings */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">My Listings</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {user.items.map((item, index) => (
              <img
                key={index}
                src={item.image}
                alt={item.title}
                className="rounded-xl aspect-[3/4] object-cover border border-emerald-100"
              />
            ))}
          </div>
        </section>

        {/* Ongoing Swaps */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Ongoing Swaps</h2>
          {user.ongoingSwaps.map((swap, index) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <p className="text-emerald-600 text-sm">Swap with {swap.name}</p>
                <p className="font-semibold">{swap.details}</p>
                <p className="text-sm text-emerald-600">Status: {swap.status}</p>
              </div>
              <img
                src={swap.image}
                className="rounded-xl w-48 h-28 object-cover border border-emerald-100"
                alt={swap.name}
              />
            </div>
          ))}
        </section>

        {/* Completed Swaps */}
        <section>
          <h2 className="text-xl font-bold mb-4">Completed Swaps</h2>
          {user.completedSwaps.map((swap, index) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <p className="text-emerald-600 text-sm">Swap with {swap.name}</p>
                <p className="font-semibold">{swap.details}</p>
                <p className="text-sm text-emerald-600">Completed on {swap.date}</p>
              </div>
              <img
                src={swap.image}
                className="rounded-xl w-48 h-28 object-cover border border-emerald-100"
                alt={swap.name}
              />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default UserProfile;
