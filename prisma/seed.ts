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
      const existing = await prisma.category.findUnique({
        where: { slug: category.slug },
      });
      
      if (!existing) {
        await prisma.category.create({
          data: {
            name: category.name,
            slug: category.slug,
          },
        });
        console.log(`Created category: ${category.name}`);
      } else {
        console.log(`Category already exists: ${category.name}`);
      }
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