const Divider = ({ children }) => (
    <div className="relative text-center text-slate-500 text-sm font-medium">
      <span className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-slate-300"></span>
      </span>
      <span className="relative bg-white px-3">{children}</span>
    </div>
  );
  
  export default Divider;
  