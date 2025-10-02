"use client";
import { Redo, Undo } from "lucide-react";
import React from "react";

export default function UndoRedoControls({ undo, redo, clear }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="p-1 rounded-lg border border-black cursor-pointer"
        onClick={undo}
      >
        {" "}
        <Undo className=" cursor-pointer text-black  rounded-lg" size={25} />
      </span>
      <span
        className="p-1 rounded-lg border border-black cursor-pointer"
        onClick={redo}
      >
        <Redo className=" cursor-pointer text-black  rounded-lg" size={25} />
      </span>
    </div>
  );
}
