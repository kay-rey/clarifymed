// src/app/components/ClarificationCard.tsx

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LottieLoader from "@/components/LottieLoader";  // Import the loader component

export function ClarificationCard() {
  // State for user's text input.
  const [inputText, setInputText] = useState("");
  // State for loading indicator.
  const [isLoading, setIsLoading] = useState(false);
  // State for storing AI response.
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  // State for error messages.
  const [error, setError] = useState<string | null>(null);

  // Handle form submission.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setAiResponse(null);
    try {
      // Send POST request to the /api/clarify endpoint.
      const response = await fetch("/api/clarify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An error occurred.");
      }

      // Assume the API returns an object with `simplifiedText`.
      setAiResponse(data.simplifiedText);
    } catch (err: any) {
      console.error("Error during clarification:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Clarify Your Doctor's Note</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste your doctor's note here..."
          className="w-full h-32 p-2 border border-gray-300 rounded-md resize-none"
          required
        />
        <div className="mt-4 flex items-center gap-4">
          <Button type="submit">Submit</Button>
          {isLoading &&  <LottieLoader />}
        </div>
      </form>
      {error && <p className="mt-4 text-red-500">Error: {error}</p>}
      {aiResponse && (
        <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
          <h3 className="mb-2 font-semibold">Clarified Text:</h3>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
}
