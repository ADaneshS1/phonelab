-- DropForeignKey
ALTER TABLE "Phone" DROP CONSTRAINT "Phone_brandId_fkey";

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;
