"use client";
import React, { useRef, useEffect, useState } from "react";

export default function SignatureCanvas({ onSave }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const lastPoint = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const isEmptyRef = useRef(true);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const rect = c.getBoundingClientRect();
    c.width = rect.width * dpr;
    c.height = rect.height * dpr;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#000";
    ctxRef.current = ctx;

    clearCanvas();
  }, []);

  function startStroke(x, y) {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(x, y);
    lastPoint.current = { x, y };
    isEmptyRef.current = false; 
  }

  function strokeTo(x, y) {
    const ctx = ctxRef.current;
    if (!ctx || !lastPoint.current) return;
    const midX = (lastPoint.current.x + x) / 2;
    const midY = (lastPoint.current.y + y) / 2;
    ctx.quadraticCurveTo(lastPoint.current.x, lastPoint.current.y, midX, midY);
    ctx.stroke();
    lastPoint.current = { x, y };
  }

  function endStroke() {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.closePath();
    lastPoint.current = null;
  }

  function handlePointerDown(e) {
    if (!canvasRef.current) return;
    e.target.setPointerCapture?.(e.pointerId);
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    startStroke(x, y);
  }

  function handlePointerMove(e) {
    if (!isDrawing || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    strokeTo(x, y);
  }

  function handlePointerUp() {
    setIsDrawing(false);
    endStroke();
  }

  function clearCanvas() {
    const c = canvasRef.current;
    const ctx = ctxRef.current;
    if (!c || !ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.restore();
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#000";
    isEmptyRef.current = true; // ✅ reset
  }

  function save() {
    if (isEmptyRef.current) return null; // ✅ check ref
    const c = canvasRef.current;
    if (!c) return null;
    const tmp = document.createElement("canvas");
    tmp.width = c.width;
    tmp.height = c.height;
    const tctx = tmp.getContext("2d");
    tctx.fillStyle = "#fff";
    tctx.fillRect(0, 0, tmp.width, tmp.height);
    tctx.drawImage(c, 0, 0);
    return tmp.toDataURL("image/png");
  }

  useEffect(() => {
    if (!onSave) return;
    onSave.current = {
      save,
      clear: clearCanvas,
    };
  }, [onSave]);

  return (
    <div className="w-full h-56 sm:h-64 md:h-72 bg-white">
      <canvas
        ref={canvasRef}
        className="w-full h-full touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: "none" }}
      />
    </div>
  );
}
