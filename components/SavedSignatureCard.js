"use client";
import React from "react";
import { motion } from "framer-motion";


export default function SavedSignatureCard({ item, onDelete }) {
function download() {
const a = document.createElement("a");
a.href = item.dataUrl;
a.download = `${item.title || 'signature'}.png`;
a.click();
}


return (
<motion.div
layout

className="bg-white rounded-lg p-3  flex flex-col gap-2"
>
<div className="text-sm font-medium truncate text-black capitalize">{item.title || "Untitled"}</div>
<div className="flex-1 flex items-center justify-center h-24 overflow-hidden">
<img src={item.dataUrl} alt={item.title} className="max-h-full object-contain" />
</div>
<div className="flex items-center justify-between gap-2">
<button onClick={download} className="hover:bg-black/5 text-sm px-3 py-1 border rounded text-black cursor-pointer">Download</button>
<button onClick={() => onDelete(item.id)} className="text-sm px-3 py-1 border rounded text-red-600 cursor-pointer hover:bg-red-600/5">Delete</button>
</div>
</motion.div>
);
}