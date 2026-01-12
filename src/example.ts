import { prisma } from "./lib/prisma";

async function main() {
  const newPhone = await prisma.phone.create({
    data: {
      brand: "Xiaomi",
      model: "Mi 18T",
      slug: "mi-18t",
      price: 1600,
      os: "Android 15",
      releaseYear: 2026,
    },
  });

  console.log(newPhone);

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
