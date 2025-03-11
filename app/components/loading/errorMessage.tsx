"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg shadow-md">
      <AlertTriangle className="w-6 h-6 mb-2 text-red-700" />
      <p className="text-center text-sm md:text-base">{message}</p>
    </div>
  );
};

export default ErrorMessage;
