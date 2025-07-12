const Button = ({ children, variant = 'primary', fullWidth, ...props }) => {
    const base =
      'py-3 rounded-full font-semibold transition duration-300 text-center';
    const variants = {
      primary: 'bg-emerald-500 text-white hover:bg-emerald-600',
      outline: 'border border-emerald-300 text-emerald-700 hover:bg-emerald-50',
    };
    const width = fullWidth ? 'w-full' : '';
    return (
      <button className={`${base} ${variants[variant]} ${width}`} {...props}>
        {children}
      </button>
    );
  };
  
  export default Button;
  