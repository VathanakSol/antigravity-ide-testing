'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface LearningStep {
    id: string;
    title: string;
    description: string;
    order: number;
    resources: string[];
    estimatedHours: number;
}

interface LearningPath {
    id: string;
    title: string;
    description: string;
    skill: string;
    icon: string;
    difficulty: string;
    duration: string;
    steps: LearningStep[];
}

interface LearningPathDetailProps {
    path: LearningPath;
}

export function LearningPathDetail({ path }: LearningPathDetailProps) {
    const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

    const toggleStep = (stepId: string) => {
        setCompletedSteps((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(stepId)) {
                newSet.delete(stepId);
            } else {
                newSet.add(stepId);
            }
            return newSet;
        });
    };

    const progress = (completedSteps.size / path.steps.length) * 100;

    return (
        <div className="max-w-4xl mx-auto">
            <Link
                href="/learning-paths"
                className="inline-flex items-center text-gray-600 hover:text-accent-yellow mb-6 transition-colors"
            >
                ← Back to Learning Paths
            </Link>

            <div className="bg-white border-2 border-gray-900 shadow-[4px_4px_0px_0px_#10162F] p-8 mb-8">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="text-6xl">{path.icon}</div>
                        <div>
                            <h1 className="text-4xl font-black text-[#10162F] mb-2">
                                {path.title}
                            </h1>
                            <p className="text-gray-600">{path.description}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-6">
                    <span className="px-4 py-2 text-sm font-bold bg-accent-yellow text-black border border-gray-900 rounded-full">
                        {path.difficulty}
                    </span>
                    <span className="px-4 py-2 text-sm font-bold bg-white text-black border-2 border-gray-900 rounded-full">
                        ⏱️ {path.duration}
                    </span>
                    <span className="px-4 py-2 text-sm font-bold bg-white text-black border-2 border-gray-900 rounded-full">
                        📚 {path.steps.length} steps
                    </span>
                </div>

                <div className="mb-2">
                    <div className="flex justify-between text-sm font-bold mb-2">
                        <span>Your Progress</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-4 bg-gray-200 border-2 border-gray-900 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-accent-yellow transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {path.steps.map((step, index) => (
                    <div
                        key={step.id}
                        className={`bg-white border-2 border-gray-900 shadow-[4px_4px_0px_0px_#10162F] p-6 transition-all ${
                            completedSteps.has(step.id) ? 'opacity-60' : ''
                        }`}
                    >
                        <div className="flex items-start gap-4">
                            <button
                                onClick={() => toggleStep(step.id)}
                                className={`flex-shrink-0 w-8 h-8 rounded-full border-2 border-gray-900 flex items-center justify-center font-bold transition-colors ${
                                    completedSteps.has(step.id)
                                        ? 'bg-accent-yellow text-black'
                                        : 'bg-white text-gray-400'
                                }`}
                            >
                                {completedSteps.has(step.id) ? '✓' : index + 1}
                            </button>

                            <div className="flex-grow">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-xl font-bold text-[#10162F]">
                                        {step.title}
                                    </h3>
                                    <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                                        ~{step.estimatedHours}h
                                    </span>
                                </div>

                                <p className="text-gray-600 mb-4">{step.description}</p>

                                {step.resources.length > 0 && (
                                    <div>
                                        <h4 className="font-bold text-sm text-gray-700 mb-2">
                                            📖 Recommended Resources:
                                        </h4>
                                        <ul className="space-y-1">
                                            {step.resources.map((resource, idx) => (
                                                <li
                                                    key={idx}
                                                    className="text-sm text-gray-600 pl-4"
                                                >
                                                    • {resource}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
