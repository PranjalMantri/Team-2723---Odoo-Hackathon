import React from 'react';
import { Link } from 'react-router-dom';

const ItemDetails = ({ item }) => (
  <div className="max-w-xl space-y-4">
    <h1 className="text-2xl font-bold">{item.title}</h1>
    <p className="text-base text-[#0e1a13]">{item.description}</p>

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

    <div className="pt-4 border-t border-[#e8f2ec]">
      <h3 className="text-lg font-bold">Availability</h3>
      <p className="pt-1">{item.availability}</p>
    </div>

    <div className="flex gap-4 pt-4">
      <button className="bg-[#39e079] text-[#0e1a13] font-semibold rounded-full px-6 py-2 hover:bg-[#32c36b] transition">
        Request Swap
      </button>
      <button className="bg-[#e8f2ec] text-[#0e1a13] font-semibold rounded-full px-6 py-2 hover:bg-[#d2e7dc] transition">
        Redeem with {item.redeemPoints || 50} points
      </button>
    </div>
  </div>
);

export default ItemDetails;
