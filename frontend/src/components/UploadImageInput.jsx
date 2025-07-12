import React from 'react';

const UploadImageInput = ({ onChange }) => (
  <div className="block">
    <span className="text-base font-medium text-slate-800">Upload Images (max 5)</span>
    <input
      type="file"
      accept="image/*"
      multiple
      onChange={onChange}
      className="mt-2 block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
    />
  </div>
);

export default UploadImageInput;