import { Footer } from '@/components/layout/Footer';
import { getLearningPaths } from '@/app/actions/learningPaths';
import { LearningPathsList } from '@/components/LearningPathsList';

export default async function LearningPathsPage() {
    const learningPaths = await getLearningPaths();

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans text-foreground selection:bg-accent-yellow selection:text-black">
            <main className="flex-grow px-4 sm:px-6 lg:px-8 py-12">
                <LearningPathsList initialPaths={learningPaths} />
            </main>
            <Footer />
        </div>
    );
}
