import Navbar from "./Navbar";
import { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchListings = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/items/in-review",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setListings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleApprove = async (itemId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/items/${itemId}/approve`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      console.log("Item approved:", data.message);
      setListings((prevListings) =>
        prevListings.filter((listing) => listing._id !== itemId)
      );
    } catch (error) {
      console.error("Error approving item:", error.message);
      setError(error.message);
    }
  };

  const handleReject = async (itemId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/items/${itemId}/reject`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to reject item");
      }

      const data = await response.json();
      console.log("Item rejected:", data.message);
      setListings((prevListings) =>
        prevListings.filter((listing) => listing._id !== itemId)
      );
    } catch (error) {
      console.error("Error rejecting item:", error.message);
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading listings...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#f8fbfa] overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <header>
          <Navbar />
        </header>

        <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 w-full">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <h1 className="text-[#51946b] tracking-light text-2xl md:text-[32px] font-bold leading-tight">
                  Pending Listings
                </h1>
                <p className="text-[#0e1a13] text-sm font-normal leading-normal">
                  Review and manage new clothing listings before they go live.
                </p>
              </div>
            </div>

            <div className="px-4 py-3 w-full overflow-x-auto">
              <div className="flex overflow-hidden rounded-lg border border-[#d1e6d9] bg-[#f8fbfa]">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="bg-[#f8fbfa]">
                      <th className="px-4 py-3 text-left text-[#0e1a13] text-sm font-medium leading-normal w-14">
                        Item
                      </th>
                      <th className="px-4 py-3 text-left text-[#0e1a13] text-sm font-medium leading-normal">
                        Description
                      </th>
                      <th className="px-4 py-3 text-left text-[#0e1a13] text-sm font-medium leading-normal">
                        User
                      </th>
                      <th className="px-4 py-3 text-left text-[#0e1a13] text-sm font-medium leading-normal">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-[#51946b] text-sm font-medium leading-normal w-60">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listings.length > 0 ? (
                      listings.map((listing) => (
                        <tr
                          key={listing._id}
                          className="border-t border-t-[#d1e6d9]"
                        >
                          <td className="h-[72px] px-4 py-2 text-sm font-normal leading-normal">
                            <div
                              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-20"
                              style={{
                                backgroundImage: `url('${listing.imageUrls[0]}')`,
                              }}
                            ></div>
                          </td>
                          <td className="h-[72px] px-4 py-2 text-[#0e1a13] text-sm font-normal leading-normal">
                            {listing.description}
                          </td>
                          <td className="h-[72px] px-4 py-2 text-[#0e1a13] text-sm font-normal leading-normal">
                            {listing.userId ? listing.userId.fullName : "N/A"}
                          </td>
                          <td className="h-[72px] px-4 py-2 text-[#0e1a13] text-sm font-normal leading-normal">
                            {new Date(listing.createdAt).toLocaleDateString()}
                          </td>
                          <td className="h-[72px] px-4 py-2 text-[#0e1a13] text-sm font-bold leading-normal tracking-[0.015em]">
                            <button
                              onClick={() => handleApprove(listing._id)}
                              className="mr-3 text-[#2e7d59] hover:text-[#1a5338] hover:underline"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(listing._id)}
                              className="text-[#c44545] hover:text-[#a33131] hover:underline"
                            >
                              Reject
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4">
                          No pending listings found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
