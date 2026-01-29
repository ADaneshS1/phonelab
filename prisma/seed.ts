import { prisma } from "../src/lib/prisma";
import { dataPhones } from "../src/modules/phone/data";
import { dataBrands } from "../src/modules/brand/data";

async function main() {
  for (const brand of dataBrands) {
    const upsertedBrand = await prisma.brand.upsert({
      where: { slug: brand.slug.toLowerCase() },
      update: { name: brand.name },
      create: {
        name: brand.name,
        slug: brand.slug.toLowerCase(),
      },
    });

    console.log(`🏢 ${upsertedBrand.name}`);
  }

  for (const phone of dataPhones) {
    const { brandSlug, ...phoneBody } = phone;

    const targetSlug = brandSlug.toLowerCase();

    const upsertedPhone = await prisma.phone.upsert({
      where: { slug: phone.slug },
      update: {
        ...phoneBody,
        brand: { connect: { slug: targetSlug } }, // Pakai targetSlug
      },
      create: {
        ...phoneBody,
        brand: { connect: { slug: targetSlug } }, // Pakai targetSlug
      },
      include: {
        brand: true,
      },
    });

    console.log(`📱 ${upsertedPhone.brand?.name} ${upsertedPhone.model}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
