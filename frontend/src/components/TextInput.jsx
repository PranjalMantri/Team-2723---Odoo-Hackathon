import React from 'react';

const TextInput = ({ label, type = 'text', placeholder, value, onChange, disabled = false }) => (
  <label className="block">
    <span className="text-base font-medium text-slate-800">{label}</span>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className="mt-2 w-full p-3 rounded-xl border border-emerald-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:opacity-50"
    />
  </label>
);

export default TextInput;