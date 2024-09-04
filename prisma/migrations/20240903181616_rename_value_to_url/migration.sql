/*
  Warnings:

  - You are about to drop the column `value` on the `image` table. All the data in the column will be lost.
  - Added the required column `url` to the `image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `image` DROP COLUMN `value`,
    ADD COLUMN `url` VARCHAR(191) NOT NULL;
