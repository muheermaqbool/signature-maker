"use client";
import React from "react";


export default function SearchBar({ value, onChange, placeholder = "Search titles..." }) {
return (
<div className="w-full">
<input
className="w-full rounded-md px-3 py-2 border focus:outline-none"
value={value}
onChange={(e) => onChange(e.target.value)}
placeholder={placeholder}
/>
</div>
);
}