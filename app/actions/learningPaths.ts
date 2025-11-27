'use server';

import { prisma } from '@/lib/prisma';

export async function getLearningPaths() {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const paths = await (prisma as any).learningPath.findMany({
            include: {
                steps: {
                    orderBy: {
                        order: 'asc',
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return paths;
    } catch (error) {
        console.error('Error fetching learning paths:', error);
        return [];
    }
}

export async function getLearningPathBySkill(skill: string) {
    try {
        // Convert URL slug back to title case for matching
        // e.g., "full-stack" -> "Full Stack"
        const skillTitle = skill
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const path = await (prisma as any).learningPath.findFirst({
            where: {
                skill: {
                    equals: skillTitle,
                    mode: 'insensitive',
                },
            },
            include: {
                steps: {
                    orderBy: {
                        order: 'asc',
                    },
                },
            },
        });
        return path;
    } catch (error) {
        console.error('Error fetching learning path:', error);
        return null;
    }
}
