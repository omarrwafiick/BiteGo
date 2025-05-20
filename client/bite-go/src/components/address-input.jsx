import React, { useState } from 'react';
import axios from 'axios';

export default function ({ name, titleStyle, onChange, style }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]); 

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      const apiKey = "pk.88ffa40795d6ea0ad8ab57578a0bc23f";
      const url = `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${encodeURIComponent(value)}&format=json`;

      try {
        const res = await axios.get(url, { withCredentials: false });
        setSuggestions(res.data);
      } catch (err) {
        console.error("Search error:", err);
      }
    } else {
      setSuggestions([]);
    }
  };

  const selectAddress = (address) => {
    const displayName = address.display_name;
    setQuery(displayName); 
    setSuggestions([]);
    if (onChange) {
      onChange(displayName);  
    }
  };

  return (
    <div className="relative w-full flex flex-col justify-center items-center mt-2">
      <label htmlFor={name} className={`block mb-2 text-sm font-medium capitalize text-start text-black w-10/12 ${titleStyle}`}>
        {name}
      </label>
      <input
        type="text"
        placeholder="Search address..."
        value={query}
        onChange={handleSearch}
        className={`bg-gray-50 text-black text-sm rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-[#FE7531] focus:border-[#FE7531] shadow-sm
             w-full p-2 border-2 border-black/10 ${style}`}
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border border-black/20 rounded-lg max-w-96 max-h-28 overflow-y-auto z-10 top-20 w-full">
          {suggestions.map((address, i) => (
            <li
              key={i}
              onClick={() => selectAddress(address)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {address.display_name}
            </li>
          ))}
        </ul>
      )} 
    </div>
  );
}
