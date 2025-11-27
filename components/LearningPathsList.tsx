'use client';

import React from 'react';
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

interface LearningPathsListProps {
    initialPaths: LearningPath[];
}

export function LearningPathsList({ initialPaths }: LearningPathsListProps) {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center">
                <h1 className="text-4xl sm:text-5xl font-black text-[#10162F] mb-4 tracking-tight">
                    <span className="text-accent-yellow">Learning Paths</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Structured roadmaps to guide you from beginner to expert in specific tech skills.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {initialPaths.map((path) => (
                    <Link
                        key={path.id}
                        href={`/learning-paths/${path.skill.toLowerCase().replace(/\s+/g, '-')}`}
                        className="group h-full flex flex-col bg-white border-2 border-gray-900 shadow-[4px_4px_0px_0px_#10162F] hover:shadow-[6px_6px_0px_0px_#10162F] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 p-6"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="text-4xl">{path.icon}</div>
                            <span className="px-3 py-1 text-xs font-bold bg-accent-yellow text-black border border-gray-900 rounded-full">
                                {path.difficulty}
                            </span>
                        </div>

                        <h3 className="text-2xl font-bold text-[#10162F] mb-2 group-hover:text-accent-yellow transition-colors">
                            {path.title}
                        </h3>

                        <p className="text-gray-600 mb-4 flex-grow">
                            {path.description}
                        </p>

                        <div className="pt-4 border-t-2 border-gray-100 space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="mr-2">⏱️</span>
                                <span>{path.duration}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <span className="mr-2">📚</span>
                                <span>{path.steps.length} steps</span>
                            </div>
                        </div>

                        <div className="mt-4 text-accent-yellow font-bold group-hover:translate-x-1 transition-transform">
                            Start Learning →
                        </div>
                    </Link>
                ))}
            </div>

            {initialPaths.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">No learning paths available yet.</p>
                </div>
            )}
        </div>
    );
}
