import { prisma } from "../src/lib/prisma";
import { dataPhones } from "../src/modules/phone/data";

async function main() {
  // for (const brand of dataBrands) {
  //   // TODO
  // }

  for (const phone of dataPhones) {
    const { brandSlug, ...phoneBody } = phone;

    const upsertedPhone = await prisma.phone.upsert({
      where: { slug: phone.slug },
      update: {
        ...phoneBody,
        brand: { connect: { slug: brandSlug } },
      },
      create: {
        ...phoneBody,
        brand: { connect: { slug: brandSlug } },
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
