'use client';

import React, { useState, useEffect } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { SearchResults } from '@/components/SearchResults';
import { searchInRealTime } from '@/app/actions/db';
import { getTechNews, NewsItem } from '@/app/actions/news';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

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
    const [news, setNews] = useState<NewsItem[]>([]);
    const [newsSource, setNewsSource] = useState<'hn' | 'devto'>('hn');
    const [newsCategory, setNewsCategory] = useState<'latest' | 'top' | 'show' | 'ask'>('latest');
    const [isNewsLoading, setIsNewsLoading] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            setIsNewsLoading(true);
            const newsItems = await getTechNews(newsSource, newsCategory);
            setNews(newsItems);
            setIsNewsLoading(false);
        };
        fetchNews();
    }, [newsSource, newsCategory]);

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

            {/* Main Content */}
            <main className="flex-grow flex flex-col px-4 sm:px-6 lg:px-8 pt-20 pb-12">
                <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* Left Column: Search & Results */}
                    <div className="flex-grow lg:w-2/3">
                        <div className="text-center mb-8">
                            {!query && (
                                <h2 className="text-5xl sm:text-6xl font-black text-white mb-6 tracking-tight">
                                    Find your <span className="text-accent-yellow">tech</span> stack.
                                </h2>
                            )}
                            <SearchBar value={query} onChange={setQuery} />
                        </div>

                        {!query && (
                            <div className="mt-6 mb-12">
                                <p className="text-gray-400 mb-4 font-mono text-sm uppercase tracking-widest text-center ">Popular Searches</p>
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

                        {query && (
                            <div className="w-full">
                                {isLoading ? (
                                    <div className="w-full">
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
                    </div>

                    {/* Right Column: Tech News */}
                    <div className="lg:w-1/3 w-full">
                        <div className="sticky top-8">
                            <div className="flex flex-col gap-4 mb-6 border-b border-gray-800 pb-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-accent-yellow tracking-tight">Tech News</h3>
                                    <div className="flex bg-[#111] rounded-lg p-1 border border-gray-800">
                                        <button
                                            onClick={() => { setNewsSource('hn'); setNewsCategory('latest'); }}
                                            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${newsSource === 'hn' ? 'bg-accent-yellow text-black' : 'text-gray-400 hover:text-white'}`}
                                        >
                                            Hacker
                                        </button>
                                        <button
                                            onClick={() => { setNewsSource('devto'); setNewsCategory('latest'); }}
                                            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${newsSource === 'devto' ? 'bg-accent-yellow text-black' : 'text-gray-400 hover:text-white'}`}
                                        >
                                            Developer
                                        </button>
                                    </div>
                                </div>

                                <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                    {newsSource === 'hn' ? (
                                        <>
                                            {['latest', 'top'].map((cat) => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setNewsCategory(cat as any)}
                                                    className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-full border transition-all whitespace-nowrap ${newsCategory === cat ? 'border-accent-yellow text-accent-yellow bg-accent-yellow/10' : 'border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300'}`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            {['latest', 'top'].map((cat) => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setNewsCategory(cat as any)}
                                                    className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-full border transition-all whitespace-nowrap ${newsCategory === cat ? 'border-accent-yellow text-accent-yellow bg-accent-yellow/10' : 'border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300'}`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>

                            {isNewsLoading ? (
                                <div className="space-y-3">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="h-16 bg-[#111] border border-gray-800 rounded animate-pulse"></div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid gap-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                    {news.map((item) => (
                                        <a
                                            key={item.id}
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group block p-4 bg-[#111] border border-gray-800 hover:border-accent-yellow transition-all duration-200 hover:translate-x-1"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <h4 className="font-medium text-gray-300 group-hover:text-accent-yellow transition-colors line-clamp-2 text-sm">
                                                    {item.title}
                                                </h4>
                                                <span className="text-xs font-mono text-gray-600 group-hover:text-gray-400 flex-shrink-0">
                                                    {item.source === 'Hacker News' ? 'HN' : 'DEV'} ↗
                                                </span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
