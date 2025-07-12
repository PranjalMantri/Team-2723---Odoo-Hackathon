import React from 'react';

const Heading = ({ level = 1, children, className = '' }) => {
  const Tag = `h${level}`;
  return <Tag className={`text-slate-800 ${className}`}>{children}</Tag>;
};

export default Heading;
