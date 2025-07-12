import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [myItems, setMyItems] = useState([]);
  const [swapsCompleted, setSwapsCompleted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, itemsRes, swapsRes] = await Promise.all([
          axios.get("http://localhost:3000/api/auth/me", {
            withCredentials: true,
          }),
          axios.get("http://localhost:3000/api/items/my-items", {
            withCredentials: true,
          }),
          axios.get("http://localhost:3000/api/auth/me/swap-count", {
            withCredentials: true,
          }),
        ]);

        console.log("Swaps Completed Response:", swapsRes.data);
        setUserProfile(profileRes.data);
        setMyItems(itemsRes.data || []);
        setSwapsCompleted(swapsRes.data.totalSwaps);
      } catch (err) {
        setError("Failed to fetch user data.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-50 text-slate-800">
        Loading user profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-50 text-red-600">
        {error}
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-50 text-slate-800">
        No user profile data available.
      </div>
    );
  }

  const user = userProfile;

  // Function to format the date
  const formatJoinedDate = (dateString) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long" };
    return date.toLocaleDateString("en-US", options);
  };

  // Ensure myItems[0] and its properties exist before accessing
  if (myItems.length > 0 && myItems[0].imageUrls) {
    console.log("User Items Data:", myItems[0].imageUrls[0]);
  } else {
    console.log("No items or item imageUrls found.");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-50 text-slate-800 font-sans px-4 sm:px-6 lg:px-8">
      <header className="flex items-center justify-between border-b border-emerald-100 py-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold tracking-tight text-emerald-600">
            ReWear
          </h2>
        </div>
        <Link
          to="/"
          className="text-sm font-medium text-emerald-600 hover:underline"
        >
          Home
        </Link>
      </header>

      <main className="py-10 max-w-5xl mx-auto">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center space-y-2 mb-10">
          <img
            src={user.user.profilePicture}
            alt={user.user.fullName}
            className="w-32 h-32 rounded-full object-cover border-4 border-emerald-100"
          />
          <h1 className="text-2xl font-bold">{user.user.fullName}</h1>
          <p className="text-emerald-600">
            @
            {user.user.username ||
              user.user.fullName.toLowerCase().replace(/\s/g, "")}
          </p>{" "}
          {/* Added fallback for username */}
          <p className="text-black-600">
            Joined {formatJoinedDate(user.user.createdAt)}{" "}
            {/* Prettified here */}
          </p>
          {/* <button className="mt-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full font-semibold hover:bg-emerald-200">
            Edit Profile
          </button> */}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center mb-10">
          <div>
            <p className="text-2xl font-bold">{user.user.points}</p>
            <p className="text-emerald-600">Points</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{myItems.length}</p>
            <p className="text-emerald-600">Items Uploaded</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{swapsCompleted}</p>
            <p className="text-emerald-600">Swaps Completed</p>
          </div>
        </div>

        {/* Listings */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">My Listings</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {myItems.length === 0 ? (
              <p className="col-span-4 text-center text-gray-500">
                No items found
              </p>
            ) : (
              myItems.map((item, index) => (
                <Link to={`/item/${item._id}`} key={item._id || index}>
                  {" "}
                  {/* Link to item detail page */}
                  <img
                    src={item.imageUrls[0]}
                    alt={item.title}
                    className="rounded-xl aspect-[3/4] object-cover border border-emerald-100"
                  />
                </Link>
              ))
            )}
          </div>
        </section>

        {/* Ongoing Swaps */}
        {/* <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Ongoing Swaps</h2>
          {user.ongoingSwaps && user.ongoingSwaps.length === 0 ? (
            <p className="text-center text-gray-500">No ongoing swaps.</p>
          ) : (
            user.ongoingSwaps &&
            user.ongoingSwaps.map((swap, index) => (
              <div key={index} className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                  <p className="text-emerald-600 text-sm">
                    Swap with {swap.name}
                  </p>
                  <p className="font-semibold">{swap.details}</p>
                  <p className="text-sm text-emerald-600">
                    Status: {swap.status}
                  </p>
                </div>
                <img
                  src={swap.image}
                  className="rounded-xl w-48 h-28 object-cover border border-emerald-100"
                  alt={swap.name}
                />
              </div>
            ))
          )}
        </section> */}

        {/* Completed Swaps */}
        {/* <section>
          <h2 className="text-xl font-bold mb-4">Completed Swaps</h2>
          {user.completedSwaps && user.completedSwaps.length === 0 ? (
            <p className="text-center text-gray-500">No completed swaps.</p>
          ) : (
            user.completedSwaps &&
            user.completedSwaps.map((swap, index) => (
              <div key={index} className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                  <p className="text-emerald-600 text-sm">
                    Swap with {swap.name}
                  </p>
                  <p className="font-semibold">{swap.details}</p>
                  <p className="text-sm text-emerald-600">
                    Completed on {swap.date}
                  </p>
                </div>
                <img
                  src={swap.image}
                  className="rounded-xl w-48 h-28 object-cover border border-emerald-100"
                  alt={swap.name}
                />
              </div>
            ))
          )}
        </section> */}
      </main>
    </div>
  );
};

export default UserProfile;
