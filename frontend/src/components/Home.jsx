import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [userLoading, setUserLoading] = useState(true);

  // Fetches items based on current page, limit, and search query
  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3000/api/items/", {
        params: {
          page,
          limit,
          search: searchQuery,
        },
      });
      setItems(response.data.items);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error("Error fetching items:", err);
      setError("Failed to fetch items. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [page, limit, searchQuery]);

  // Fetches user data to determine if the user is an admin
  const fetchUser = useCallback(async () => {
    setUserLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/auth/me", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      console.log("User data fetched:", response.data);
      setIsAdmin(response.data.user.isAdmin);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setIsAdmin(false);
    } finally {
      setUserLoading(false);
    }
  }, []);

  // Effect hook to fetch items when dependencies change
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Effect hook to fetch user data on component mount
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Handles changes in the search input field
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  // Displays loading state
  if (loading || userLoading) {
    return (
      <>
        <Navbar
          item={{}} // Placeholder, adjust if Navbar needs actual item props
          onSearchChange={handleSearchChange}
          searchQuery={searchQuery}
        />
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  // Displays error state
  if (error) {
    return (
      <>
        <Navbar
          item={{}} // Placeholder, adjust if Navbar needs actual item props
          onSearchChange={handleSearchChange}
          searchQuery={searchQuery}
        />
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-500">{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar
        item={{}} // Placeholder, adjust if Navbar needs actual item props
        onSearchChange={handleSearchChange}
        searchQuery={searchQuery}
      />
      <div className="container mx-auto px-4 py-8">
        {/* Button section: "List Your Product" on left, "Admin Dashboard" on right */}
        <div className="flex items-center mb-8">
          <Link to="/list-product">
            <button className="px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors duration-200 text-lg font-medium shadow-md">
              List Your Product
            </button>
          </Link>
          {isAdmin && (
            <Link to="/admin" className="ml-auto">
              <button className="px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors duration-200 text-lg font-medium shadow-md">
                View Admin Dashboard
              </button>
            </Link>
          )}
        </div>

        {/* Display message if no items are found */}
        {items.length === 0 ? (
          <p className="text-center text-gray-600">
            No items found matching your criteria.
          </p>
        ) : (
          // Grid display for items
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <Link to={`/item/${item._id}`} key={item._id} className="block">
                <div className="border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                  <img
                    src={item.imageUrls[0] || "https://via.placeholder.com/300"}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Condition: {item.condition} | Size: {item.size}
                    </p>
                    <p className="text-sm text-gray-700">
                      Uploaded by: {item.userId?.fullName || "N/A"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-emerald-500 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-lg">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-emerald-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
