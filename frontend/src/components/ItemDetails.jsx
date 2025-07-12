import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import toast from "react-hot-toast"; // Import toast for notifications

const ItemDetails = ({ item }) => {
  const [user, setUser] = useState(null);
  const [isRedeeming, setIsRedeeming] = useState(false); // New state for loading
  const [redemptionError, setRedemptionError] = useState(null); // New state for errors
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/auth/user/${item.userId._id}`,
        {
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
      return await response.json();
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const userData = await fetchUser();
      if (!userData) {
        console.error("Failed to fetch user data");
        return;
      }
      setUser(userData);
    };
    getUser();
  }, [item.userId._id]);

  const enableRequestSwap = item.listingType === "swap";
  const enableRedeem = item.listingType === "sell";

  const handleRedeemClick = async () => {
    if (!enableRedeem) {
      console.warn("Redeem action is not enabled for this item.");
      return;
    }

    setIsRedeeming(true);
    setRedemptionError(null);

    try {
      const redeemResponse = await fetch(
        `http://localhost:3000/api/redemptions/`,
        {
          body: JSON.stringify({
            itemId: item._id,
          }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
        }
      );

      if (!redeemResponse.ok) {
        const errorData = await redeemResponse.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${redeemResponse.status}`
        );
      }

      console.log("Redeem response:", redeemResponse);

      const redeemedItem = await redeemResponse.json();
      console.log("Item redeemed successfully:", redeemedItem);
      console.log("Item redeemed successfully:", redeemedItem.redemption._id);

      const url = `http://localhost:3000/api/redemptions/${redeemedItem.redemption._id}/complete`;

      console.log("url:", url);

      const completeResponse = await fetch(url, {
        method: "PUT", // Assuming a POST request for completion
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });

      if (!completeResponse.ok) {
        const errorData = await completeResponse.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${completeResponse.status}`
        );
      }

      navigate("/home");
    } catch (error) {
      setRedemptionError(error.message);
    } finally {
      setIsRedeeming(false);
    }
  };

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">{item.title}</h1>
      <p className="text-base text-[#0e1a13]">{item.description}</p>

      <div className="pt-4 border-t border-[#e8f2ec]">
        <h3 className="text-lg font-bold">Uploaded by</h3>
        <div className="flex items-center gap-4 mt-2">
          <img
            src={
              user?.profilePictureUrl ||
              "https://avatar.iran.liara.run/public/1"
            }
            alt={user?.user?.fullName || "User Avatar"}
            className="h-14 w-14 rounded-full object-cover"
          />
          <div>
            <Link
              to={`/profile/${item.uploader?.username}`}
              className="text-base font-medium hover:underline"
            >
              {user?.user?.fullName}
            </Link>
            <p className="text-sm text-[#51946b]">
              Joined {user?.user?.createdAt || "2025"}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-[#e8f2ec]">
        <h3 className="text-lg font-bold">Availability</h3>
        <p className="pt-1">{item.availability}</p>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          className="bg-[#39e079] text-[#0e1a13] font-semibold rounded-full px-6 py-2 transition
            disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#32c36b]"
          disabled={!enableRequestSwap}
        >
          Request Swap
        </button>
        <button
          className="bg-[#e8f2ec] text-[#0e1a13] font-semibold rounded-full px-6 py-2 transition
    disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#d2e7dc]"
          disabled={!enableRedeem || isRedeeming}
          onClick={handleRedeemClick}
        >
          {isRedeeming
            ? "Redeeming..."
            : !enableRedeem
            ? "Redeem"
            : `Redeem with ${item?.pointsCost} points`}
        </button>
      </div>
      {redemptionError && (
        <p className="text-red-500 mt-2">{redemptionError}</p>
      )}
    </div>
  );
};

export default ItemDetails;
