import { PrismaClient } from '@prisma/client';
import mockData from '../data/mockData.json';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    for (const item of mockData) {
        const result = await prisma.searchResult.create({
            data: {
                title: item.title,
                description: item.description,
                url: item.url,
                category: item.category,
            },
        });
        console.log(`Created search result with id: ${result.id}`);
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
