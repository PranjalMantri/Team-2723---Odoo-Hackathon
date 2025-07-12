import React, { useState } from 'react';

const ListItemForm = () => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [listingType, setListingType] = useState('');
  const [points, setPoints] = useState('');

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    const previews = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        if (previews.length === files.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

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
          <h2 className="text-lg font-bold">ReWear</h2>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium">Explore</a>
          <a href="#" className="text-sm font-medium">How it works</a>
          <a href="#" className="text-sm font-medium">Community</a>
          <button className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216Z" />
            </svg>
          </button>
        </div>
      </header>

      <main className="flex justify-center py-10">
        <form className="w-full max-w-4xl space-y-6 bg-white/80 p-8 rounded-2xl shadow-sm">
          <h1 className="text-2xl font-bold mb-4">List an Item</h1>

          <div className="block">
            <span className="text-base font-medium text-slate-800">Upload Images (max 5)</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="mt-2 block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              {imagePreviews.map((src, index) => (
                <img key={index} src={src} alt={`Preview ${index + 1}`} className="rounded-xl w-full max-h-60 object-cover" />
              ))}
            </div>
          </div>

          {[{ label: 'Title', type: 'text', placeholder: 'e.g. Summer dress' }, { label: 'Description', type: 'textarea', placeholder: 'Describe your item' }, { label: 'Tags', type: 'text', placeholder: 'e.g. summer, dress, floral' }].map(({ label, type, placeholder }) => (
            <label key={label} className="block">
              <span className="text-base font-medium text-slate-800">{label}</span>
              {type === 'textarea' ? (
                <textarea
                  placeholder={placeholder}
                  className="mt-2 w-full p-3 rounded-xl border border-emerald-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                />
              ) : (
                <input
                  type="text"
                  placeholder={placeholder}
                  className="mt-2 w-full p-3 rounded-xl border border-emerald-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                />
              )}
            </label>
          ))}

          <div className="grid md:grid-cols-2 gap-6">
            {['Category', 'Type', 'Size', 'Condition'].map((label) => (
              <label key={label} className="block">
                <span className="text-base font-medium text-slate-800">{label}</span>
                <select className="mt-2 w-full p-3 rounded-xl border border-emerald-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-300">
                  <option value="">Select {label.toLowerCase()}</option>
                  <option value="two">Option 1</option>
                  <option value="three">Option 2</option>
                </select>
              </label>
            ))}

            <label className="block">
              <span className="text-base font-medium text-slate-800">Listing Type</span>
              <select
                value={listingType}
                onChange={(e) => setListingType(e.target.value)}
                className="mt-2 w-full p-3 rounded-xl border border-emerald-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              >
                <option value="">Select listing type</option>
                <option value="swap">Swap</option>
                <option value="giveaway">Giveaway</option>
                <option value="sale">Sale</option>
              </select>
            </label>

            <label className="block">
              <span className="text-base font-medium text-slate-800">Points (only for Sale)</span>
              <input
                type="number"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                disabled={listingType !== 'sale'}
                className="mt-2 w-full p-3 rounded-xl border border-emerald-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:opacity-50"
              />
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-emerald-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-600 transition duration-300"
            >
              List Item
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ListItemForm;
