'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function getResources() {
    try {
        const resources = await (prisma as any).resource.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        // Revalidate to ensure fresh data
        revalidatePath('/resources');

        return resources;
    } catch (error) {
        console.error('Error fetching resources:', error);
        return [];
    }
}
