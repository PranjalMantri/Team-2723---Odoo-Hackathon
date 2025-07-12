import React, { useState } from 'react';
import Navbar from './Navbar'; // ✅ Using the Navbar component
import Heading from './Heading';
import UploadImageInput from './UploadImageInput';
import ImagePreviewGrid from './ImagePreviewGrid';
import TextInput from './TextInput';
import TextArea from './TextArea';
import SelectInput from './SelectInput';

const ListItemForm = () => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [listingType, setListingType] = useState('');
  const [points, setPoints] = useState('');

  // 🔁 Replace this mock object with real user data later
  const currentUser = {
    uploader: {
      username: 'dhruvish',
      profileImage: 'https://i.pravatar.cc/300?u=dhruvish',
    },
  };

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
      {/* ✅ Use the Navbar */}
      <Navbar item={currentUser} />

      <main className="flex justify-center py-10">
        <form className="w-full max-w-4xl space-y-6 bg-white/80 p-8 rounded-2xl shadow-sm">
          <Heading level={1} className="text-2xl font-bold mb-4">
            List an Item
          </Heading>

          <UploadImageInput onChange={handleImageChange} />
          <ImagePreviewGrid images={imagePreviews} />

          <TextInput label="Title" placeholder="e.g. Summer dress" />
          <TextArea label="Description" placeholder="Describe your item" />
          <TextInput label="Tags" placeholder="e.g. summer, dress, floral" />

          <div className="grid md:grid-cols-2 gap-6">
            <SelectInput label="Category" options={['Option 1', 'Option 2']} />
            <SelectInput label="Type" options={['Option 1', 'Option 2']} />
            <SelectInput label="Size" options={['Option 1', 'Option 2']} />
            <SelectInput label="Condition" options={['Option 1', 'Option 2']} />

            <SelectInput
              label="Listing Type"
              value={listingType}
              onChange={(e) => setListingType(e.target.value)}
              options={['swap', 'giveaway', 'sale']}
            />

            <TextInput
              label="Points (only for Sale)"
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              disabled={listingType !== 'sale'}
            />
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
