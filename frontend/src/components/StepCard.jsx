const StepCard = ({
    stepNumber,
    title,
    description,
    icon: Icon,
  }) => (
    <div className="relative p-10 bg-white/10 border border-white/10 rounded-lg backdrop-blur-sm 
  shadow-[0_8px_16px_rgba(0,0,0,0.1),0_-6px_12px_rgba(0,0,0,0.1)]">
  <div className="absolute -top-3 -left-5 w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full flex justify-center items-center font-bold text-lg shadow-lg">
    {stepNumber}
  </div>


      <div className="flex items-start gap-4 mt-4">
        <Icon className="w-10 h-10 text-emerald-400 mt-1" />
        <div>
          <h3 className="text-xl font-semibold text-black mb-1">{title}</h3>
          <p className="text-slate-400 text-md">{description}</p>
        </div>
      </div>
    </div>
  );
  
  export default StepCard;
  