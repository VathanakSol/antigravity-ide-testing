'use server';

import { prisma } from '@/lib/prisma';

export async function getSearchResults(query: string) {
    if (!query || query.trim() === '') {
        return [];
    }

    const lowerQuery = query.toLowerCase();

    const results = await prisma.searchResult.findMany({
        where: {
            OR: [
                { title: { contains: lowerQuery, mode: 'insensitive' } },
                { description: { contains: lowerQuery, mode: 'insensitive' } },
                { category: { contains: lowerQuery, mode: 'insensitive' } },
            ],
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return results;
}

// Alias for real-time search from client components
export async function searchInRealTime(query: string) {
    return getSearchResults(query);
}

export async function getAllResults() {
    const results = await prisma.searchResult.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });

    return results;
}
