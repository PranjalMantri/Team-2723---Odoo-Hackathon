import React from 'react';

const SelectInput = ({ label, options = [], value, onChange }) => (
  <label className="block">
    <span className="text-base font-medium text-slate-800">{label}</span>
    <select
      value={value}
      onChange={onChange}
      className="mt-2 w-full p-3 rounded-xl border border-emerald-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-300"
    >
      <option value="">Select {label.toLowerCase()}</option>
      {options.map((opt, i) => (
        <option key={i} value={opt.toLowerCase()}>
          {opt}
        </option>
      ))}
    </select>
  </label>
);

export default SelectInput;
