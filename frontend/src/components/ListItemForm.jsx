import { useState } from "react";
import Navbar from "./Navbar";
import Heading from "./Heading";
import UploadImageInput from "./UploadImageInput";
import ImagePreviewGrid from "./ImagePreviewGrid";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import SelectInput from "./SelectInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CategoryOptions = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Books",
  "Sports",
  "Vehicles",
  "Collectibles",
  "Other",
];

const SizeOptions = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "One Size",
  "Small",
  "Medium",
  "Large",
];

const ConditionOptions = [
  "New",
  "Used - Like New",
  "Used - Good",
  "Used - Fair",
  "For Parts/Not Working",
];

const ItemTypeOptions = [
  "Shirts",
  "Pants",
  "Accessories",
  "Shoes",
  "Bags",
  "Other",
];

const ListingTypeOptions = ["swap", "giveaway", "sell"];

const ListItemForm = () => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const [listingType, setListingType] = useState("");
  const [points, setPoints] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const currentUser = {
    uploader: {
      username: "dhruvish",
      profileImage: "https://avatar.iran.liara.run/public/1",
    },
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  function capitalizeEachWord(sentence) {
    if (!sentence || typeof sentence !== "string") {
      return "";
    }

    return sentence
      .split(" ")
      .map((word) => {
        if (word.length === 0) {
          return "";
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setSelectedFiles(files);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);

    formData.append("category", capitalizeFirstLetter(category));
    formData.append("type", capitalizeFirstLetter(type));
    formData.append("size", capitalizeFirstLetter(size));
    formData.append("condition", capitalizeEachWord(condition));

    formData.append("listingType", listingType);

    if (listingType === "sell") {
      formData.append("price", points);
    }

    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    console.log("Submitting form data:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
      console.log(`${key}:`, typeof value);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/items/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}` || "",
          },
        },
        { withCredentials: true }
      );
      setSuccess(response.data.message || "Item submitted successfully!");
      setTitle("");
      setDescription("");
      setTags("");
      setCategory("");
      setType("");
      setSize("");
      setCondition("");
      setListingType("");
      setPoints("");
      setImagePreviews([]);
      setSelectedFiles([]);
      navigate("/home");
    } catch (err) {
      console.error("Error submitting item:", err);
      setError(
        err.response?.data?.message ||
          "Failed to submit item. Please try again."
      );
      if (err.response?.data?.errors) {
        setError(
          (prev) =>
            prev +
            " " +
            Object.values(err.response.data.errors).flat().join(", ")
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-50 text-slate-800 font-sans px-4 sm:px-6 lg:px-8">
      <Navbar item={currentUser} />

      <main className="flex justify-center py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl space-y-6 bg-white/80 p-8 rounded-2xl shadow-sm"
        >
          <Heading level={1} className="text-2xl font-bold mb-4">
            List an Item
          </Heading>

          <UploadImageInput onChange={handleImageChange} />
          <ImagePreviewGrid images={imagePreviews} />

          <TextInput
            label="Title"
            placeholder="e.g. Summer dress"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextArea
            label="Description"
            placeholder="Describe your item"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextInput
            label="Tags"
            placeholder="e.g. summer, dress, floral (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <SelectInput
              label="Category"
              options={CategoryOptions}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <SelectInput
              label="Type"
              options={ItemTypeOptions}
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            <SelectInput
              label="Size"
              options={SizeOptions}
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
            <SelectInput
              label="Condition"
              options={ConditionOptions}
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />

            <SelectInput
              label="Listing Type"
              value={listingType}
              onChange={(e) => {
                setListingType(e.target.value);
                if (e.target.value !== "sell") {
                  setPoints("");
                }
              }}
              options={ListingTypeOptions}
            />

            <TextInput
              label="Points (only for Sell)"
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              disabled={listingType !== "sell"}
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {success && (
            <p className="text-emerald-500 text-sm mt-2">{success}</p>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-emerald-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Listing..." : "List Item"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ListItemForm;
