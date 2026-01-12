import { prisma } from "./lib/prisma";

async function main() {
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
