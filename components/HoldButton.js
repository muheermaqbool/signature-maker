"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";


export default function HoldButton({ onComplete, label = "Hold to Sign", holdMs = 700 }) {
const [progress, setProgress] = useState(0);
const intervalRef = useRef(null);


function start() {
if (intervalRef.current) clearInterval(intervalRef.current);
const step = 50; // ms
const steps = Math.max(1, Math.floor(holdMs / step));
let count = 0;
setProgress(0);
intervalRef.current = setInterval(() => {
count++;
setProgress(Math.min(100, Math.round((count / steps) * 100)));
if (count >= steps) {
clearInterval(intervalRef.current);
intervalRef.current = null;
setProgress(100);
onComplete();
}
}, step);
}


function end() {
if (intervalRef.current) {
clearInterval(intervalRef.current);
intervalRef.current = null;
}
setProgress(0);
}


return (
<div
onPointerDown={start}
onPointerUp={end}
onPointerLeave={end}
className="relative w-36 h-10 rounded-md overflow-hidden shadow cursor-pointer"
>
<motion.div
className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-green-500 to-green-400"
initial={{ width: 0 }}
animate={{ width: `${progress}%` }}
transition={{ ease: "linear", duration: 0.05 }}
/>


<div className="relative z-10 flex items-center justify-center h-full bg-white/10 text-white border border-white rounded-lg text-sm font-medium hover:shadow-lg select-none hover:bg-white/20 transition">
{label}
</div>
</div>
);
}