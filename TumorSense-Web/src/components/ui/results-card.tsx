
"use client";
import React from "react";
import { motion } from "framer-motion";

interface ResultsCardProps {
  imageSrc?: string;
  confidence?: number;
  diagnosis?: string;
}

export function ResultsCard({ imageSrc, confidence = 95, diagnosis = "All Clear" }: ResultsCardProps) {
  // Calculate process time - we'll use a simple random number for now
  const processTime = ((Math.random() * 2) + 2).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative z-50 w-full max-w-md"
    >
      <div className="flex flex-col p-6 tracking-tight text-slate-100/90 w-full bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-lg border border-slate-700/50 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-xs text-slate-400">Analysis Complete</div>
          </div>
        </div>

        {/* Image Preview */}
        {imageSrc && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img
              src={imageSrc}
              alt="Analyzed image"
              className="w-full h-48 object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 space-y-4">
          <div className="text-xl font-bold text-slate-100">
            AI Analysis Results
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-sky-400">{confidence}%</div>
              <div className="text-xs text-slate-400">Confidence</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-emerald-400">{processTime}s</div>
              <div className="text-xs text-slate-400">Process Time</div>
            </div>
          </div>

          {/* Diagnosis Results */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-200">Diagnosis:</div>
            <div className="text-2xl font-bold text-emerald-400 text-center py-4">
              {diagnosis}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-2">
            <div className="text-xs text-slate-400">
              Processed: {new Date().toLocaleTimeString()}
            </div>
            <div className="text-emerald-400 text-sm font-medium">
              ✓ Complete
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
