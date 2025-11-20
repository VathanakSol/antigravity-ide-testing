'use client';

import React, { useState, useEffect } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { SearchResults } from '@/components/SearchResults';
import { searchInRealTime } from '@/app/actions/db';

interface Result {
    id: string;
    title: string;
    description: string;
    url: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

export default function RealTimeSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Result[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Debounce search - wait 300ms after user stops typing
        const timeoutId = setTimeout(async () => {
            if (query.trim()) {
                setIsLoading(true);
                try {
                    const searchResults = await searchInRealTime(query);
                    setResults(searchResults);
                } catch (error) {
                    console.error('Search error:', error);
                    setResults([]);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setResults([]);
                setIsLoading(false);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query]);

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans text-foreground selection:bg-accent-yellow selection:text-black">
            {/* Header */}
            <header className="w-full py-5 px-4 sm:px-6 lg:px-8 bg-[#10162F] border-b border-gray-800">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white text-[#10162F] flex items-center justify-center font-black text-2xl shadow-[4px_4px_0px_0px_#FFD300]">
                            N
                        </div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            NakTech
                        </h1>
                    </div>
                    <nav className="hidden md:flex gap-8 text-sm font-bold text-white">
                        <a href="#" className="hover:text-accent-yellow transition-colors">Catalog</a>
                        <a href="#" className="hover:text-accent-yellow transition-colors">Resources</a>
                        <a href="#" className="hover:text-accent-yellow transition-colors">Community</a>
                        <a href="#" className="hover:text-accent-yellow transition-colors">Pricing</a>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-20 pb-12">
                <div className="w-full max-w-3xl text-center mb-12">
                    {!query && (
                        <h2 className="text-5xl sm:text-6xl font-black text-white mb-6 tracking-tight">
                            Find your <span className="text-accent-mint">tech</span> stack.
                        </h2>
                    )}

                    <SearchBar value={query} onChange={setQuery} />

                    {!query && (
                        <div className="mt-10">
                            <p className="text-gray-400 mb-4 font-mono text-sm uppercase tracking-widest">Popular Searches</p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {['React', 'Next.js', 'Tailwind', 'TypeScript', 'Database', 'Testing'].map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => setQuery(tag)}
                                        className="px-6 py-2 text-sm font-bold bg-[#1F2937] text-white border border-gray-700 hover:bg-white hover:text-[#10162F] hover:border-white transition-all duration-200 shadow-[4px_4px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#FFD300]"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {query && (
                    <div className="w-full">
                        {isLoading ? (
                            <div className="w-full max-w-2xl mx-auto">
                                <div className="mb-4 text-gray-400 text-sm animate-pulse">
                                    Searching...
                                </div>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="relative p-6 bg-white/50 border-l-4 border-gray-300 animate-pulse">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="h-5 w-20 bg-gray-200 rounded"></div>
                                                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                            </div>
                                            <div className="mb-2 h-7 w-3/4 bg-gray-300 rounded"></div>
                                            <div className="space-y-2">
                                                <div className="h-4 w-full bg-gray-200 rounded"></div>
                                                <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="animate-fade-in-up">
                                <SearchResults results={results} />
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="w-full py-8 bg-[#0A0E1F] border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} NakTech Search.
                    </p>
                    <div className="flex gap-8 text-sm font-bold text-white">
                        <a href="#" className="hover:text-accent-yellow">Privacy Policy</a>
                        <a href="#" className="hover:text-accent-yellow">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
