import { Footer } from '@/components/layout/Footer';
import { getLearningPathBySkill } from '@/app/actions/learningPaths';

import { notFound } from 'next/navigation';
import { LearningPathDetail } from '@/components/LearningPathDetail';

export default async function LearningPathDetailPage({
    params,
}: {
    params: Promise<{ skill: string }>;
}) {
    const { skill } = await params;
    const learningPath = await getLearningPathBySkill(skill);

    if (!learningPath) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans text-foreground selection:bg-accent-yellow selection:text-black">
            <main className="flex-grow px-4 sm:px-6 lg:px-8 py-12">
                <LearningPathDetail path={learningPath} />
            </main>
            <Footer />
        </div>
    );
}
