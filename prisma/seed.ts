import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const staticCategories = [
  { name: 'Body Lotions', slug: 'body-lotions' },
  { name: 'Bath Soaps', slug: 'bath-soaps' },
  { name: 'Face Creams & Cleansers', slug: 'face-creams-cleansers' },
  { name: 'Perfumes', slug: 'perfumes' },
  { name: 'Hair & Accessories', slug: 'hair-accessories' },
];

async function main() {
  console.log('Seeding static categories...');

  for (const category of staticCategories) {
    try {
      await prisma.category.upsert({
        where: { slug: category.slug },
        update: {},
        create: {
          name: category.name,
          slug: category.slug,
        },
      });
      console.log(`Created category: ${category.name}`);
    } catch (error) {
      console.error(`Error processing category ${category.name}:`, error);
    }
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });