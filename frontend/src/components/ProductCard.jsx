const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-all text-center">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />
      <h3 className="text-lg font-semibold text-[#2d3436]">{product.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{product.description}</p>
      <span className="mt-2 inline-block text-sm text-[#00b894] font-medium">
        {product.size}
      </span>
    </div>
  );
};

export default ProductCard;
