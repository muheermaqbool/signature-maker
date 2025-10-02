"use client";
import React from "react";

export default function BackgroundControls({ backgroundColor, setBackgroundColor, transparentBg, setTransparentBg }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setTransparentBg(!transparentBg)}
        className="px-2 py-1 text-xs rounded border bg-white text-black"
      >
        {transparentBg ? "Transparent" : "Solid"}
      </button>

      {!transparentBg && (
        <input
          type="color"
          value={backgroundColor}
          onChange={e => setBackgroundColor(e.target.value)}
          className="w-15 h-8 cursor-pointer border rounded"
        />
      )}
    </div>
  );
}
