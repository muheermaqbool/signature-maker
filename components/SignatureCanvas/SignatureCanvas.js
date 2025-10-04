"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import PenControls from "./PenControls";
import BackgroundControls from "./BackgroundControls";
import UndoRedoControls from "./UndoRedoControls";

export default function SignatureCanvas({ onSave }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState([]); // {points, color, width}
  const [redoStack, setRedoStack] = useState([]);
  const [currentStroke, setCurrentStroke] = useState(null);

  // Settings
  const [penColor, setPenColor] = useState("#000000");
  const [penWidth, setPenWidth] = useState(3);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [transparentBg, setTransparentBg] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  function resizeCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    redraw();
  }

  function startStroke(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsDrawing(true);
    setCurrentStroke({ points: [{ x, y }], color: penColor, width: penWidth });
  }

  function moveStroke(e) {
    if (!isDrawing || !currentStroke) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newPoints = [...currentStroke.points, { x, y }];
    setCurrentStroke({ ...currentStroke, points: newPoints });
    redraw([...strokes, { ...currentStroke, points: newPoints }]);
  }

  function endStroke() {
    if (!isDrawing || !currentStroke) return;
    setIsDrawing(false);
    setStrokes([...strokes, currentStroke]);
    setCurrentStroke(null);
    setRedoStack([]); // clear redo after new stroke
  }

  function redraw(customStrokes = strokes) {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!transparentBg) {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    [...customStrokes].forEach((stroke) => {
      ctx.beginPath();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;
      stroke.points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
    });

    // Draw live stroke
    if (currentStroke) {
      ctx.beginPath();
      ctx.strokeStyle = currentStroke.color;
      ctx.lineWidth = currentStroke.width;
      currentStroke.points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
    }
  }

  // Undo & Redo
  function undo() {
    if (strokes.length === 0) return;
    const newStrokes = strokes.slice(0, -1);
    const removed = strokes[strokes.length - 1];
    setRedoStack([...redoStack, removed]);
    setStrokes(newStrokes);
    redraw(newStrokes);
  }

  function redo() {
    if (redoStack.length === 0) return;
    const restored = redoStack[redoStack.length - 1];
    const newRedo = redoStack.slice(0, -1);
    const newStrokes = [...strokes, restored];
    setStrokes(newStrokes);
    setRedoStack(newRedo);
    redraw(newStrokes);
  }
  // Save (PNG, with optional transparency)
  const save = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.toDataURL("image/png");
  }, []);
  const isEmpty = useCallback(() => {
    return strokes.length === 0;
  }, [strokes]);

  const clear = useCallback(() => {
    // clear strokes and redraw empty canvas
    setStrokes([]);
    setRedoStack([]);
    setCurrentStroke(null);
    redraw([]);
  }, []);
  useEffect(() => {
    if (onSave && typeof onSave === "object") {
      onSave.current = { save, clear, isEmpty };
    }
  }, [onSave, save, clear, isEmpty]);

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <PenControls
          penColor={penColor}
          setPenColor={setPenColor}
          penWidth={penWidth}
          setPenWidth={setPenWidth}
        />
        <BackgroundControls
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
          transparentBg={transparentBg}
          setTransparentBg={setTransparentBg}
        />
        <UndoRedoControls undo={undo} redo={redo} />
      </div>

      <div className="w-full h-56 sm:h-64 md:h-72 bg-white rounded-md border overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full touch-none"
          onPointerDown={startStroke}
          onPointerMove={moveStroke}
          onPointerUp={endStroke}
          onPointerLeave={endStroke}
          style={{ touchAction: "none" }}
        />
      </div>
    </div>
  );
}
