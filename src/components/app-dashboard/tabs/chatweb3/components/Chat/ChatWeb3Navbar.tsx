import React, { useState } from 'react';

export const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Default (GPT-3.5)');

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownSelect = (model: any) => {
    setSelectedModel(model);
    setIsDropdownOpen(false);
  };

  return (
    <div
      className="bg-[#232323] h-16 flex items-center justify-between px-4"
      style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)' }}
    >
      <div className="flex items-center flex-1">
        <img className="h-8 w-auto" src="/images/wg_logos/Logo-Large-Transparent.png" alt="Logo" />
        <h1 className="text-white font-large text-lg ml-2">
          <b>ChatWeb3</b>
        </h1>
      </div>
    </div>
  );
};
