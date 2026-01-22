import { prisma } from "../src/lib/prisma";
import { dataPhones } from "../src/modules/phone/data";

async function main() {
  await prisma.phone.deleteMany();

  for (const phone of dataPhones) {
    await prisma.phone.create({
      data: phone,
    });
  }

  const allPhones = await prisma.phone.findMany();
  console.log(allPhones);
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
