import React from 'react';

const TextArea = ({ label, placeholder, value, onChange }) => (
  <label className="block">
    <span className="text-base font-medium text-slate-800">{label}</span>
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="mt-2 w-full p-3 rounded-xl border border-emerald-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-300"
    />
  </label>
);

export default TextArea;