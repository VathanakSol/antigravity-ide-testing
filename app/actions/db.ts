'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function getSearchResults(query: string) {
    if (!query || query.trim() === '') {
        return [];
    }

    const lowerQuery = query.toLowerCase();

    try {
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

        // Revalidate to ensure fresh data on next request
        revalidatePath('/');

        return results;
    } catch (error) {
        console.error('Error fetching search results:', error);
        return [];
    }
}

// Alias for real-time search from client components
export async function searchInRealTime(query: string) {
    return getSearchResults(query);
}

export async function getAllResults() {
    try {
        const results = await prisma.searchResult.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        // Revalidate to ensure fresh data
        revalidatePath('/');

        return results;
    } catch (error) {
        console.error('Error fetching all results:', error);
        return [];
    }
}
