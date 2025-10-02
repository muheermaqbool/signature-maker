"use client";
import React from "react";

export default function PenControls({ penColor, setPenColor, penWidth, setPenWidth }) {
  return (
    <div className="flex items-center gap-2">
      {/* Pen Colors */}
      {["#000000", "#1D4ED8", "#DC2626", "#16A34A"].map(c => (
        <button
          key={c}
          onClick={() => setPenColor(c)}
          className={`w-6 h-6 rounded-full border-2 ${penColor === c ? "border-white" : "border-gray-300"}`}
          style={{ backgroundColor: c }}
        />
      ))}

      {/* Stroke Width */}
      <input
        type="range"
        min="1"
        max="10"
        value={penWidth}
        onChange={e => setPenWidth(Number(e.target.value))}
        className="w-24"
      />
    </div>
  );
}
