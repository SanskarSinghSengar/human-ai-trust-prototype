"use client";

import { useEffect, useRef, useState } from "react";
import { assignCondition, conditionContent, ConditionType } from "../lib/condition";
import { scenarios } from "../lib/scenarios";

export default function Home() {
  const [participantId, setParticipantId] = useState<string | null>(null);
  const [condition, setCondition] = useState<ConditionType | null>(null);
  const [trialIndex, setTrialIndex] = useState(0);
  const [decision, setDecision] = useState<string | null>(null);
  const [confidence, setConfidence] = useState(50);
  const [showConfidence, setShowConfidence] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [aiCorrect, setAiCorrect] = useState<boolean | null>(null);
  const startTime = useRef<number>(0);

  useEffect(() => {
    let storedId = localStorage.getItem("participant_id");
    if (!storedId) {
      storedId = crypto.randomUUID();
      localStorage.setItem("participant_id", storedId);
    }

    let storedCondition = localStorage.getItem("condition") as ConditionType | null;
    if (!storedCondition) {
      storedCondition = assignCondition();
      localStorage.setItem("condition", storedCondition);
    }

    setParticipantId(storedId);
    setCondition(storedCondition);
  }, []);

  useEffect(() => {
    if (trialIndex < scenarios.length) {
      const accuracy = Math.random() < 0.7;
      setAiCorrect(accuracy);
      startTime.current = Date.now();
      setDecision(null);
      setConfidence(50);
      setShowConfidence(false);
    }
  }, [trialIndex]);

  if (!participantId || !condition || aiCorrect === null) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          {/* <h2 className="text-xl font-semibold">Experiment Complete</h2>
          <p className="mt-3 text-gray-600">Thank you for participating.</p> */}
          <h2 className="text-xl font-semibold">Experiment Complete</h2>
          <p className="mt-3 text-gray-600">Thank you for participating.</p>

          <a
            href="/api/export"
            className="mt-6 inline-block rounded-xl bg-gray-800 px-6 py-3 text-white hover:bg-black transition"
          >
            Download CSV Data
          </a>


        </div>
      </div>
    );
  }

  const scenario = scenarios[trialIndex];

  const handleDecision = (choice: string) => {
    setDecision(choice);
    setShowConfidence(true);
  };

  const handleSubmit = async () => {
    const latency = Date.now() - startTime.current;
    const participantFollowedAI = decision === "accept";

    const payload = {
      participant_id: participantId,
      condition,
      trial_index: trialIndex + 1,
      scenario_id: scenario.id,
      ai_correct: aiCorrect,
      decision,
      participant_followed_ai: participantFollowedAI,
      confidence,
      latency_ms: latency,
      timestamp: new Date().toISOString(),
    };

    await fetch("/api/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (trialIndex + 1 < scenarios.length) {
      setTrialIndex(trialIndex + 1);
    } else {
      setSubmitted(true);
    }
  };
  return (
  <div className="flex min-h-screen items-center justify-center bg-gray-50 p-8">
    <div className="w-full max-w-3xl rounded-2xl bg-white p-10 shadow-xl">

      <h1 className="text-3xl font-bold text-gray-900">
        Hiring Decision Task
      </h1>

      <p className="mt-2 text-sm text-gray-500">
        Trial {trialIndex + 1} of {scenarios.length}
      </p>

      {/* AI Section */}
      {/* <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6"> */}
      <div
        className={`mt-8 rounded-lg p-6 ${
          condition === "humanlike"
            ? "border border-blue-200 bg-blue-50"
            : "border border-gray-300 bg-gray-50"
        }`}
      >
        <h2 className="text-lg font-semibold text-blue-800">
          Assistant: {conditionContent[condition].name}
        </h2>
        <p className="mt-2 text-blue-900 text-base leading-relaxed">
          {conditionContent[condition].message}
        </p>
      </div>

      {/* Scenario Section */}
      <div className="mt-8 rounded-lg border border-gray-200 bg-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Candidate Comparison
        </h3>
        <p className="mt-3 text-gray-900 text-base leading-relaxed">
          {scenario.description}
        </p>
      </div>

      {/* Decision Buttons */}
      {!showConfidence && (
        <div className="mt-10 flex gap-6">
          <button
            onClick={() => handleDecision("accept")}
            className="flex-1 rounded-xl bg-blue-600 py-4 text-white font-semibold text-base shadow-md hover:bg-blue-700 transition"
          >
            Accept AI Recommendation
          </button>

          <button
            onClick={() => handleDecision("override")}
            className="flex-1 rounded-xl bg-white border-2 border-gray-400 py-4 text-gray-800 font-semibold text-base shadow-sm hover:bg-gray-100 transition"
          >
            Choose Candidate B Instead
          </button>
        </div>
      )}

      {/* Confidence Stage */}
      {showConfidence && (
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-gray-900">
            How confident are you in your decision?
          </h3>

          <input
            type="range"
            min="0"
            max="100"
            value={confidence}
            onChange={(e) => setConfidence(Number(e.target.value))}
            className="w-full mt-6"
          />

          <div className="mt-3 text-center text-gray-800 font-medium">
            {confidence}% confident
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 w-full rounded-xl bg-green-600 py-4 text-white font-semibold text-base shadow-md hover:bg-green-700 transition"
          >
            Submit Trial
          </button>
        </div>
      )}
    </div>
  </div>
);
}
