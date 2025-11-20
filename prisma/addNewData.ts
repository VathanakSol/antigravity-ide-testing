import { PrismaClient } from '@prisma/client';
import newData from '../data/newData.json';

const prisma = new PrismaClient();

async function addNewData() {
    console.log('Adding new data to database...');

    let addedCount = 0;
    let skippedCount = 0;

    for (const item of newData) {
        try {
            // Check if item already exists by title
            const existing = await prisma.searchResult.findFirst({
                where: { title: item.title }
            });

            if (existing) {
                console.log(`⏭️  Skipped: "${item.title}" (already exists)`);
                skippedCount++;
                continue;
            }

            // Add new item
            const result = await prisma.searchResult.create({
                data: {
                    title: item.title,
                    description: item.description,
                    url: item.url,
                    category: item.category,
                },
            });
            console.log(`✅ Added: "${result.title}" (ID: ${result.id})`);
            addedCount++;
        } catch (error) {
            console.error(`❌ Error adding "${item.title}":`, error);
        }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   Added: ${addedCount}`);
    console.log(`   Skipped: ${skippedCount}`);
    console.log(`   Total in newData.json: ${newData.length}`);
}

addNewData()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
